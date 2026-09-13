"use client";

import { useEffect, useState } from "react";
// In your Next.js project use: import { useParams, useRouter } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import type { Resume } from "@/app/types/Content";
import { loadResumeLocal } from "@/app/lib/resumeStore";
import PreviewPanel from "@/app/components/resumeBuilder/PreviewPanel";
import {
  Bot,
  Briefcase,
  Edit3,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { getResumeById } from "@/app/lib/supabase/resume";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardHoverVariants = {
  rest: { y: 0, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.05)" },
  hover: { y: -3, boxShadow: "0 20px 40px -12px rgb(59 130 246 / 0.15)" },
};

export default function ResumeCompletePage() {
  const { id } = useParams<{ id: string }>();
  const [templateId, setTemplateId] = useState("")
  const router = useRouter();
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    const fetchResume = async() => {
      const r = await getResumeById(id)
      setResume(r)
      if(r?.templateId){
        setTemplateId(r?.templateId)
      }
    }
    fetchResume()
  }, [id]);

  if (!resume) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <span className="text-sm font-medium">Loading your resume…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf9f6] px-4 py-8 md:px-8 md:py-12">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-200/15 blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT — actions */}
          <motion.div className="lg:col-span-5 xl:col-span-4" variants={itemVariants}>
            <div className="sticky top-8 space-y-6">
              {/* Success header */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-7 shadow-lg shadow-blue-900/5"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50" />

                <div className="relative">
                  <div className="mb-5 flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                      className="relative"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/25">
                        <CheckCircle2 className="h-7 w-7" />
                      </div>
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-white"
                      >
                        <Sparkles className="h-3 w-3" />
                      </motion.div>
                    </motion.div>

                    <div className="rounded-full bg-emerald-50 px-3 py-1">
                      <span className="text-xs font-semibold text-emerald-600">100% Complete</span>
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Your resume is ready
                  </h1>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                    Download it, share it, or take the next step toward landing your next role.
                  </p>

                  {/* <div className="mt-6 flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    >
                      <motion.span
                        className="inline-flex"
                        whileHover={{ y: 2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Download className="h-4 w-4" />
                      </motion.span>
                      Download
                    </motion.button>
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    >
                      <Share2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
                      Share
                    </motion.button>
                  </div> */}
                </div>
              </motion.div>

              {/* Action cards */}
              <div className="space-y-3">
                <p className="px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  What would you like to do next?
                </p>

                <ActionCard
                  icon={<Briefcase className="h-5 w-5" />}
                  title="Find Relevant Jobs"
                  description="Search open roles that match your profile and experience."
                  onClick={() => router.push(`/dashboard/resumeBuilder/${id}/jobs`)}
                  color="blue"
                />
                <ActionCard
                  icon={<Bot className="h-5 w-5" />}
                  title="Get AI Feedback"
                  description="Personalized suggestions to strengthen your resume."
                  onClick={() => router.push(`/dashboard/resumeBuilder/${id}/feedback`)}
                  color="indigo"
                />
                <ActionCard
                  icon={<Edit3 className="h-5 w-5" />}
                  title="Keep Editing"
                  description="Go back and adjust content, layout, or design."
                  onClick={() => router.push(`/dashboard/resumeBuilder/${templateId}?resumeId=${id}`)}
                  color="slate"
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — resume preview */}
          <motion.div className="lg:col-span-7 xl:col-span-8" variants={itemVariants}>
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-lg shadow-slate-900/5 md:p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <h2 className="text-sm font-semibold text-slate-700">Live Preview</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {resume.title || "Untitled Resume"}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-[#faf9f6]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
                 <PreviewPanel
            templateId={resume.templateId}
            theme={resume.theme}
            content={resume.content}
            onSwitchTemplate={() => {}}
            variant="minimal"
          />
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Preview updates automatically as you edit
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  onClick,
  color = "blue",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  color?: "blue" | "indigo" | "slate";
}) {
  const colorStyles = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      icon: "text-blue-600",
      hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-blue-700",
      hoverIcon: "group-hover:text-white",
      border: "group-hover:border-blue-300",
      arrow: "group-hover:text-blue-600",
    },
    indigo: {
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100/50",
      icon: "text-indigo-600",
      hoverBg: "group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-indigo-700",
      hoverIcon: "group-hover:text-white",
      border: "group-hover:border-indigo-300",
      arrow: "group-hover:text-indigo-600",
    },
    slate: {
      bg: "bg-gradient-to-br from-slate-100 to-slate-200/50",
      icon: "text-slate-600",
      hoverBg: "group-hover:bg-gradient-to-br group-hover:from-slate-700 group-hover:to-slate-800",
      hoverIcon: "group-hover:text-white",
      border: "group-hover:border-slate-400",
      arrow: "group-hover:text-slate-700",
    },
  };

  const styles = colorStyles[color];

  return (
    <motion.button
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.99 }}
      variants={cardHoverVariants}
      transition={{ duration: 0.25 }}
      className={`group flex w-full items-start gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 text-left shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${styles.border}`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.bg} ${styles.hoverBg} text-blue-600 transition-all duration-300 ${styles.hoverIcon}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-slate-900">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
      <motion.div
        variants={{
          rest: { x: 0 },
          hover: { x: 3 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="mt-1.5 shrink-0"
      >
        <ArrowRight className={`h-5 w-5 text-slate-300 transition-colors ${styles.arrow}`} />
      </motion.div>
    </motion.button>
  );
}