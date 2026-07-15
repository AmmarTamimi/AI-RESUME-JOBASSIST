'use client';

import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

type Variant = 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate';

const palette: Record<Variant, { bar: string; chip: string; dot: string }> = {
  indigo: { bar: 'bg-accent', chip: 'bg-accent/15 text-accent', dot: 'bg-accent' },
  emerald: { bar: 'bg-emerald-500', chip: 'bg-emerald-500/15 text-emerald-600', dot: 'bg-emerald-500' },
  amber: { bar: 'bg-amber-500', chip: 'bg-amber-500/15 text-amber-600', dot: 'bg-amber-500' },
  rose: { bar: 'bg-rose-500', chip: 'bg-rose-500/15 text-rose-600', dot: 'bg-rose-500' },
  slate: { bar: 'bg-slate-700', chip: 'bg-slate-700/15 text-slate-700', dot: 'bg-slate-700' },
};

export function ResumeMockup({
  variant = 'indigo',
  name = 'Alex Morgan',
  role = 'Senior Product Designer',
  layout = 'sidebar',
  className,
}: {
  variant?: Variant;
  name?: string;
  role?: string;
  layout?: 'sidebar' | 'classic' | 'modern';
  className?: string;
}) {
  const p = palette[variant];

  if (layout === 'classic') {
    return (
      <div className={cn("aspect-[3/4] w-full rounded-xl bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] ring-1 ring-black/5 overflow-hidden p-4 text-[8px] text-slate-700", className)}>
        <div className="text-center border-b border-slate-200 pb-2">
          <div className="text-[13px] font-bold tracking-tight text-slate-900">{name}</div>
          <div className={cn("text-[8px] font-medium mt-0.5", p.chip, "inline-block px-1.5 py-0.5 rounded")}>{role}</div>
          <div className="mt-1 text-[7px] text-slate-500">alex@email.com · linkedin.com/in/alex</div>
        </div>
        {["Experience", "Education", "Skills"].map((s) => (
          <div key={s} className="mt-2">
            <div className={cn("text-[9px] font-semibold uppercase tracking-wider", "text-slate-900")}>{s}</div>
            <div className={cn("h-0.5 w-full mt-0.5 rounded", p.bar)} />
            <div className="mt-1 space-y-1">
              <div className="h-1 w-11/12 rounded bg-slate-200" />
              <div className="h-1 w-10/12 rounded bg-slate-200" />
              <div className="h-1 w-9/12 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layout === 'modern') {
    return (
      <div className={cn("aspect-[3/4] w-full rounded-xl bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] ring-1 ring-black/5 overflow-hidden", className)}>
        <div className={cn("h-1/4 p-3 flex flex-col justify-end", p.bar)}>
          <div className="text-[13px] font-bold text-white">{name}</div>
          <div className="text-[8px] text-white/80">{role}</div>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex gap-1 flex-wrap">
            {["Figma", "React", "AI/UX", "Design"].map((t) => (
              <span key={t} className={cn("text-[7px] px-1.5 py-0.5 rounded", p.chip)}>{t}</span>
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-1">
                <div className={cn("h-1 w-1 rounded-full", p.dot)} />
                <div className="h-1 w-1/2 rounded bg-slate-800/70" />
              </div>
              <div className="h-0.5 w-full rounded bg-slate-200" />
              <div className="h-0.5 w-11/12 rounded bg-slate-200" />
              <div className="h-0.5 w-9/12 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // sidebar
  return (
    <div className={cn("aspect-[3/4] w-full rounded-xl bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] ring-1 ring-black/5 overflow-hidden flex", className)}>
      <div className={cn("w-1/3 p-3 text-white flex flex-col gap-2", p.bar)}>
        <div className="h-8 w-8 rounded-full bg-white/25" />
        <div>
          <div className="text-[10px] font-bold leading-tight">{name}</div>
          <div className="text-[7px] opacity-80">{role}</div>
        </div>
        <div className="mt-2">
          <div className="text-[7px] font-semibold uppercase opacity-90">Skills</div>
          <div className="mt-1 space-y-1">
            <div className="h-0.5 w-full rounded bg-white/40" />
            <div className="h-0.5 w-10/12 rounded bg-white/40" />
            <div className="h-0.5 w-8/12 rounded bg-white/40" />
          </div>
        </div>
        <div className="mt-1">
          <div className="text-[7px] font-semibold uppercase opacity-90">Contact</div>
          <div className="mt-1 space-y-1">
            <div className="h-0.5 w-11/12 rounded bg-white/40" />
            <div className="h-0.5 w-9/12 rounded bg-white/40" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-2">
        {["Experience", "Education", "Projects"].map((s) => (
          <div key={s}>
            <div className="flex items-center gap-1">
              <Check className={cn("h-2 w-2", p.chip.split(" ")[1])} />
              <div className="text-[8px] font-semibold text-slate-900">{s}</div>
            </div>
            <div className="mt-1 space-y-1 pl-2.5">
              <div className="h-1 w-11/12 rounded bg-slate-200" />
              <div className="h-1 w-10/12 rounded bg-slate-200" />
              <div className="h-1 w-8/12 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}