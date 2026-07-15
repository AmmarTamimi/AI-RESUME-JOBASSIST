'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground px-8 py-16 md:px-16 md:py-24 text-center"
        >
          <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-accent/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to land your next role?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/70 max-w-xl mx-auto">
              Join thousands of professionals using ResumeAI to get hired faster.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-accent text-accent-foreground px-6 py-3 text-sm font-medium hover:opacity-90 active:scale-[0.98] transition"
              >
                Get started free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/25 px-6 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition"
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}