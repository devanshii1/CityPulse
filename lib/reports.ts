import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CreateReportInput,
  DataResult,
  Report,
  UpdateReportInput,
} from "./types/database";

/**
 * Data-access functions for the `reports` table.
 *
 * Every function takes an already-created Supabase client as its first
 * argument (from lib/supabase-browser.ts or lib/supabase-server.ts).
 * No new Supabase client is created here, and RLS remains the security
 * boundary — these functions never bypass it.
 */

const TABLE = "reports";

/**
 * Create a new report for the currently logged-in user.
 *
 * The user_id is taken from the authenticated session (supabase.auth.getUser()),
 * never from the caller, so a report can never be created on behalf of
 * another user.
 */
export async function createReport(
  supabase: SupabaseClient,
  input: CreateReportInput
): Promise<DataResult<Report>> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { data: null, error: "You must be logged in to create a report." };
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({ ...input, user_id: user.id })
    .select()
    .returns<Report[]>()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Get all reports belonging to the currently logged-in user,
 * newest first.
 */
export async function getMyReports(
  supabase: SupabaseClient
): Promise<DataResult<Report[]>> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { data: null, error: "You must be logged in to view your reports." };
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<Report[]>();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Get a single report by id. RLS decides whether the current
 * session is allowed to see it.
 */
export async function getReportById(
  supabase: SupabaseClient,
  reportId: string
): Promise<DataResult<Report>> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", reportId)
    .returns<Report[]>()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Update a report owned by the currently logged-in user.
 *
 * Filters by both id AND the session's user_id, so even if RLS were
 * ever misconfigured, this call still cannot touch another user's row.
 */
export async function updateMyReport(
  supabase: SupabaseClient,
  reportId: string,
  updates: UpdateReportInput
): Promise<DataResult<Report>> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { data: null, error: "You must be logged in to update a report." };
  }

  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", reportId)
    .eq("user_id", user.id)
    .select()
    .returns<Report[]>()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Delete a report owned by the currently logged-in user.
 */
export async function deleteMyReport(
  supabase: SupabaseClient,
  reportId: string
): Promise<DataResult<null>> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { data: null, error: "You must be logged in to delete a report." };
  }

  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", reportId)
    .eq("user_id", user.id);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: null, error: null };
}