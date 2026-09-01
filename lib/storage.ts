import type { SupabaseClient } from "@supabase/supabase-js";
import type { DataResult } from "./types/database";

/**
 * Data-access functions for the private `report-images` Storage bucket.
 *
 * Every function takes an already-created Supabase client as its first
 * argument (from lib/supabase-browser.ts or lib/supabase-server.ts).
 * No new Supabase client is created here. Storage policies remain the
 * security boundary — these functions never bypass them.
 *
 * The bucket is private, so we never use getPublicUrl(). Access to an
 * uploaded image is always via a short-lived signed URL.
 */

const BUCKET = "report-images";

/** Where an uploaded image lives inside the bucket. */
export interface UploadedImage {
  /** Storage path, e.g. "user-id/1699999999999-a1b2c3d4.jpg". Save this on the report row. */
  path: string;
}

/**
 * Upload an image file for a report.
 *
 * The file is stored under a path prefixed with the authenticated user's id,
 * so files stay organized per user, and a random suffix is appended to the
 * filename so two uploads (even with the same original filename) never
 * collide.
 */
export async function uploadReportImage(
  supabase: SupabaseClient,
  file: File
): Promise<DataResult<UploadedImage>> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { data: null, error: "You must be logged in to upload an image." };
  }

  const extension = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : "";
  const uniqueName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
  const path = `${user.id}/${uniqueName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: { path }, error: null };
}

/**
 * Get a temporary signed URL for a private image so it can be displayed
 * in the UI. The bucket is never made public, so this is the only way
 * to read an image back.
 *
 * @param path Storage path returned by uploadReportImage (or stored on the report row).
 * @param expiresInSeconds How long the signed URL stays valid. Defaults to 1 hour.
 */
export async function getReportImageUrl(
  supabase: SupabaseClient,
  path: string,
  expiresInSeconds: number = 60 * 60
): Promise<DataResult<string>> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, expiresInSeconds);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data.signedUrl, error: null };
}

/**
 * Delete an image from the report-images bucket.
 *
 * Storage RLS policies decide whether the current session is allowed to
 * delete this particular path — this function does not bypass them.
 */
export async function deleteReportImage(
  supabase: SupabaseClient,
  path: string
): Promise<DataResult<null>> {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: null, error: null };
}