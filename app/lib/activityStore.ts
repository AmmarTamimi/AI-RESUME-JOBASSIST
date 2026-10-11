"use client";

import { createClient } from "@/app/lib/supabase/client";

export type ActivityType =
  | "resume_created"
  | "resume_updated"
  | "resume_downloaded"
  | "resume_imported"
  | "resume_checked"
  | "application_sent"
  | "interview_scheduled"
  | "job_matched";

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  timestamp: number;
  meta?: Record<string, any>;
}

export async function logActivity(
  type: ActivityType,
  title: string,
  meta?: Record<string, any>,
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const activityTable = supabase.from("activity" as any);

  await activityTable.insert({
    user_id: user.id,
    type,
    title,
    meta: meta ?? null,
  });

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("activity-updated"));
  }
}

export async function getActivities(limit = 50): Promise<ActivityEvent[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const activityTable = supabase.from("activity" as any);
  const { data, error } = await activityTable
    .select("id, type, title, meta, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((row: any) => ({
    id: row.id,
    type: row.type as ActivityType,
    title: row.title,
    timestamp: new Date(row.created_at).getTime(),
    meta: row.meta ?? undefined,
  }));
}

export async function clearActivities() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const activityTable = supabase.from("activity" as any);
  await activityTable.delete().eq("user_id", user.id);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("activity-updated"));
  }
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
  const w = Math.floor(d / 7);
  if (w < 5) return `${w} week${w === 1 ? "" : "s"} ago`;
  const mo = Math.floor(d / 30);
  return `${mo} month${mo === 1 ? "" : "s"} ago`;
}