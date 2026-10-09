"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

export type NotificationType =
  | "job_alert"
  | "template_added"
  | "incomplete_reminder";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  data: Record<string, any>;
  action_url: string | null;
  read: boolean;
  archived: boolean;
  email_sent: boolean;
  created_at: string;
  updated_at: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("notifications" as any)
      .select("*")
      .eq("user_id", user.id)
      .eq("archived", false)
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setNotifications(data as unknown as Notification[]);
      setUnreadCount(data.filter((n: any) => !n.read).length);
    }
    setLoading(false);
  }, [supabase]);

  // Initial load + realtime subscription
  useEffect(() => {
    load();

    const supabaseClient = createClient();
    const channel = supabaseClient
      .channel("notifications-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        () => {
          load();
        },
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [load]);

  const markAsRead = useCallback(
    async (id: string) => {
      await supabase
        .from("notifications" as any)
        .update({ read: true })
        .eq("id", id);

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    },
    [supabase],
  );

  const markAllRead = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("notifications" as any)
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false);

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, [supabase]);

  const archive = useCallback(
    async (id: string) => {
      await supabase
        .from("notifications" as any)
        .update({ archived: true })
        .eq("id", id);

      setNotifications((prev) => {
        const removed = prev.find((n) => n.id === id);
        if (removed && !removed.read) {
          setUnreadCount((c) => Math.max(0, c - 1));
        }
        return prev.filter((n) => n.id !== id);
      });
    },
    [supabase],
  );

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllRead,
    archive,
    refresh: load,
  };
}