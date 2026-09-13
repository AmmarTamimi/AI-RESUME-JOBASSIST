"use client";

import { Shell } from "../../components/layout/Shell-temp";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MoreVertical, Edit, Download, FileText, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { getUserResumes, deleteResume } from "@/app/lib/supabase/resume";
import { templates } from "../../components/templates/templates";
import type { Resume } from "@/app/types/Content";
import Link from "next/link";

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
  const [showDraftsOnly, setShowDraftsOnly] = useState(false);

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

  const draftsCount = useMemo(
    () => resumes.filter((r) => r.status === "draft").length,
    [resumes],
  );

  const visibleResumes = useMemo(
    () =>
      showDraftsOnly ? resumes.filter((r) => r.status === "draft") : resumes,
    [resumes, showDraftsOnly],
  );

  // Called by ResumeCard after a successful delete
  const handleDeleted = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

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
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                My Resumes
              </h1>
              <p className="text-muted-foreground">
                Manage and edit your existing resumes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDraftsOnly((v) => !v)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  showDraftsOnly
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-foreground border-border hover:bg-muted"
                }`}
                title={showDraftsOnly ? "Show all resumes" : "Show drafts only"}
              >
                <FileText className="h-4 w-4" />
                <span>Drafts</span>
                {draftsCount > 0 && (
                  <span
                    className={`ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold ${
                      showDraftsOnly
                        ? "bg-background/20 text-background"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {draftsCount}
                  </span>
                )}
              </button>

              <Link href="/dashboard/templates">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Resume
                </Button>
              </Link>
            </div>
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
          ) : visibleResumes.length === 0 ? (
            <EmptyState
              showDraftsOnly={showDraftsOnly}
              onClear={() => setShowDraftsOnly(false)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleResumes.map((resume) => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onDeleted={handleDeleted}
                  />
                ))}
              </AnimatePresence>

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

function ResumeCard({
  resume,
  onDeleted,
}: {
  resume: Resume;
  onDeleted: (id: string) => void;
}) {
  const template = templates.find((t) => t.id === resume.templateId);
  const thumbnail = resume.thumbnail_url ?? template?.thumbnail ?? null;
  console.log("thumbnail url: ",thumbnail)
  const isCompleted = resume.status === "completed";

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteResume(resume.id);
      onDeleted(resume.id);
    } catch (err) {
      console.error("Failed to delete resume:", err);
      alert("Failed to delete resume. Please try again.");
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
      >
        {/* Thumbnail */}
        <Link
          href={`/dashboard/resumeBuilder/${resume.templateId}?resumeId=${resume.id}`}
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
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide backdrop-blur-md border ${
                isCompleted
                  ? "bg-background/85 text-foreground border-border/60"
                  : "bg-background/85 text-muted-foreground border-border/60"
              }`}
            >
              {!isCompleted ? (
                <FileText className="h-4 w-4" />
              ) : (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCompleted ? "bg-emerald-500" : "bg-muted-foreground/50"
                  }`}
                />
              )}
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
                // edit handler
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

            {/* Three-dot menu */}
            <div className="relative shrink-0 -mt-1" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
                title="More options"
                aria-label="More options"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-20"
                  >
                    {/* <button
                      onClick={() => {
                        setMenuOpen(false);
                        // rename handler — add later
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors text-left"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Rename
                    </button> */}
                    <div className="h-px bg-border" />
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setConfirmOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-auto pt-2">
            {formatUpdated(resume.updatedAt)}
          </p>
        </div>
      </motion.div>

      {/* Delete confirmation dialog */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => !isDeleting && setConfirmOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-card border border-border rounded-xl shadow-xl p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <Trash2 className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Delete resume?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground">
                      {resume.title || "Untitled Resume"}
                    </span>{" "}
                    will be permanently deleted. This action can&apos;t be
                    undone.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setConfirmOpen(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2"
                >
                  {isDeleting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState({
  showDraftsOnly,
  onClear,
}: {
  showDraftsOnly: boolean;
  onClear: () => void;
}) {
  if (showDraftsOnly) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
          <FileText className="h-8 w-8" />
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-1">
          No drafts
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          You don&apos;t have any resumes in draft state right now.
        </p>
        <button
          onClick={onClear}
          className="text-sm font-medium text-primary hover:underline"
        >
          Show all resumes
        </button>
      </div>
    );
  }

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