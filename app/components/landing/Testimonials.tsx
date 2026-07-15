'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const ITEMS = [
  {
    quote:
      'ResumeAI got me 4 interviews in my first week. The ATS score tool alone is worth it.',
    name: 'Sarah Chen',
    role: 'Senior Product Designer',
    company: 'Figma',
    initials: 'SC',
  },
  {
    quote:
      'The rewriting is uncanny — it made my bullets sound like me, only sharper. Landed my dream role.',
    name: 'Marcus Reid',
    role: 'Staff Engineer',
    company: 'Stripe',
    initials: 'MR',
  },
  {
    quote:
      'Auto-apply saved me hundreds of hours. I actually enjoyed job searching for the first time.',
    name: 'Priya Kapoor',
    role: 'Marketing Lead',
    company: 'Notion',
    initials: 'PK',
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">Testimonials</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Loved by job seekers everywhere.
          </h2>
        </div>

        <div ref={ref} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ITEMS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-foreground/90 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-semibold">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}