'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Brain,
  Target,
  PenLine,
  Briefcase,
  Zap,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';

type Feature = { icon: LucideIcon; title: string; description: string };

const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: 'Smart Resume Analysis',
    description:
      'Deep AI review of structure, content, and impact — highlighting exactly what to fix.',
  },
  {
    icon: Target,
    title: 'ATS Optimization',
    description:
      'Beat applicant tracking systems with keyword-perfect formatting tuned to each role.',
  },
  {
    icon: PenLine,
    title: 'Professional Rewriting',
    description:
      'GPT-powered bullet rewrites that quantify results and speak the language of hiring managers.',
  },
  {
    icon: Briefcase,
    title: 'Job Matching',
    description:
      'Get matched to roles that fit your profile — with a fit score for every posting.',
  },
  {
    icon: Zap,
    title: 'Auto-Application',
    description:
      'One-click apply to hundreds of jobs with tailored resumes and cover letters.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description:
      'Track views, responses, and interview rates across every version of your resume.',
  },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">Features</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Everything you need to get hired faster.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Purpose-built tools that take your resume from overlooked to shortlisted.
          </p>
        </div>

        <div ref={ref} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_oklch(0.62_0.19_262/0.25)] hover:border-accent/30"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}