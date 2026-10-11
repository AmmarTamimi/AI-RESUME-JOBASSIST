"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Send,
  Calendar,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  Download,
  Pencil,
  Upload,
  Brain,
  X,
  Loader2,
  Building2,
  ExternalLink,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Shell } from "../components/layout/Shell-temp";
import { useAuth } from "../providers/auth-provider";
import {
  ActivityEvent,
  ActivityType,
  getActivities,
  formatRelativeTime,
  logActivity,
} from "../lib/activityStore";
import { createClient } from "@/app/lib/supabase/client";
import { createResume } from "@/app/lib/supabase/resume";

const ICON_BY_TYPE: Record<ActivityType, any> = {
  resume_created: FileText,
  resume_updated: Pencil,
  resume_downloaded: Download,
  resume_imported: Upload,
  resume_checked: Brain,
  application_sent: Send,
  interview_scheduled: Calendar,
  job_matched: CheckCircle2,
};

function getTrend(type: ActivityType, activities: ActivityEvent[]): string {
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const count = activities.filter(
    (a) => a.type === type && a.timestamp >= oneWeekAgo,
  ).length;
  if (count === 0) return "No change this week";
  return `+${count} this week`;
}

const PROMPT_EXAMPLES = [
  "Senior Frontend Engineer with 5 years at a fintech startup",
  "Product Designer focused on B2B SaaS, based in Berlin",
  "Data Scientist with ML experience, target: healthcare industry",
  "Marketing Manager specializing in growth and content strategy",
];

const JOB_BOARD_HOSTS = [
  "linkedin.com",
  "indeed.com",
  "glassdoor.com",
  "ziprecruiter.com",
  "jobs.lever.co",
  "boards.greenhouse.io",
  "jobs.ashbyhq.com",
  "apply.workable.com",
  "smartrecruiters.com",
  "workday.com",
  "myworkdayjobs.com",
  "recruitee.com",
  "bamboohr.com",
  "jobvite.com",
  "icims.com",
  "taleo.net",
];

const COMPANY_DOMAINS: Record<string, string> = {
  stripe: "stripe.com",
  vercel: "vercel.com",
  linear: "linear.app",
  airbnb: "airbnb.com",
  notion: "notion.so",
  figma: "figma.com",
  shopify: "shopify.com",
  duolingo: "duolingo.com",
  cloudflare: "cloudflare.com",
  github: "github.com",
  gitlab: "gitlab.com",
  google: "google.com",
  apple: "apple.com",
  microsoft: "microsoft.com",
  meta: "meta.com",
  facebook: "facebook.com",
  netflix: "netflix.com",
  amazon: "amazon.com",
  spotify: "spotify.com",
  twitter: "twitter.com",
  x: "x.com",
  slack: "slack.com",
  zoom: "zoom.us",
  dropbox: "dropbox.com",
  salesforce: "salesforce.com",
  adobe: "adobe.com",
  ibm: "ibm.com",
  oracle: "oracle.com",
  uber: "uber.com",
  lyft: "lyft.com",
  doordash: "doordash.com",
  instacart: "instacart.com",
  reddit: "reddit.com",
  pinterest: "pinterest.com",
  snapchat: "snapchat.com",
  tiktok: "tiktok.com",
  booking: "booking.com",
  expedia: "expedia.com",
  paypal: "paypal.com",
  square: "squareup.com",
  plaid: "plaid.com",
  twilio: "twilio.com",
  mongodb: "mongodb.com",
  supabase: "supabase.com",
  railway: "railway.app",
  netlify: "netlify.com",
  heroku: "heroku.com",
  digitalocean: "digitalocean.com",
  openai: "openai.com",
  anthropic: "anthropic.com",
  huggingface: "huggingface.co",
  databricks: "databricks.com",
  snowflake: "snowflake.com",
  qureos: "qureos.com",
  netsol: "netsoltech.com",
  arbisoft: "arbisoft.com",
  careem: "careem.com",
  daraz: "daraz.pk",
  foodpanda: "foodpanda.pk",
  bykea: "bykea.com",
  zameen: "zameen.com",
  jazz: "jazz.com.pk",
  telenor: "telenor.com.pk",
  ufone: "ufone.com",
  mckinsey: "mckinsey.com",
  bcg: "bcg.com",
  bain: "bain.com",
  deloitte: "deloitte.com",
  pwc: "pwc.com",
  kpmg: "kpmg.com",
  ey: "ey.com",
  accenture: "accenture.com",
};

function domainFromCompany(company: string): string | null {
  if (!company) return null;
  const key = company.toLowerCase().trim();

  if (COMPANY_DOMAINS[key]) return COMPANY_DOMAINS[key];

  const cleaned = key
    .replace(
      /\b(inc|inc\.|llc|ltd|limited|corp|corporation|company|co\.|gmbh|pvt|private)\b/gi,
      "",
    )
    .trim();
  if (cleaned && COMPANY_DOMAINS[cleaned]) return COMPANY_DOMAINS[cleaned];

  const words = cleaned.split(/\s+/);
  for (const [name, domain] of Object.entries(COMPANY_DOMAINS)) {
    if (words.some((w) => w === name) || cleaned.includes(name)) {
      return domain;
    }
  }

  const slug = cleaned.replace(/[^a-z0-9]/g, "");
  return slug ? `${slug}.com` : null;
}

type ApplicationInfo = {
  company: string;
  role: string;
  location: string;
  applyUrl: string | null;
  domain: string | null;
  logoUrl: string | null;
};

function extractApplicationInfo(event: ActivityEvent): ApplicationInfo {
  const title = event.title || "";
  const meta = (event.meta || {}) as any;

  let role = meta.role ? String(meta.role) : "";
  let company = meta.company ? String(meta.company) : "";
  const location =
    (meta.location && String(meta.location)) ||
    (meta.jobLocation && String(meta.jobLocation)) ||
    "";
  const applyUrl =
    (meta.applyUrl && String(meta.applyUrl)) ||
    (meta.url && String(meta.url)) ||
    null;

  // The exact logo URL the job board API gave us at apply time
  const logoUrl =
    (meta.companyLogo && String(meta.companyLogo)) ||
    (meta.logoUrl && String(meta.logoUrl)) ||
    null;

  if (!company || !role) {
    const match = title.match(/^Applied to (.+?) at (.+?)(?:\s*\(.+\))?$/i);
    if (match) {
      if (!role) role = match[1].trim();
      if (!company) company = match[2].trim();
    }
  }
  if (!company) {
    company = title.replace(/^Applied to\s*/i, "").trim() || "Company";
  }

  let domain: string | null = null;
  if (meta.companyDomain) {
    domain = String(meta.companyDomain).replace(/^www\./, "");
  }

  if (!domain) {
    domain = domainFromCompany(company);
  }

  if (!domain && applyUrl) {
    try {
      const host = new URL(applyUrl).hostname.replace(/^www\./, "");
      const isJobBoard = JOB_BOARD_HOSTS.some(
        (b) => host === b || host.endsWith(`.${b}`),
      );
      if (!isJobBoard) {
        domain = host;
      }
    } catch {
      /* ignore */
    }
  }

  return { company, role, location, applyUrl, domain, logoUrl };
}

function CompanyLogo({
  company,
  domain,
  logoUrl,
}: {
  company: string;
  domain: string | null;
  logoUrl: string | null;
}) {
  const [sourceIndex, setSourceIndex] = useState(0);

  const initials =
    company
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "CO";

  const isJobBoard =
    domain &&
    JOB_BOARD_HOSTS.some((b) => domain === b || domain.endsWith(`.${b}`));

  const candidates: string[] = [];

  // 1. Preferred: the exact logo URL the job board gave us. Highest
  //    quality, and guaranteed to match what the user saw when they
  //    applied.
  if (logoUrl) {
    candidates.push(logoUrl);
  }

  // 2. Guessed domain → Clearbit (proper 404) → DuckDuckGo → favicon
  if (domain && !isJobBoard) {
    candidates.push(`https://logo.clearbit.com/${domain}?size=128`);
    candidates.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
    candidates.push(`https://${domain}/favicon.ico`);
  }

  const tryNext = () => setSourceIndex((i) => i + 1);

  if (candidates.length === 0 || sourceIndex >= candidates.length) {
    return (
      <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md shadow-blue-500/25">
        {initials}
      </div>
    );
  }

  return (
    <div className="shrink-0 w-11 h-11 rounded-xl bg-white border border-white/70 dark:border-white/10 shadow-md shadow-blue-500/10 flex items-center justify-center overflow-hidden">
      <img
        key={candidates[sourceIndex]}
        src={candidates[sourceIndex]}
        alt={company}
        className="w-full h-full object-contain p-1.5"
        onError={tryNext}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activities, setActivities] = useState<ActivityEvent[]>([]);

  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    let cancelled = false;

    const load = async () => {
      const data = await getActivities();
      if (!cancelled) setActivities(data);
    };

    load();

    const handler = () => load();
    window.addEventListener("activity-updated", handler);
    return () => {
      cancelled = true;
      window.removeEventListener("activity-updated", handler);
    };
  }, [user?.id]);

  const resumeCount = activities.filter(
    (a) => a.type === "resume_created",
  ).length;
  const applicationCount = activities.filter(
    (a) => a.type === "application_sent",
  ).length;
  const aiCheckedCount = activities.filter(
    (a) => a.type === "resume_checked",
  ).length;
  const matchCount = activities.filter(
    (a) => a.type === "job_matched",
  ).length;

  const stats = [
    {
      label: "Resumes Created",
      value: String(resumeCount),
      icon: FileText,
      trend: getTrend("resume_created", activities),
      onClick: undefined as (() => void) | undefined,
      hint: undefined as string | undefined,
    },
    {
      label: "Applications Sent",
      value: String(applicationCount),
      icon: Send,
      trend: getTrend("application_sent", activities),
      onClick: () => setIsApplicationsOpen(true),
      hint: "View applications",
    },
    {
      label: "Resumes Checked with AI",
      value: String(aiCheckedCount),
      icon: Brain,
      trend: getTrend("resume_checked", activities),
      onClick: undefined as (() => void) | undefined,
      hint: undefined as string | undefined,
    },
    {
      label: "Job Matches",
      value: String(matchCount),
      icon: Briefcase,
      trend: getTrend("job_matched", activities),
      onClick: undefined as (() => void) | undefined,
      hint: undefined as string | undefined,
    },
  ];

  const getDisplayName = () => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.email) return user.email.split("@")[0];
    return "there";
  };

  const displayName = getDisplayName();
  const recentActivity = activities.slice(0, 5);

  const applications = useMemo(
    () => activities.filter((a) => a.type === "application_sent"),
    [activities],
  );

  const openBuilder = () => {
    setPrompt("");
    setError(null);
    setIsBuilderOpen(true);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please describe the resume you want to build.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/build-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }

      const {
        content,
        theme: returnedTheme,
        templateId,
        title,
      } = await res.json();

      if (!content || !content.personalInfo) {
        throw new Error("AI returned an invalid resume structure");
      }

      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (!authUser) throw new Error("Not signed in");

      const created = await createResume({
        userId: authUser.id,
        templateId: templateId || "modern-01",
        theme: returnedTheme,
        content,
        title: title || content.personalInfo.fullName || "AI Resume",
        thumbnail_url: null,
        status: "draft",
      });

      void logActivity(
        "resume_created",
        `AI built resume "${created.title || content.personalInfo.fullName}"`,
      );

      setIsBuilderOpen(false);
      router.push(
        `/dashboard/resumeBuilder/${created.templateId}?resumeId=${created.id}`,
      );
    } catch (err) {
      console.error("Build failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Shell>
      <div className="flex-1 overflow-auto bg-[#F8FAFC] dark:bg-[#0F172A] p-3 sm:p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8"
        >
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">
              Overview
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-[#64748B] dark:text-[#94A3B8] mt-0.5 sm:mt-1">
              Welcome back,{" "}
              <span className="font-semibold text-[#0F172A] dark:text-white">
                {displayName}
              </span>
              . Here's what's happening with your job search.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {stats.map((stat, i) => {
              const clickable = !!stat.onClick;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={stat.onClick}
                  role={clickable ? "button" : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (clickable && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      stat.onClick?.();
                    }
                  }}
                  className={`group relative bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm transition-all duration-200 overflow-hidden ${
                    clickable
                      ? "cursor-pointer hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-1"
                      : "hover:shadow-md"
                  }`}
                >
                  {clickable && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                      style={{
                        background:
                          "radial-gradient(120% 80% at 50% 0%, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0) 60%)",
                      }}
                    />
                  )}

                  <div className="relative flex justify-between items-start mb-2 sm:mb-3 lg:mb-4">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 transition-transform duration-200 group-hover:scale-110">
                      <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-emerald-500" />
                  </div>
                  <div className="relative">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0F172A] dark:text-white">
                      {stat.value}
                    </h3>
                    <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5 sm:mt-1">
                      {stat.label}
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 sm:mt-1.5 lg:mt-2">
                      {stat.trend}
                    </p>
                  </div>

                  {clickable && stat.hint && (
                    <div className="relative mt-2 sm:mt-3 flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                      <span>{stat.hint}</span>
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col">
              <h2 className="text-base sm:text-lg font-semibold text-[#0F172A] dark:text-white mb-3 sm:mb-4">
                Recent Activity
              </h2>
              <div className="flex-1 space-y-3 sm:space-y-4">
                {recentActivity.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-3 rounded-full bg-[#F1F5F9] dark:bg-[#334155] mb-3">
                      <Clock className="h-5 w-5 text-[#94A3B8]" />
                    </div>
                    <p className="text-sm font-medium text-[#0F172A] dark:text-white">
                      No activity yet
                    </p>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 max-w-xs">
                      Create a resume, download it, or track a job application
                      to see it here.
                    </p>
                  </div>
                ) : (
                  recentActivity.map((activity, i) => {
                    const Icon = ICON_BY_TYPE[activity.type] || FileText;
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2.5 sm:gap-3 lg:gap-4 pb-3 sm:pb-4 border-b border-[#E2E8F0] dark:border-[#334155] last:border-0 last:pb-0"
                      >
                        <div className="mt-0.5 p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 flex-shrink-0">
                          <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-[#0F172A] dark:text-white leading-relaxed">
                            {activity.title}
                          </p>
                          <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5 sm:mt-1">
                            {formatRelativeTime(activity.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col items-center text-center justify-center relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-600/20 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3 sm:mb-4">
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#0F172A] dark:text-white mb-1 sm:mb-2">
                  Let AI build your next resume
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mb-4 sm:mb-5 lg:mb-6 max-w-xs mx-auto">
                  Our new AI agent can analyze your target jobs and craft a
                  perfectly tailored resume in seconds.
                </p>
                <button
                  onClick={openBuilder}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-lg transition-colors w-full shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  Try AI Builder
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isApplicationsOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsApplicationsOpen(false)}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-2xl pointer-events-auto"
                >
                  <div
                    aria-hidden
                    className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-blue-400/40 via-sky-400/30 to-cyan-300/35 blur-2xl"
                  />

                  <div
                    className="relative rounded-3xl overflow-hidden border border-white/50 dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.45)]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.7) 45%, rgba(224,242,254,0.85) 100%)",
                      backdropFilter: "blur(22px) saturate(180%)",
                      WebkitBackdropFilter: "blur(22px) saturate(180%)",
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 hidden dark:block"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,58,138,0.4) 50%, rgba(15,23,42,0.9) 100%)",
                      }}
                    />

                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-24 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(191,219,254,0.75), rgba(191,219,254,0))",
                        mixBlendMode: "overlay",
                      }}
                    />

                    <div className="relative">
                      <div className="flex items-center justify-between px-6 py-5 border-b border-white/50 dark:border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-sky-600 shadow-lg shadow-blue-500/40">
                            <Send className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h2 className="text-base font-semibold text-[#0F172A] dark:text-white">
                              Applications Sent
                            </h2>
                            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                              {applications.length === 0
                                ? "No applications yet"
                                : `${applications.length} ${
                                    applications.length === 1
                                      ? "application"
                                      : "applications"
                                  } logged`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsApplicationsOpen(false)}
                          className="p-2 rounded-lg hover:bg-white/70 dark:hover:bg-white/10 transition-colors"
                        >
                          <X className="h-4 w-4 text-[#64748B]" />
                        </button>
                      </div>

                      <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
                        {applications.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-14 text-center">
                            <div className="p-4 rounded-full bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 mb-3">
                              <Briefcase className="h-6 w-6 text-[#64748B] dark:text-[#94A3B8]" />
                            </div>
                            <p className="text-sm font-semibold text-[#0F172A] dark:text-white">
                              No applications yet
                            </p>
                            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1 max-w-xs">
                              When you click <strong>View &amp; Apply</strong>{" "}
                              on a job, it will appear here.
                            </p>
                          </div>
                        ) : (
                          <ul className="space-y-2">
                            {applications.map((event) => {
                              const info = extractApplicationInfo(event);
                              return (
                                <motion.li
                                  key={event.id}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="group flex items-start gap-3 px-3.5 py-3.5 rounded-2xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-colors shadow-sm"
                                >
                                  <CompanyLogo
                                    company={info.company}
                                    domain={info.domain}
                                    logoUrl={info.logoUrl}
                                  />

                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                      <Building2 className="h-3.5 w-3.5 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                                      <p className="text-sm font-semibold text-[#0F172A] dark:text-white truncate">
                                        {info.company}
                                      </p>
                                    </div>

                                    {info.role && (
                                      <p className="text-xs text-[#334155] dark:text-[#CBD5E1] mt-1 font-medium truncate">
                                        {info.role}
                                      </p>
                                    )}

                                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
                                      {info.location && (
                                        <span className="inline-flex items-center gap-1 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                                          <MapPin className="h-3 w-3" />
                                          {info.location}
                                        </span>
                                      )}
                                      <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                                        {formatRelativeTime(event.timestamp)}
                                      </span>
                                    </div>
                                  </div>

                                  {info.applyUrl && (
                                    <a
                                      href={info.applyUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="shrink-0 self-center inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-500/15 hover:bg-blue-100 dark:hover:bg-blue-500/25 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      Open
                                    </a>
                                  )}
                                </motion.li>
                              );
                            })}
                          </ul>
                        )}
                      </div>

                      <div className="px-6 py-4 border-t border-white/50 dark:border-white/10 flex items-center justify-end">
                        <button
                          onClick={() => setIsApplicationsOpen(false)}
                          className="px-4 py-2 text-sm font-medium text-[#0F172A] dark:text-white bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/10 hover:bg-white dark:hover:bg-white/20 rounded-lg transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isBuilderOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isGenerating && setIsBuilderOpen(false)}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              >
                <div
                  className="w-full max-w-2xl bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl pointer-events-auto overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0] dark:border-[#334155]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-[#0F172A] dark:text-white">
                          AI Resume Builder
                        </h2>
                        <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                          Describe the resume you want — the AI handles the rest
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => !isGenerating && setIsBuilderOpen(false)}
                      disabled={isGenerating}
                      className="p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors disabled:opacity-50"
                    >
                      <X className="h-4 w-4 text-[#64748B]" />
                    </button>
                  </div>

                  <div className="p-6">
                    <label className="block text-sm font-medium text-[#0F172A] dark:text-white mb-2">
                      What kind of resume do you need?
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder='e.g. "Senior React developer with 6 years experience in fintech, based in New York. Led a team of 4, shipped 3 major products, and reduced bundle size by 40%."'
                      rows={6}
                      disabled={isGenerating}
                      className="w-full px-4 py-3 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none text-[#0F172A] dark:text-white disabled:opacity-60"
                    />

                    <p className="mt-3 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Try one of these examples:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {PROMPT_EXAMPLES.map((example) => (
                        <button
                          key={example}
                          onClick={() => setPrompt(example)}
                          disabled={isGenerating}
                          className="text-xs px-3 py-1.5 rounded-full bg-[#F1F5F9] dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155] hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors disabled:opacity-50"
                        >
                          {example}
                        </button>
                      ))}
                    </div>

                    {error && (
                      <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40">
                        <p className="text-xs text-red-700 dark:text-red-400">
                          {error}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-4 border-t border-[#E2E8F0] dark:border-[#334155] flex items-center justify-between gap-3">
                    <p className="text-xs text-[#94A3B8]">
                      {isGenerating
                        ? "Building your resume… this takes 20–30 seconds"
                        : "Takes 20–30 seconds"}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsBuilderOpen(false)}
                        disabled={isGenerating}
                        className="px-4 py-2 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] rounded-lg transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded-lg transition-all shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Building…
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            Build Resume
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  );
}