import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CreateIssueInput,
  CreateIssueUpdateInput,
  DataResult,
  Issue,
  IssueUpdate,
  IssueStatus,
  Report,
  ReportCategory,
  UpdateIssueInput,
} from "./types/database";

/**
 * Data-access functions for the `issues`, `reports` (read-only, by issue),
 * and `issue_updates` tables.
 *
 * Every function takes an already-created Supabase client as its first
 * argument (from lib/supabase-browser.ts or lib/supabase-server.ts).
 * No new Supabase client is created here, and RLS remains the security
 * boundary — these functions never bypass it.
 *
 * Issues and issue_updates have no owner column in docs/DATABASE.md, so
 * these functions don't filter by user — access control for who may
 * create/update issues is entirely up to RLS policies.
 */

const ISSUES_TABLE = "issues";
const REPORTS_TABLE = "reports";
const ISSUE_UPDATES_TABLE = "issue_updates";

export interface GetIssuesFilters {
  category?: ReportCategory;
  status?: IssueStatus;
}

/**
 * Get issues for the map/explore view, newest first.
 * Optionally filter by category and/or status.
 */
export async function getIssues(
  supabase: SupabaseClient,
  filters: GetIssuesFilters = {}
): Promise<DataResult<Issue[]>> {
  let query = supabase.from(ISSUES_TABLE).select("*");

  if (filters.category) {
    query = query.eq("category", filters.category);
  }
  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .returns<Issue[]>();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Get a single issue by id (e.g. for the Issue Detail page).
 */
export async function getIssueById(
  supabase: SupabaseClient,
  issueId: string
): Promise<DataResult<Issue>> {
  const { data, error } = await supabase
    .from(ISSUES_TABLE)
    .select("*")
    .eq("id", issueId)
    .returns<Issue[]>()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Get all reports that belong to a given issue (the "evidence" list on
 * the Issue Detail page), oldest first so they read as a timeline.
 */
export async function getIssueReports(
  supabase: SupabaseClient,
  issueId: string
): Promise<DataResult<Report[]>> {
  const { data, error } = await supabase
    .from(REPORTS_TABLE)
    .select("*")
    .eq("issue_id", issueId)
    .order("created_at", { ascending: true })
    .returns<Report[]>();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Create a new Living Issue. Used when a report doesn't match any
 * existing nearby issue.
 */
export async function createIssue(
  supabase: SupabaseClient,
  input: CreateIssueInput
): Promise<DataResult<Issue>> {
  const { data, error } = await supabase
    .from(ISSUES_TABLE)
    .insert(input)
    .select()
    .returns<Issue[]>()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Update fields on an existing issue (e.g. status, severity,
 * report_count, last_confirmed_at) when new related reports come in.
 */
export async function updateIssue(
  supabase: SupabaseClient,
  issueId: string,
  updates: UpdateIssueInput
): Promise<DataResult<Issue>> {
  const { data, error } = await supabase
    .from(ISSUES_TABLE)
    .update(updates)
    .eq("id", issueId)
    .select()
    .returns<Issue[]>()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Add a timeline entry to an issue (e.g. "new report added",
 * "status changed to verified").
 */
export async function createIssueUpdate(
  supabase: SupabaseClient,
  input: CreateIssueUpdateInput
): Promise<DataResult<IssueUpdate>> {
  const { data, error } = await supabase
    .from(ISSUE_UPDATES_TABLE)
    .insert(input)
    .select()
    .returns<IssueUpdate[]>()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Get the timeline of updates for an issue, oldest first.
 */
export async function getIssueUpdates(
  supabase: SupabaseClient,
  issueId: string
): Promise<DataResult<IssueUpdate[]>> {
  const { data, error } = await supabase
    .from(ISSUE_UPDATES_TABLE)
    .select("*")
    .eq("issue_id", issueId)
    .order("created_at", { ascending: true })
    .returns<IssueUpdate[]>();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}