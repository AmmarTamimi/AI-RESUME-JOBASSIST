"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  Target,
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  Zap,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import PreviewPanel from "@/app/components/resumeBuilder/PreviewPanel";
import { loadResumeLocal } from "@/app/lib/resumeStore";
import type { Resume } from "@/app/types/Content";
import Link from "next/link";
import { getResumeById } from "@/app/lib/supabase/resume";

// ---------------------------------------------------------------------------
// Placeholder analysis — swap for real API call later
// ---------------------------------------------------------------------------

type SectionFeedback = {
  id: string;
  title: string;
  icon: React.ReactNode;
  score: number;         // 0-100
  summary: string;
  strengths: string[];
  improvements: string[];
};

type AnalysisResult = {
  atsScore: number;
  overallScore: number;
  summary: string;
  sectionFeedback: SectionFeedback[];
  keywordsMissing: string[];
  keywordsPresent: string[];
  topRecommendations: string[];
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AIFeedbackPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [resume, setResume] = useState<Resume | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showFullPreview, setShowFullPreview] = useState(false);

useEffect(() => {
  let cancelled = false;

  const load = async () => {
    try {
      const r = await getResumeById(id);
      if (!cancelled) setResume(r);
    } catch (err) {
      console.error("Failed to load resume:", err);
    }
  };

  load();

  return () => {
    cancelled = true;
  };
}, [id]);

 useEffect(() => {
  if (!resume) return;
  let cancelled = false;

  const analyze = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/ai/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      console.log("feedback data: ",data)
      if (!cancelled) setAnalysis(data);
    } catch (err) {
      console.error("Feedback error:", err);
      // Optional: show an error state
    } finally {
      if (!cancelled) setIsAnalyzing(false);
    }
  };

  analyze();
  return () => { cancelled = true; };
}, [resume]);
  if (!resume) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAFAFA] dark:bg-[#0B1120]">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <span className="text-sm font-medium">Loading your resume…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0B1120]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/resumeBuilder/${id}/complete`}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <h1 className="text-sm font-semibold text-slate-900 dark:text-white">
                AI Feedback
              </h1>
            </div>
          </div>

          {analysis && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Analyzed just now
              </span>
              <button className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors">
                <TrendingUp className="h-3.5 w-3.5" />
                Apply all fixes
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main layout */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: resume preview */}
          {/* Left: resume preview */}
{/* Left: resume preview */}
{/* Left: resume preview */}
<div className="lg:col-span-5 xl:col-span-4">
  <div className="sticky top-24">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Your Resume
      </p>
      {resume.thumbnail_url && (
        <button
          onClick={() => setShowFullPreview(true)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          Full view
        </button>
      )}
    </div>

    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden w-fit mx-auto">
      {resume.thumbnail_url ? (
        <img
          src={resume.thumbnail_url}
          alt={resume.title ?? "Your resume"}
          className="block h-auto w-auto max-h-[calc(100vh-160px)] max-w-full"
          loading="lazy"
        />
      ) : (
        <div className="aspect-[3/4] flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600">
          <FileText className="h-10 w-10" />
          <p className="text-xs font-medium">No preview available</p>
          <Link
            href={`/dashboard/resumeBuilder/${resume.templateId}?resumeId=${resume.id}`}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Open in editor to generate one
          </Link>
        </div>
      )}
    </div>
  </div>
</div>
{/* Full preview modal */}
{showFullPreview && resume.thumbnail_url && (
  <div
    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
    onClick={() => setShowFullPreview(false)}
  >
    <button
      onClick={() => setShowFullPreview(false)}
      className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      aria-label="Close"
    >
      <X className="h-5 w-5" />
    </button>
    <img
      src={resume.thumbnail_url}
      alt={resume.title ?? "Your resume"}
      className="max-w-full max-h-full object-contain shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}

          {/* Right: analysis */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {isAnalyzing ? (
              <AnalyzingState />
            ) : analysis ? (
              <AnalysisView analysis={analysis} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Analyzing state
// ---------------------------------------------------------------------------

function AnalyzingState() {
  const steps = [
    "Parsing resume structure…",
    "Scoring ATS compatibility…",
    "Analyzing section content…",
    "Generating recommendations…",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="absolute inset-0 rounded-xl bg-violet-500/30 animate-ping" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Analyzing your resume
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This usually takes 15–30 seconds
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 }}
            className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"
          >
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.4 + 0.4 }}
                className="w-1.5 h-1.5 rounded-full bg-blue-600"
              />
            </div>
            {step}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Analysis view
// ---------------------------------------------------------------------------

function AnalysisView({ analysis }: { analysis: AnalysisResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Score cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ScoreCard
          label="ATS Score"
          value={analysis.atsScore}
          description="How well your resume passes automated screening"
          icon={<Target className="h-4 w-4" />}
        />
        <ScoreCard
          label="Overall Quality"
          value={analysis.overallScore}
          description="Content strength, clarity, and impact"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
              Summary
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {analysis.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Section-by-section feedback */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          Section feedback
        </h2>
        {analysis.sectionFeedback.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>

      {/* Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KeywordPanel
          title="Keywords found"
          items={analysis.keywordsPresent}
          variant="success"
        />
        <KeywordPanel
          title="Keywords missing"
          items={analysis.keywordsMissing}
          variant="warning"
        />
      </div>

      {/* Top recommendations */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
            <Zap className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Top recommendations
          </h3>
        </div>
        <ol className="space-y-3">
          {analysis.topRecommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400 shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {rec}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Score card
// ---------------------------------------------------------------------------

function ScoreCard({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  const { color, ringColor, bgColor, label: scoreLabel } = getScoreStyle(value);

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 dark:text-slate-500">{icon}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </span>
        </div>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${bgColor} ${color}`}>
          {scoreLabel}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <svg width="72" height="72" className="-rotate-90">
            <circle
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              strokeWidth="6"
              className="stroke-slate-100 dark:stroke-slate-800"
            />
            <motion.circle
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className={ringColor}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {value}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section card
// ---------------------------------------------------------------------------

function SectionCard({ section }: { section: SectionFeedback }) {
  const [expanded, setExpanded] = useState(true);
  const { color, bgColor } = getScoreStyle(section.score);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
            {section.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              {section.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {section.summary}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-4">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${bgColor} ${color}`}>
            {section.score}
          </span>
          <ChevronRight
            className={`h-4 w-4 text-slate-400 transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t border-slate-200 dark:border-slate-800 px-5 py-4 space-y-4"
        >
          {section.strengths.length > 0 && (
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Strengths
              </p>
              <ul className="space-y-1.5">
                {section.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-5 relative">
                    <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.improvements.length > 0 && (
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">
                <AlertCircle className="h-3.5 w-3.5" />
                Improvements
              </p>
              <ul className="space-y-1.5">
                {section.improvements.map((s, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-5 relative">
                    <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Keyword panel
// ---------------------------------------------------------------------------

function KeywordPanel({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "success" | "warning";
}) {
  const styles = {
    success: {
      pill: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
      icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />,
    },
    warning: {
      pill: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900",
      icon: <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />,
    },
  }[variant];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-center gap-2 mb-3">
        {styles.icon}
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        <span className="text-xs text-slate-400 ml-auto">{items.length}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${styles.pill}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getScoreStyle(score: number) {
  if (score >= 80) {
    return {
      color: "text-emerald-700 dark:text-emerald-400",
      ringColor: "stroke-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
      label: "Excellent",
    };
  }
  if (score >= 60) {
    return {
      color: "text-blue-700 dark:text-blue-400",
      ringColor: "stroke-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/40",
      label: "Good",
    };
  }
  if (score >= 40) {
    return {
      color: "text-amber-700 dark:text-amber-400",
      ringColor: "stroke-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/40",
      label: "Needs work",
    };
  }
  return {
    color: "text-red-700 dark:text-red-400",
    ringColor: "stroke-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/40",
    label: "Critical",
  };
}
