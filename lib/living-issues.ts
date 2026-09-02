import type { SupabaseClient } from "@supabase/supabase-js";
import { createIssue, createIssueUpdate, updateIssue } from "./issues";
import type {
  CreateIssueInput,
  DataResult,
  Issue,
  Report,
  ReportCategory,
  Severity,
  UpdateIssueInput,
} from "./types/database";

/**
 * "Living Issue" matching engine.
 *
 * When a new report comes in, this module decides whether it belongs to
 * an existing nearby issue (same category, within a radius) or whether a
 * brand-new issue should be created for it.
 *
 * This is a deterministic MVP implementation: no ML, no PostGIS, no
 * vector search, no queues, no external APIs. Just a category filter plus
 * a Haversine distance calculation done in plain TypeScript.
 *
 * Every function takes an already-created Supabase client as its first
 * argument (from lib/supabase-browser.ts or lib/supabase-server.ts).
 * No new Supabase client is created here, and RLS remains the security
 * boundary — these functions never bypass it.
 */

/** Default radius (in meters) used to decide if a report is "near" an issue. */
export const MATCH_RADIUS_METERS = 500;

const EARTH_RADIUS_METERS = 6371000;

/** The subset of a report's fields needed to look for a matching issue. */
export type ReportForMatching = Pick<
  Report,
  "latitude" | "longitude" | "category"
>;

// ---- geometry helpers -------------------------------------------------------

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Straight-line distance between two lat/lng points, in meters,
 * using the Haversine formula. Good enough for short, city-scale
 * distances like the ones CityPulse deals with.
 */
function haversineDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

// ---- title helper (issues have no description field) -----------------------

function categoryLabel(category: ReportCategory): string {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Build a simple, deterministic issue title from the report's category
 * and (optionally) the start of its description. No AI involved.
 */
function buildIssueTitle(
  category: ReportCategory,
  description: string
): string {
  const label = categoryLabel(category);
  const trimmed = description.trim();

  if (trimmed.length === 0) {
    return `${label} reported`;
  }

  const snippet =
    trimmed.length > 60 ? `${trimmed.slice(0, 60)}…` : trimmed;

  return `${label} — ${snippet}`;
}

// ---- matching ----------------------------------------------------------

/**
 * Find the closest existing issue that could plausibly be the same
 * real-world problem as the given report: same category, within
 * `radiusMeters` of the report's location.
 *
 * Returns `{ data: null, error: null }` (not an error) when there's simply
 * no match. Returns `{ data: null, error: string }` only on an actual
 * Supabase error.
 */
export async function findMatchingIssue(
  supabase: SupabaseClient,
  report: ReportForMatching,
  radiusMeters: number = MATCH_RADIUS_METERS
): Promise<DataResult<Issue | null>> {
  const { data: candidates, error } = await supabase
    .from("issues")
    .select("*")
    .eq("category", report.category)
    .returns<Issue[]>();

  if (error) {
    return { data: null, error: error.message };
  }

  if (!candidates || candidates.length === 0) {
    return { data: null, error: null };
  }

  let closestIssue: Issue | null = null;
  let closestDistance = Infinity;

  for (const candidate of candidates) {
    const distance = haversineDistanceMeters(
      report.latitude,
      report.longitude,
      candidate.latitude,
      candidate.longitude
    );

    if (distance <= radiusMeters && distance < closestDistance) {
      closestIssue = candidate;
      closestDistance = distance;
    }
  }

  return { data: closestIssue, error: null };
}

// ---- processing ----------------------------------------------------------

/**
 * Take a report that has already been saved (it must already have an id),
 * decide whether it belongs to an existing Living Issue or needs a new
 * one, and update the database accordingly:
 *
 * - Existing issue found: increments report_count, refreshes
 *   last_confirmed_at, bumps severity if the new report is more severe,
 *   attaches the report via reports.issue_id, and logs an issue_updates
 *   entry.
 * - No existing issue: creates a new issue from the report's category,
 *   location, and severity, attaches the report to it, and logs the
 *   initial issue_updates entry.
 *
 * Returns the resulting Issue.
 *
 * KNOWN MVP LIMITATION: report_count is updated with a read-then-write
 * (current count + 1), not an atomic database increment. If two reports
 * for the same issue are processed at almost the same moment, one
 * increment could be lost. This is acceptable for the MVP; a future
 * improvement would move the increment into a Postgres function/RPC.
 */
export async function processReportIntoIssue(
  supabase: SupabaseClient,
  report: Report
): Promise<DataResult<Issue>> {
  const { data: matchedIssue, error: matchError } = await findMatchingIssue(
    supabase,
    {
      latitude: report.latitude,
      longitude: report.longitude,
      category: report.category,
    }
  );

  if (matchError) {
    return { data: null, error: matchError };
  }

  if (matchedIssue) {
    return attachReportToExistingIssue(supabase, report, matchedIssue);
  }

  return attachReportToNewIssue(supabase, report);
}

async function attachReportToExistingIssue(
  supabase: SupabaseClient,
  report: Report,
  issue: Issue
): Promise<DataResult<Issue>> {
  const now = new Date().toISOString();

  const updates: UpdateIssueInput = {
    report_count: issue.report_count + 1,
    last_confirmed_at: now,
    severity: Math.max(issue.severity, report.severity) as Severity,
  };

  const { data: updatedIssue, error: updateIssueError } = await updateIssue(
    supabase,
    issue.id,
    updates
  );

  if (updateIssueError || !updatedIssue) {
    return {
      data: null,
      error: updateIssueError ?? "Failed to update the matching issue.",
    };
  }

  const { error: reportLinkError } = await supabase
    .from("reports")
    .update({ issue_id: issue.id })
    .eq("id", report.id);

  if (reportLinkError) {
    return { data: null, error: reportLinkError.message };
  }

  const { error: issueUpdateError } = await createIssueUpdate(supabase, {
    issue_id: issue.id,
    type: "report_added",
    description: `A new report was added to this issue. Total reports: ${updatedIssue.report_count}.`,
  });

  if (issueUpdateError) {
    return { data: null, error: issueUpdateError };
  }

  return { data: updatedIssue, error: null };
}

async function attachReportToNewIssue(
  supabase: SupabaseClient,
  report: Report
): Promise<DataResult<Issue>> {
  const now = new Date().toISOString();

  const newIssueInput: CreateIssueInput = {
    title: buildIssueTitle(report.category, report.description),
    category: report.category,
    latitude: report.latitude,
    longitude: report.longitude,
    status: "reported",
    severity: report.severity,
    report_count: 1,
    first_reported_at: now,
    last_confirmed_at: now,
  };

  const { data: newIssue, error: createIssueError } = await createIssue(
    supabase,
    newIssueInput
  );

  if (createIssueError || !newIssue) {
    return {
      data: null,
      error: createIssueError ?? "Failed to create a new issue.",
    };
  }

  const { error: reportLinkError } = await supabase
    .from("reports")
    .update({ issue_id: newIssue.id })
    .eq("id", report.id);

  if (reportLinkError) {
    return { data: null, error: reportLinkError.message };
  }

  const { error: issueUpdateError } = await createIssueUpdate(supabase, {
    issue_id: newIssue.id,
    type: "issue_created",
    description: "Issue created from the first report.",
  });

  if (issueUpdateError) {
    return { data: null, error: issueUpdateError };
  }

  return { data: newIssue, error: null };
}