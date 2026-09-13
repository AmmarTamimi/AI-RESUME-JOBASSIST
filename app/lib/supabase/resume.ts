// lib/resumes.ts
//
// Data-access layer for the resume builder.
// Works with createClient() from either client.ts (browser/Client Components)
// or server.ts (Server Components/Actions).
//
// Import the right createClient() depending on where you call these functions from.

import type { Json } from "@/app/types/database.types";
import type { Database } from "@/app/types/database.types";
import type {
  Resume,
  ResumeContent,
  ResumeTheme,
  TemplateMeta,
  TemplateLayoutConfig,
  TemplateLayout,
} from "@/app/types/Content";
import { createClient } from "./client";

// ---------- JSON helpers ----------
// Postgres jsonb columns come back as the generic `Json` type. Our app knows
// what's actually stored in those columns, so these helpers make the cast
// explicit and localized.

function toJson<T>(value: T): Json {
  return value as unknown as Json;
}

function fromJson<T>(value: Json): T {
  return value as unknown as T;
}

// ---------- Templates ----------

export async function getTemplates(): Promise<TemplateMeta[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("category", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category,
    thumbnail: row.thumbnail,
    component: row.component,
    layout: row.layout as TemplateLayout,
    defaultTheme: fromJson<ResumeTheme>(row.default_theme),
    allowedFonts: row.allowed_fonts,
    layoutConfig:
      row.layout_config != null
        ? fromJson<TemplateLayoutConfig>(row.layout_config)
        : undefined,
  }));
}
export async function uploadResumeThumbnail(
  userId: string,
  resumeId: string,
  blob: Blob,
): Promise<string> {
  const supabase = createClient();

  const path = `${userId}/${resumeId}.png`;

  const { error: uploadError } = await supabase.storage
    .from("resume-thumbnails")
    .upload(path, blob, {
      contentType: "image/png",
      upsert: true,
      // Tell the CDN to cache for an hour; the cache-busting query param
      // below ensures the fresh version is served after each overwrite.
      cacheControl: "3600",
    });

  if (uploadError) {
    console.error("Thumbnail upload failed:", uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from("resume-thumbnails")
    .getPublicUrl(path);

  // Append a version query param so the browser + CDN fetch the new image
  // immediately after an overwrite, instead of serving the cached old one.
  return `${data.publicUrl}?v=${Date.now()}`;
}
export async function getTemplateById(
  templateId: string,
): Promise<TemplateMeta | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", templateId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    category: data.category,
    thumbnail: data.thumbnail,
    component: data.component,
    layout: data.layout as TemplateLayout,
    defaultTheme: fromJson<ResumeTheme>(data.default_theme),
    allowedFonts: data.allowed_fonts,
    layoutConfig:
      data.layout_config != null
        ? fromJson<TemplateLayoutConfig>(data.layout_config)
        : undefined,
  };
}

// ---------- Resumes ----------

export async function getUserResumes(userId: string): Promise<Resume[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(rowToResume);
}

export async function getResumeById(resumeId: string): Promise<Resume | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return rowToResume(data);
}

export async function createResume(params: {
  userId: string;
  templateId: string;
  theme: ResumeTheme;
  content: ResumeContent;
  title?: string | null;
  thumbnail_url?: string | null;
  status?: "draft" | "completed";
}): Promise<Resume> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("resumes")
    .insert({
      user_id: params.userId,
      template_id: params.templateId,
      theme: toJson(params.theme),
      content: toJson(params.content),
      title: params.title ?? null,
      thumbnail_url: params.thumbnail_url ?? null,
      status: params.status ?? "draft",
    })
    .select("*")
    .single();

  if (error) throw error;

  return rowToResume(data);
}

export async function updateResume(
  resumeId: string,
  updates: Partial<{
    title: string | null;
    templateId: string | null;
    theme: ResumeTheme;
    content: ResumeContent;
    thumbnail_url: string | null;
    status: "draft" | "completed";
  }>,
): Promise<Resume> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("resumes")
    .update({
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.templateId !== undefined && {
        template_id: updates.templateId,
      }),
      ...(updates.theme !== undefined && { theme: toJson(updates.theme) }),
      ...(updates.content !== undefined && {
        content: toJson(updates.content),
      }),
      ...(updates.thumbnail_url !== undefined && {
        thumbnail_url: updates.thumbnail_url,
      }),
      ...(updates.status !== undefined && { status: updates.status }),
    })
    .eq("id", resumeId)
    .select("*")
    .single();

  if (error) throw error;

  return rowToResume(data);
}

export async function deleteResume(resumeId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("resumes").delete().eq("id", resumeId);
  if (error) throw error;
}

// ---------- helpers ----------

function rowToResume(
  row: Database["public"]["Tables"]["resumes"]["Row"],
): Resume {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title ?? undefined,
    templateId: row.template_id ?? "",
    theme: fromJson<ResumeTheme>(row.theme),
    content: fromJson<ResumeContent>(row.content),
    thumbnail_url: row.thumbnail_url ?? null,
    status: (row.status ?? "draft") as "draft" | "completed",
    updatedAt: row.updated_at,
  };
}
