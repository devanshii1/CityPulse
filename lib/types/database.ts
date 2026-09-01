/**
 * TypeScript types mirroring docs/DATABASE.md.
 *
 * These are hand-written to match the existing schema exactly.
 * Do NOT add or rename fields here without updating docs/DATABASE.md first.
 */

// ---- Shared enums (from docs/DATABASE.md) ----------------------------------

export type ReportCategory =
  | "waterlogging"
  | "flooding"
  | "pothole"
  | "road_blockage"
  | "garbage"
  | "streetlight"
  | "other";

export type Severity = 1 | 2 | 3 | 4 | 5;

export type IssueStatus =
  | "reported"
  | "verified"
  | "in_progress"
  | "resolved"
  | "reopened";

// ---- profiles ---------------------------------------------------------------

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  created_at: string;
}

// ---- reports ------------------------------------------------------------

export interface Report {
  id: string;
  user_id: string;
  description: string;
  image_url: string | null;
  latitude: number;
  longitude: number;
  category: ReportCategory;
  severity: Severity;
  ai_summary: string | null;
  ai_confidence: number | null;
  issue_id: string | null;
  created_at: string;
}

/** Fields the caller provides when creating a report. user_id is set server-side from the session. */
export type CreateReportInput = Omit<Report, "id" | "user_id" | "created_at">;

/** Fields a user may update on their own report. */
export type UpdateReportInput = Partial<
  Omit<Report, "id" | "user_id" | "created_at">
>;

// ---- issues -------------------------------------------------------------

export interface Issue {
  id: string;
  title: string;
  category: ReportCategory;
  latitude: number;
  longitude: number;
  status: IssueStatus;
  severity: Severity;
  report_count: number;
  first_reported_at: string;
  last_confirmed_at: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateIssueInput = Omit<Issue, "id" | "created_at" | "updated_at">;

export type UpdateIssueInput = Partial<
  Omit<Issue, "id" | "created_at" | "updated_at">
>;

// ---- issue_updates --------------------------------------------------------

export interface IssueUpdate {
  id: string;
  issue_id: string;
  type: string;
  description: string | null;
  created_at: string;
}

export type CreateIssueUpdateInput = Omit<IssueUpdate, "id" | "created_at">;

// ---- generic result wrapper -------------------------------------------------

export interface DataResult<T> {
  data: T | null;
  error: string | null;
}