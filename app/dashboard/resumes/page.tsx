"use client";

import { Shell } from "../../components/layout/Shell-temp";
import { motion } from "framer-motion";
import { Plus, MoreVertical, Edit, Download, FileText } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { getUserResumes } from "@/app/lib/supabase/resume";
import { templates } from "../../components/templates/templates";
import type { Resume } from "@/app/types/Content";
import Link from "next/link";

// Small helper to make the "updated X ago" string from an ISO date
function formatUpdated(updatedAt?: string): string {
  if (!updatedAt) return "Draft";
  const diff = Date.now() - new Date(updatedAt).getTime();
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(diff / 3600000);
  const day = Math.floor(diff / 86400000);
  if (min < 1) return "Updated just now";
  if (min < 60) return `Updated ${min}m ago`;
  if (hr < 24) return `Updated ${hr}h ago`;
  if (day < 7) return `Updated ${day}d ago`;
  if (day < 30) return `Updated ${Math.floor(day / 7)}w ago`;
  return `Updated ${new Date(updatedAt).toLocaleDateString()}`;
}

export default function Resumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("Not authenticated");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getUserResumes(user.id);
        setResumes(data);
      } catch (err) {
        console.error("Failed to load resumes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <Shell>
      <div className="flex-1 overflow-auto bg-background p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                My Resumes
              </h1>
              <p className="text-muted-foreground">
                Manage and edit your existing resumes.
              </p>
            </div>
            <Link href="/dashboard/templates">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Plus className="h-4 w-4" />
                Create New Resume
              </Button>
            </Link>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-muted rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}

              <Link href="/dashboard/templates">
                <div className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all aspect-[3/4]">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <Plus className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Create from scratch
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Start with a blank canvas or use the AI builder.
                  </p>
                </div>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </Shell>
  );
}

// ---------------------------------------------------------------------------
// Resume Card
// ---------------------------------------------------------------------------

function ResumeCard({ resume }: { resume: Resume }) {
  // Prefer the resume's own thumbnail, fall back to the template's thumbnail,
  // then to a neutral gradient placeholder.
  const template = templates.find((t) => t.id === resume.templateId);
  const thumbnail = resume.thumbnail_url ?? template?.thumbnail ?? null;

  const isCompleted = resume.status === "completed";

  return (
    <motion.div
      whileHover={{ y: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
    >
      {/* Thumbnail */}
      <Link
        href={`/dashboard/resumeBuilder/${resume.templateId}/edit?id=${resume.id}`}
        className="block relative aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 border-b border-border overflow-hidden"
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={resume.title ?? "Resume"}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <FileText className="h-12 w-12" />
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
              isCompleted
                ? "bg-emerald-500/90 text-white"
                : "bg-amber-500/90 text-white"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            {isCompleted ? "Completed" : "Draft"}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              // download handler
            }}
            className="bg-white/15 hover:bg-white/25 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              // edit handler (link already wraps the card, so this is optional)
            }}
            className="bg-white/15 hover:bg-white/25 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </Link>

      {/* Meta */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link
            href={`/dashboard/resumeBuilder/${resume.templateId}/edit?id=${resume.id}`}
            className="font-semibold text-sm text-foreground line-clamp-2 leading-tight hover:text-primary transition-colors"
          >
            {resume.title || "Untitled Resume"}
          </Link>
          <button
            className="text-muted-foreground hover:text-foreground shrink-0 -mt-1 p-1 rounded transition-colors"
            title="More options"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-auto pt-2">
          {formatUpdated(resume.updatedAt)}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
        <FileText className="h-8 w-8" />
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-1">
        No resumes yet
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Start by picking a template. You can customize it and download it as PDF
        or share it online.
      </p>
      <Link href="/dashboard/templates">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="h-4 w-4" />
          Create your first resume
        </Button>
      </Link>
    </div>
  );
}