'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, Cpu, MessageSquare, Send, type LucideIcon } from 'lucide-react';

type Step = { icon: LucideIcon; title: string; description: string };

const STEPS: Step[] = [
  {
    icon: Upload,
    title: 'Upload Your Resume',
    description: 'Drop in your PDF or DOCX — we handle the rest.',
  },
  {
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Our models score every section against real hiring data.',
  },
  {
    icon: MessageSquare,
    title: 'Get Feedback',
    description: 'Actionable rewrites and formatting fixes, line by line.',
  },
  {
    icon: Send,
    title: 'Apply Smartly',
    description: 'Auto-apply to matched roles with tailored versions.',
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">How it Works</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            From upload to offer in four steps.
          </h2>
        </div>

        <div ref={ref} className="relative mt-16">
          <div aria-hidden className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center lg:text-left"
              >
                <div className="relative mx-auto lg:mx-0 h-16 w-16 rounded-full bg-background border border-border grid place-items-center shadow-sm">
                  <s.icon className="h-6 w-6 text-accent" />
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold grid place-items-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}