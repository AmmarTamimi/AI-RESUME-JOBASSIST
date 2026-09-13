"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import type { ResumeContent } from "@/app/types/Content";

interface ImportResumeModalProps {
  open: boolean;
  onClose: () => void;
  /**
   * Called after successful parse.
   * - Templates page: create a resume, then call this with the new resumeId.
   * - Editor: call this with the parsed content to replace in place.
   * The caller decides what to do. The modal itself knows nothing about
   * resumes or routing.
   */
  onImported: (result: ImportResult) => void;
}

export interface ImportResult {
  content: ResumeContent;
  // Filled by the templates page after it creates the resume; editor
  // ignores this field.
  resumeId?: string;
}

type Stage = "idle" | "uploading" | "parsing" | "reviewing" | "error";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED = ".pdf,.docx,.txt";

export default function ImportResumeModal({
  open,
  onClose,
  onImported,
}: ImportResumeModalProps) {
  const [stage, setStage] = useState<Stage>("idle");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ResumeContent | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setStage("idle");
    setError(null);
    setParsed(null);
    setDragActive(false);
  }, []);

  const handleClose = () => {
    if (stage === "uploading" || stage === "parsing") return; // don't close mid-work
    reset();
    onClose();
  };

  const handleFile = async (file: File) => {
    setError(null);

    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum size is 5MB.");
      setStage("error");
      return;
    }

    setStage("uploading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      setStage("parsing");

      const res = await fetch("/api/resume/import", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to parse resume");
      }

      const { content } = await res.json();
      setParsed(content);
      setStage("reviewing");
    } catch (err) {
      console.error("Import error:", err);
      setError(err instanceof Error ? err.message : "Failed to import resume");
      setStage("error");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleConfirm = () => {
    if (!parsed) return;
    onImported({ content: parsed });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-lg bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] dark:border-[#334155]">
                <div>
                  <h2 className="text-base font-semibold text-[#0F172A] dark:text-white">
                    Import your resume
                  </h2>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    We'll extract your info and let you edit it
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={stage === "uploading" || stage === "parsing"}
                  className="p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors disabled:opacity-50"
                >
                  <X className="h-4 w-4 text-[#64748B]" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {stage === "idle" && (
                  <>
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={handleDrop}
                      onClick={() => inputRef.current?.click()}
                      className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                        dragActive
                          ? "border-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20"
                          : "border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB]/50 hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/50"
                      }`}
                    >
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#EFF6FF] dark:bg-[#1E3A8A]/30 flex items-center justify-center mb-3">
                        <Upload className="h-5 w-5 text-[#2563EB]" />
                      </div>
                      <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-1">
                        Drop your resume here, or click to browse
                      </p>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                        PDF, DOCX, or TXT · up to 5 MB
                      </p>
                      <input
                        ref={inputRef}
                        type="file"
                        accept={ACCEPTED}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFile(file);
                        }}
                      />
                    </div>

                    <div className="mt-5 space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                        What happens next
                      </p>
                      <ol className="space-y-1.5">
                        {[
                          "We read your resume and extract your info",
                          "You review what was found and fix anything wrong",
                          "Edit and customize in our editor",
                        ].map((step, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#F1F5F9] dark:bg-[#1E293B] text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </>
                )}

                {(stage === "uploading" || stage === "parsing") && (
                  <div className="py-8 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 text-white animate-spin" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[#0F172A] dark:text-white">
                      {stage === "uploading" ? "Uploading…" : "Reading your resume…"}
                    </p>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                      This usually takes 10–20 seconds
                    </p>
                  </div>
                )}

                {stage === "reviewing" && parsed && (
                  <ReviewExtracted
                    content={parsed}
                    onConfirm={handleConfirm}
                    onBack={reset}
                  />
                )}

                {stage === "error" && (
                  <div className="py-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-1">
                      Couldn't read that file
                    </p>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] max-w-xs">
                      {error || "Something went wrong. Try a different file."}
                    </p>
                    <button
                      onClick={reset}
                      className="mt-5 px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Review extracted content
// ---------------------------------------------------------------------------

function ReviewExtracted({
  content,
  onConfirm,
  onBack,
}: {
  content: ResumeContent;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const { personalInfo, sections } = content;

  const summary = {
    name: personalInfo.fullName || "—",
    title: personalInfo.title || "—",
    experiences: sections.find((s) => s.type === "experience")?.items.length ?? 0,
    educations: sections.find((s) => s.type === "education")?.items.length ?? 0,
    skills: sections.find((s) => s.type === "ratedSkills")?.items.length ?? 0,
  };

  return (
    <div>
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#0F172A] dark:text-white">
            Here's what we found
          </p>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
            You can fix any mistakes after importing
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#E2E8F0] dark:border-[#334155] divide-y divide-[#E2E8F0] dark:divide-[#334155]">
        <Row label="Name" value={summary.name} />
        <Row label="Title" value={summary.title} />
        <Row label="Experiences" value={`${summary.experiences} found`} />
        <Row label="Education" value={`${summary.educations} found`} />
        <Row label="Skills" value={`${summary.skills} found`} />
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-2 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155] rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
        >
          Use a different file
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
        >
          Looks good, continue
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 text-sm">
      <span className="text-[#64748B] dark:text-[#94A3B8] text-xs">{label}</span>
      <span className="text-[#0F172A] dark:text-white font-medium truncate ml-3">
        {value}
      </span>
    </div>
  );
}