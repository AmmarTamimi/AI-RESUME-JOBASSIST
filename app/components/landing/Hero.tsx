'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Play, Wand2, FileText, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import { ResumeMockup } from './ResumeMockup';

const TRUSTED = ['Google', 'Stripe', 'Airbnb', 'Notion', 'Linear', 'Figma'];

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* decorative background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.62_0.19_262/0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.7_0.18_20/0.10),transparent_55%)]" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-accent/10 blur-3xl animate-pulse-glow" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: copy */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              GPT-5 powered · Live now
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.05]"
            >
              Build a resume that gets you{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-accent via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
                  hired
                </span>
                <svg aria-hidden viewBox="0 0 200 12" className="absolute -bottom-2 left-0 w-full">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.7 }}
                    d="M2 8 Q 50 -2 100 6 T 198 4"
                    stroke="url(#g)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.19 262)" />
                      <stop offset="100%" stopColor="oklch(0.7 0.2 20)" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Drop in your old resume — ResumeAI rewrites it, optimizes for ATS, matches you to
              real jobs, and auto-applies while you sleep.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3"
            >
              <Link
                href="/build-resume"
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-fuchsia-600 text-white px-6 py-3 text-sm font-medium shadow-[0_10px_30px_-10px_oklch(0.62_0.19_262/0.6)] hover:shadow-[0_18px_40px_-10px_oklch(0.62_0.19_262/0.8)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                <Wand2 className="h-4 w-4 group-hover:rotate-12 transition" />
                Build my resume free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </Link>
              {/* <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition"
              >
                <Play className="h-4 w-4 fill-current" /> Watch 60s demo
              </Link> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Users hired at
              </p>
              <div className="mt-3 flex flex-wrap items-center lg:justify-start justify-center gap-x-6 gap-y-2">
                {TRUSTED.map((name) => (
                  <span key={name} className="text-sm font-semibold text-muted-foreground/70">
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: animated app preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main resume card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-20"
              >
                <ResumeMockup variant="indigo" layout="sidebar" className="max-w-sm mx-auto" />
              </motion.div>

              {/* Back templates */}
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [-8, -6, -8] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-4 top-8 w-40 z-10 origin-bottom-right hidden sm:block"
              >
                <ResumeMockup variant="emerald" layout="modern" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [8, 10, 8] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-2 top-12 w-40 z-10 origin-bottom-left hidden sm:block"
              >
                <ResumeMockup variant="rose" layout="classic" />
              </motion.div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -left-2 sm:-left-10 bottom-24 z-30 rounded-xl bg-background/90 backdrop-blur border border-border shadow-xl p-3 flex items-center gap-3 animate-float"
              >
                <div className="h-9 w-9 rounded-lg bg-emerald-500/15 text-emerald-600 grid place-items-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground">ATS score</div>
                  <div className="text-sm font-semibold text-foreground">96 / 100</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -right-2 sm:-right-6 top-20 z-30 rounded-xl bg-background/90 backdrop-blur border border-border shadow-xl p-3 flex items-center gap-3"
                style={{ animationDelay: '1s' }}
              >
                <div className="h-9 w-9 rounded-lg bg-accent/15 text-accent grid place-items-center">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground">Rewriting bullets</div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    12 improved
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-4 z-30 rounded-xl bg-background/95 backdrop-blur border border-border shadow-xl px-4 py-2.5 flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-fuchsia-600 text-white grid place-items-center">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground">Interview rate</div>
                  <div className="text-sm font-semibold text-foreground">
                    +312% <span className="text-emerald-600">↑</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="absolute -top-3 right-8 z-30 rounded-full bg-gradient-to-br from-accent to-fuchsia-600 text-white p-2 shadow-lg"
              >
                <Sparkles className="h-4 w-4 animate-pulse" />
              </motion.div>

              {/* Glow */}
              <div aria-hidden className="absolute inset-0 -z-10 blur-3xl">
                <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-accent/25" />
                <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-rose-400/20" />
              </div>
            </div>

            {/* small floating icons */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-0 left-4 text-accent/40 hidden md:block"
            >
              <FileText className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}