// lib/resumes.ts
//
// Data-access layer for the resume builder.
// Works with the createClient() from either your client.ts (browser/Client Components)
// or server.ts (Server Components/Actions) — both return a SupabaseClient<Database>
// as long as you pass the Database generic when constructing them:
//
//   createBrowserClient<Database>(...)   // in client.ts
//   createServerClient<Database>(...)    // in server.ts
//
// Import the right createClient() depending on where you call these functions from.

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/app/types/database.types';
import type { Resume, ResumeContent, ResumeTheme, TemplateMeta } from '@/app/types/Content';

type TypedClient = SupabaseClient<Database>;

// ---------- Templates ----------

export async function getTemplates(supabase: TypedClient): Promise<TemplateMeta[]> {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('category', { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category,
    thumbnail: row.thumbnail,
    component: row.component,
    layout: row.layout,
    defaultTheme: row.default_theme,
    allowedFonts: row.allowed_fonts,
    layoutConfig: row.layout_config ?? undefined,
  }));
}

export async function getTemplateById(
  supabase: TypedClient,
  templateId: string
): Promise<TemplateMeta | null> {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', templateId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    category: data.category,
    thumbnail: data.thumbnail,
    component: data.component,
    layout: data.layout,
    defaultTheme: data.default_theme,
    allowedFonts: data.allowed_fonts,
    layoutConfig: data.layout_config ?? undefined,
  };
}

// ---------- Resumes ----------

export async function getUserResumes(
  supabase: TypedClient,
  userId: string
): Promise<Resume[]> {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map(rowToResume);
}

export async function getResumeById(
  supabase: TypedClient,
  resumeId: string
): Promise<Resume | null> {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', resumeId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return rowToResume(data);
}

export async function createResume(
  supabase: TypedClient,
  params: {
    userId: string;
    templateId: string;
    theme: ResumeTheme;
    content: ResumeContent;
    title?: string;
    thumbnail_url?: string;
  }
): Promise<Resume> {
  const { data, error } = await supabase
    .from('resumes')
    .insert({
      user_id: params.userId,
      template_id: params.templateId,
      theme: params.theme,
      content: params.content,
      title: params.title ?? null,
      thumbnail_url: params.thumbnail_url ?? null,
    })
    .select('*')
    .single();

  if (error) throw error;

  return rowToResume(data);
}

export async function updateResume(
  supabase: TypedClient,
  resumeId: string,
  updates: Partial<{
    title: string | null;
    templateId: string | null;
    theme: ResumeTheme;
    content: ResumeContent;
    thumbnail_url: string | null;
  }>
): Promise<Resume> {
  const { data, error } = await supabase
    .from('resumes')
    .update({
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.templateId !== undefined && { template_id: updates.templateId }),
      ...(updates.theme !== undefined && { theme: updates.theme }),
      ...(updates.content !== undefined && { content: updates.content }),
      ...(updates.thumbnail_url !== undefined && { thumbnail_url: updates.thumbnail_url }),
    })
    .eq('id', resumeId)
    .select('*')
    .single();

  if (error) throw error;

  return rowToResume(data);
}

export async function deleteResume(supabase: TypedClient, resumeId: string): Promise<void> {
  const { error } = await supabase.from('resumes').delete().eq('id', resumeId);
  if (error) throw error;
}

// ---------- helpers ----------

function rowToResume(row: Database['public']['Tables']['resumes']['Row']): Resume {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title ?? undefined,
    templateId: row.template_id ?? '',
    theme: row.theme,
    content: row.content,
    thumbnail_url: row.thumbnail_url ?? null,
  };
}