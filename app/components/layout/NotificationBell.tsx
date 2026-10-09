"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  Check,
  Briefcase,
  Sparkles,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useNotifications,
  Notification,
  NotificationType,
} from "@/app/hooks/useNotifications";

const ICON_BY_TYPE: Record<NotificationType, any> = {
  job_alert: Briefcase,
  template_added: Sparkles,
  incomplete_reminder: FileText,
};

const COLOR_BY_TYPE: Record<NotificationType, string> = {
  job_alert:
    "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  template_added:
    "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
  incomplete_reminder:
    "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return `${Math.floor(d / 7)}w ago`;
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllRead,
    archive,
  } = useNotifications();

  const handleClick = (n: Notification) => {
    if (!n.read) markAsRead(n.id);
    if (n.action_url) {
      router.push(n.action_url);
      setOpen(false);
    }
  };

  const handleArchive = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.stopPropagation();
    archive(id);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] rounded-lg transition-colors"
        title="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full ring-2 ring-white dark:ring-[#0F172A]">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1E293B] rounded-xl shadow-2xl border border-[#E2E8F0] dark:border-[#334155] z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] dark:border-[#334155]">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">
                    Loading…
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F1F5F9] dark:bg-[#334155] mb-2">
                      <Bell className="h-4 w-4 text-[#94A3B8]" />
                    </div>
                    <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  notifications.map((n) => {
                    const Icon = ICON_BY_TYPE[n.type] || Bell;
                    const colorClass =
                      COLOR_BY_TYPE[n.type] ||
                      "bg-[#F1F5F9] dark:bg-[#334155] text-[#64748B]";
                    return (
                      <div
                        key={n.id}
                        onClick={() => handleClick(n)}
                        className={`group relative flex items-start gap-3 px-4 py-3 border-b border-[#E2E8F0] dark:border-[#334155] last:border-0 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] transition-colors ${
                          !n.read
                            ? "bg-blue-50/60 dark:bg-blue-900/10"
                            : ""
                        }`}
                      >
                        {!n.read && (
                          <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />
                        )}
                        <div
                          className={`p-2 rounded-lg shrink-0 ${colorClass}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm text-[#0F172A] dark:text-white line-clamp-1 ${
                              !n.read ? "font-semibold" : "font-medium"
                            }`}
                          >
                            {n.title}
                          </p>
                          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5 line-clamp-2 leading-relaxed">
                            {n.body}
                          </p>
                          <p className="text-[10px] text-[#94A3B8] mt-1">
                            {timeAgo(n.created_at)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleArchive(e, n.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-[#94A3B8] hover:text-red-500 transition-all shrink-0"
                          title="Archive"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {notifications.length > 0 && (
                <div className="border-t border-[#E2E8F0] dark:border-[#334155] px-4 py-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full text-xs text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors py-1"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}