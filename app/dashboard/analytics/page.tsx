"use client";

import { useEffect, useMemo, useState } from "react";
import { Shell } from "../../components/layout/Shell-temp";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FileText, Send, Brain, Briefcase, Loader2 } from "lucide-react";
import { useAuth } from "../../providers/auth-provider";
import { ActivityEvent, ActivityType, getActivities } from "../../lib/activityStore";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type WeekBucket = {
  week: string;       // "Oct 06"
  weekStart: string;  // "Oct 06 – Oct 12"
  resumes: number;
  applications: number;
  aiChecks: number;
  matches: number;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Return the Monday of the week for a given date (UTC-safe). */
function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun, 1 = Mon, ...
  const diff = (day === 0 ? -6 : 1 - day); // shift to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Format a date as "Oct 06" */
function fmtShort(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

/** Format a range as "Oct 06 – Oct 12" */
function fmtRange(start: Date, end: Date): string {
  return `${fmtShort(start)} – ${fmtShort(end)}`;
}

/**
 * Build a list of week buckets covering the last `weeks` weeks
 * (ending with the current week), and count events per type.
 */
function buildWeeklyBuckets(
  activities: ActivityEvent[],
  weeks: number,
): WeekBucket[] {
  const now = new Date();
  const thisWeekStart = startOfWeek(now);

  // Build the ordered list of week-start dates (oldest first)
  const weekStarts: Date[] = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const d = new Date(thisWeekStart);
    d.setDate(d.getDate() - i * 7);
    weekStarts.push(d);
  }

  // Pre-fill buckets
  const buckets: WeekBucket[] = weekStarts.map((start) => {
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return {
      week: fmtShort(start),
      weekStart: fmtRange(start, end),
      resumes: 0,
      applications: 0,
      aiChecks: 0,
      matches: 0,
    };
  });

  // Index buckets by their start timestamp for O(1) lookup
  const index = new Map<number, number>();
  weekStarts.forEach((start, i) => index.set(start.getTime(), i));

  // Bucket each activity into the correct week
  for (const event of activities) {
    const weekStart = startOfWeek(new Date(event.timestamp)).getTime();
    const i = index.get(weekStart);
    if (i === undefined) continue; // outside our window
    switch (event.type) {
      case "resume_created":
        buckets[i].resumes += 1;
        break;
      case "application_sent":
        buckets[i].applications += 1;
        break;
      case "resume_checked":
        buckets[i].aiChecks += 1;
        break;
      case "job_matched":
        buckets[i].matches += 1;
        break;
    }
  }

  return buckets;
}

/* ------------------------------------------------------------------ */
/*  Colors — matched to the theme                                      */
/* ------------------------------------------------------------------ */

const COLORS = {
  resumes: "#8B5CF6",      // violet
  applications: "#2563EB", // blue
  aiChecks: "#10B981",     // emerald
  matches: "#F59E0B",      // amber
};

const PIE_COLORS = [
  COLORS.resumes,
  COLORS.applications,
  COLORS.aiChecks,
  COLORS.matches,
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Analytics() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load activity on mount + subscribe to updates
  useEffect(() => {
    if (!user?.id) return;

    let cancelled = false;

    const load = async () => {
      try {
        const data = await getActivities(500); // fetch up to 500 recent events
        if (!cancelled) setActivities(data);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    const handler = () => load();
    window.addEventListener("activity-updated", handler);
    return () => {
      cancelled = true;
      window.removeEventListener("activity-updated", handler);
    };
  }, [user?.id]);

  // Build 8-week buckets
  const weekly = useMemo(() => buildWeeklyBuckets(activities, 8), [activities]);

  // Totals for the summary cards
  const totals = useMemo(() => {
    return {
      resumes: weekly.reduce((a, b) => a + b.resumes, 0),
      applications: weekly.reduce((a, b) => a + b.applications, 0),
      aiChecks: weekly.reduce((a, b) => a + b.aiChecks, 0),
      matches: weekly.reduce((a, b) => a + b.matches, 0),
    };
  }, [weekly]);

  // Pie chart data
  const pieData = useMemo(
    () => [
      { name: "Resumes Created", value: totals.resumes, key: "resumes" },
      { name: "Applications Sent", value: totals.applications, key: "applications" },
      { name: "AI Checks", value: totals.aiChecks, key: "aiChecks" },
      { name: "Job Matches", value: totals.matches, key: "matches" },
    ],
    [totals],
  );

  const hasData = activities.length > 0;

  return (
    <Shell>
      <div className="flex-1 overflow-auto bg-[#F8FAFC] dark:bg-[#0F172A] p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto space-y-6 lg:space-y-8"
        >
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-1">
              Analytics
            </h1>
            <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
              Weekly overview of your resume and job search activity.
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="ml-3 text-sm text-[#64748B]">
                Loading your data…
              </span>
            </div>
          ) : !hasData ? (
            <div className="rounded-2xl border border-dashed border-[#E2E8F0] dark:border-[#334155] p-12 text-center">
              <p className="text-base font-medium text-[#0F172A] dark:text-white mb-1">
                No activity yet
              </p>
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                Create a resume, download it, or apply to a job — your analytics will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Summary cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <StatCard
                  label="Resumes Created"
                  value={totals.resumes}
                  icon={<FileText className="h-4 w-4" />}
                  color="violet"
                />
                <StatCard
                  label="Applications Sent"
                  value={totals.applications}
                  icon={<Send className="h-4 w-4" />}
                  color="blue"
                />
                <StatCard
                  label="AI Checks"
                  value={totals.aiChecks}
                  icon={<Brain className="h-4 w-4" />}
                  color="emerald"
                />
                <StatCard
                  label="Job Matches"
                  value={totals.matches}
                  icon={<Briefcase className="h-4 w-4" />}
                  color="amber"
                />
              </div>

              {/* Row 1: Area chart (wide) + Pie chart */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Area — all activity over time */}
                <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-5 lg:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-base font-semibold text-[#0F172A] dark:text-white">
                        Weekly Activity
                      </h2>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                        Last 8 weeks, grouped by week
                      </p>
                    </div>
                  </div>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weekly}>
                        <defs>
                          <linearGradient id="gradResumes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.resumes} stopOpacity={0.35} />
                            <stop offset="95%" stopColor={COLORS.resumes} stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradApps" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.applications} stopOpacity={0.35} />
                            <stop offset="95%" stopColor={COLORS.applications} stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradAI" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.aiChecks} stopOpacity={0.35} />
                            <stop offset="95%" stopColor={COLORS.aiChecks} stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradMatches" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.matches} stopOpacity={0.35} />
                            <stop offset="95%" stopColor={COLORS.matches} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#E2E8F0"
                        />
                        <XAxis
                          dataKey="week"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748B", fontSize: 11 }}
                          dy={8}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748B", fontSize: 11 }}
                          dx={-8}
                          allowDecimals={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#E2E8F0",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                          labelFormatter={(_label, payload) => {
                            const p = payload?.[0]?.payload as WeekBucket | undefined;
                            return p?.weekStart ?? _label;
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="resumes"
                          name="Resumes"
                          stroke={COLORS.resumes}
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#gradResumes)"
                        />
                        <Area
                          type="monotone"
                          dataKey="applications"
                          name="Applications"
                          stroke={COLORS.applications}
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#gradApps)"
                        />
                        <Area
                          type="monotone"
                          dataKey="aiChecks"
                          name="AI Checks"
                          stroke={COLORS.aiChecks}
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#gradAI)"
                        />
                        <Area
                          type="monotone"
                          dataKey="matches"
                          name="Job Matches"
                          stroke={COLORS.matches}
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#gradMatches)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie — proportion of activity types */}
                <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-5 lg:p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
                    Activity Breakdown
                  </h2>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-4">
                    All-time totals
                  </p>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={85}
                          paddingAngle={3}
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={PIE_COLORS[index % PIE_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#E2E8F0",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: "11px" }}
                          iconSize={8}
                          iconType="circle"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Row 2: Bar chart + Line chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Bar — applications per week */}
                <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-5 lg:p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
                    Applications per Week
                  </h2>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-4">
                    Weekly applications sent
                  </p>
                  <div className="h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weekly}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#E2E8F0"
                        />
                        <XAxis
                          dataKey="week"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748B", fontSize: 11 }}
                          dy={8}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748B", fontSize: 11 }}
                          dx={-8}
                          allowDecimals={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#E2E8F0",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                          cursor={{ fill: "rgba(37,99,235,0.06)" }}
                          labelFormatter={(_label, payload) => {
                            const p = payload?.[0]?.payload as WeekBucket | undefined;
                            return p?.weekStart ?? _label;
                          }}
                        />
                        <Bar
                          dataKey="applications"
                          name="Applications"
                          fill={COLORS.applications}
                          radius={[6, 6, 0, 0]}
                          maxBarSize={36}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Line — resumes + AI checks trend */}
                <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-5 lg:p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
                    Resumes & AI Checks
                  </h2>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-4">
                    Weekly trend
                  </p>
                  <div className="h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weekly}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#E2E8F0"
                        />
                        <XAxis
                          dataKey="week"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748B", fontSize: 11 }}
                          dy={8}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748B", fontSize: 11 }}
                          dx={-8}
                          allowDecimals={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#E2E8F0",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                          labelFormatter={(_label, payload) => {
                            const p = payload?.[0]?.payload as WeekBucket | undefined;
                            return p?.weekStart ?? _label;
                          }}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: "11px" }}
                          iconSize={8}
                          iconType="circle"
                        />
                        <Line
                          type="monotone"
                          dataKey="resumes"
                          name="Resumes"
                          stroke={COLORS.resumes}
                          strokeWidth={2.5}
                          dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="aiChecks"
                          name="AI Checks"
                          stroke={COLORS.aiChecks}
                          strokeWidth={2.5}
                          dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Row 3: Bar chart — job matches */}
              <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-5 lg:p-6 shadow-sm">
                <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
                  Job Matches per Week
                </h2>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-4">
                  Weekly unique matches surfaced
                </p>
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weekly}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#E2E8F0"
                      />
                      <XAxis
                        dataKey="week"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748B", fontSize: 11 }}
                        dy={8}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748B", fontSize: 11 }}
                        dx={-8}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#E2E8F0",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        cursor={{ fill: "rgba(245,158,11,0.08)" }}
                        labelFormatter={(_label, payload) => {
                          const p = payload?.[0]?.payload as WeekBucket | undefined;
                          return p?.weekStart ?? _label;
                        }}
                      />
                      <Bar
                        dataKey="matches"
                        name="Job Matches"
                        fill={COLORS.matches}
                        radius={[6, 6, 0, 0]}
                        maxBarSize={36}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: "violet" | "blue" | "emerald" | "amber";
}) {
  const palette = {
    violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-4 lg:p-5 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${palette}`}>{icon}</div>
      </div>
      <div className="text-2xl lg:text-3xl font-bold text-[#0F172A] dark:text-white">
        {value}
      </div>
      <div className="text-xs lg:text-sm font-medium text-[#64748B] dark:text-[#94A3B8] mt-1">
        {label}
      </div>
    </motion.div>
  );
}