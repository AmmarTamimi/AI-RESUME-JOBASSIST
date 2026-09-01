"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Resume } from "@/app/types/Content";
import { loadResumeLocal } from "../../../../../app/lib/resumeStore";
import PreviewPanel from "../../../../../app/components/resumeBuilder/PreviewPanel";
import { Bot, Briefcase, Edit3, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumeCompletePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    setResume(loadResumeLocal(id));
  }, [id]);

  if (!resume) {
    return (
      <div className="h-screen flex items-center justify-center text-[#64748B]">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading your resume…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* LEFT — actions */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white">
              Your resume is ready 🎉
            </h1>
            <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
              Download it, share it, or take the next step.
            </p>
          </div>

          <ActionCard
            icon={<Briefcase className="h-6 w-6 text-emerald-500" />}
            title="Find Relevant Jobs"
            description="Search open roles that match your profile"
            onClick={() => router.push(`/dashboard/resume/${id}/jobs`)}
            accent="emerald"
          />

          <ActionCard
            icon={<Bot className="h-6 w-6 text-purple-500" />}
            title="Get AI Feedback"
            description="Personalized suggestions to strengthen your resume"
            onClick={() => router.push(`/dashboard/resume/${id}/feedback`)}
            accent="purple"
          />

          <ActionCard
            icon={<Edit3 className="h-6 w-6 text-blue-500" />}
            title="Keep Editing"
            description="Go back and adjust content or design"
            onClick={() => router.push(`/dashboard/resume/${id}/edit`)}
            accent="blue"
          />
        </div>

        {/* RIGHT — resume preview, with its own download/share toolbar */}
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] overflow-hidden">
          <PreviewPanel
            templateId={resume.templateId}
            theme={resume.theme}
            content={resume.content}
            onSwitchTemplate={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  icon, title, description, onClick, accent,
}: { icon: React.ReactNode; title: string; description: string; onClick: () => void; accent: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 bg-${accent}-50 dark:bg-${accent}-950/30 border border-${accent}-200 dark:border-${accent}-800/30 rounded-xl hover:shadow-lg transition-all group text-left`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-${accent}-100 dark:bg-${accent}-900/30`}>{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#0F172A] dark:text-white">{title}</h3>
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{description}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-[#94A3B8] group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>
  );
}