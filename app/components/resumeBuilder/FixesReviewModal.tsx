"use client";

// app/components/resumeBuilder/FixesReviewModal.tsx

import { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";
import { needsInput, type FixChange } from "@/app/lib/resumeFixes";

type Props = {
  open: boolean;
  loading: boolean;
  error: string | null;
  changes: FixChange[];
  saving: boolean;
  onClose: () => void;
  onRetry: () => void;
  onApply: (selected: FixChange[]) => void;
};

const KIND_LABEL: Record<FixChange["kind"], string> = {
  summary: "Summary",
  bullet: "Bullet",
  itemDescription: "Description",
  addSkill: "New skill",
};

// Highlights [placeholders] so the user sees what they still need to fill in.
function WithPlaceholders({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]{1,24}\])/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\[[^\]]{1,24}\]$/.test(p) ? (
          <mark
            key={i}
            className="rounded bg-amber-200/70 px-1 text-amber-900 dark:bg-amber-500/30 dark:text-amber-200"
          >
            {p}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export default function FixesReviewModal({
  open,
  loading,
  error,
  changes,
  saving,
  onClose,
  onRetry,
  onApply,
}: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Select everything by default, except edits that still contain placeholders.
  useEffect(() => {
    setSelected(
      new Set(changes.filter((c) => !needsInput(c.after)).map((c) => c.id)),
    );
  }, [changes]);

  const groups = useMemo(() => {
    const map = new Map<string, FixChange[]>();
    for (const c of changes) {
      const list = map.get(c.sectionTitle) ?? [];
      list.push(c);
      map.set(c.sectionTitle, list);
    }
    return Array.from(map.entries());
  }, [changes]);

  if (!open) return null;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allSelected = changes.length > 0 && selected.size === changes.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={saving ? undefined : onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 p-1.5">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Review suggested improvements
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Uncheck anything you don&apos;t want. Nothing changes until you apply.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            aria-label="Close"
            className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-16 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <p className="text-sm font-medium">Writing improvements…</p>
              <p className="text-xs">This usually takes 10–25 seconds</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <p className="max-w-sm break-words text-sm text-slate-600 dark:text-slate-400">
                {error}
              </p>
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Try again
              </button>
            </div>
          ) : changes.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
              No safe automatic edits were found. Try the manual suggestions in each section.
            </p>
          ) : (
            <div className="space-y-6">
              {groups.map(([title, list]) => (
                <div key={title}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {title}
                  </h3>
                  <div className="space-y-3">
                    {list.map((c) => {
                      const isOn = selected.has(c.id);
                      const placeholder = needsInput(c.after);
                      return (
                        <label
                          key={c.id}
                          className={`block cursor-pointer rounded-xl border p-4 transition-colors ${
                            isOn
                              ? "border-blue-300 bg-blue-50/40 dark:border-blue-900 dark:bg-blue-950/20"
                              : "border-slate-200 dark:border-slate-800"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isOn}
                              onChange={() => toggle(c.id)}
                              className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
                            />
                            <div className="min-w-0 flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                  {KIND_LABEL[c.kind]}
                                </span>
                                {c.itemLabel && (
                                  <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                                    {c.itemLabel}
                                  </span>
                                )}
                                {placeholder && (
                                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
                                    Needs your input
                                  </span>
                                )}
                              </div>

                              {c.kind === "addSkill" ? (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
                                  <Plus className="h-3 w-3" />
                                  {c.after}
                                </span>
                              ) : (
                                <div className="space-y-1.5 text-sm leading-relaxed">
                                  <p className="rounded-lg bg-red-50 px-3 py-2 text-red-800 line-through decoration-red-300 dark:bg-red-950/30 dark:text-red-300">
                                    {c.before}
                                  </p>
                                  <p className="rounded-lg bg-emerald-50 px-3 py-2 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                                    <WithPlaceholders text={c.after} />
                                  </p>
                                </div>
                              )}

                              {c.reason && (
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {c.reason}
                                </p>
                              )}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && changes.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {selected.size} of {changes.length} selected
              </span>
              <button
                onClick={() =>
                  setSelected(
                    allSelected ? new Set() : new Set(changes.map((c) => c.id)),
                  )
                }
                className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                {allSelected ? "Select none" : "Select all"}
              </button>
            </div>
            <button
              onClick={() =>
                onApply(changes.filter((c) => selected.has(c.id)))
              }
              disabled={selected.size === 0 || saving}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
              Apply {selected.size} {selected.size === 1 ? "change" : "changes"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
