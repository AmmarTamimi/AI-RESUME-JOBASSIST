'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ResumeMockup } from './ResumeMockup';
import { Sparkles, Wand2, Palette } from 'lucide-react';

const TEMPLATES = [
  { variant: 'indigo' as const, layout: 'sidebar' as const, name: 'Executive', tag: 'Most popular' },
  { variant: 'emerald' as const, layout: 'modern' as const, name: 'Product', tag: 'Tech' },
  { variant: 'amber' as const, layout: 'classic' as const, name: 'Classic', tag: 'ATS-safe' },
  { variant: 'rose' as const, layout: 'modern' as const, name: 'Creative', tag: 'Design' },
  { variant: 'slate' as const, layout: 'sidebar' as const, name: 'Consultant', tag: 'Finance' },
  { variant: 'indigo' as const, layout: 'classic' as const, name: 'Academic', tag: 'Research' },
];

export function Templates() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="templates" className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      <div aria-hidden className="absolute top-1/2 -translate-y-1/2 left-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-rose-400/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground">
            <Palette className="h-3.5 w-3.5 text-accent" />
            30+ recruiter-approved templates
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Pick a template. <span className="bg-gradient-to-r from-accent to-rose-500 bg-clip-text text-transparent">Watch AI fill it in.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every layout is engineered for ATS parsing and tuned by real hiring managers.
          </p>
        </div>

        <div ref={ref} className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {TEMPLATES.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, rotate: -1 }}
              className="group relative cursor-pointer"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/30 to-rose-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition" />
              <div className="relative">
                <ResumeMockup variant={t.variant} layout={t.layout} />
                <div className="absolute top-2 right-2 text-[9px] font-medium bg-white/95 text-slate-700 px-1.5 py-0.5 rounded shadow-sm ring-1 ring-black/5">
                  {t.tag}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                <Sparkles className="h-3.5 w-3.5 text-accent opacity-0 group-hover:opacity-100 transition" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center">
          <Link href="#" className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition">
            <Wand2 className="h-4 w-4" /> Generate my resume
          </Link>
        </div>
      </div>
    </section>
  );
}