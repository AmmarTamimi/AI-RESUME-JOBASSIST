'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Kick the tires with core analysis.',
    features: ['1 resume upload', 'Basic ATS score', '3 AI suggestions', 'PDF export'],
    cta: 'Start free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    description: 'For serious job seekers.',
    features: [
      'Unlimited uploads',
      'Full ATS optimization',
      'AI rewriting & tailoring',
      'Job matching',
      '50 auto-applies / mo',
      'Analytics dashboard',
    ],
    cta: 'Get Pro',
    href: '/signup',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams, bootcamps, and career centers.',
    features: [
      'Everything in Pro',
      'Team seats & roles',
      'SSO & SCIM',
      'Custom integrations',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
  },
];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-accent">Pricing</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Simple, honest pricing.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you're ready to accelerate.
          </p>
        </div>

        <div ref={ref} className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                'relative rounded-2xl border bg-card p-8 flex flex-col transition-all duration-300 hover:-translate-y-1',
                t.highlighted
                  ? 'border-accent shadow-[0_24px_60px_-20px_oklch(0.62_0.19_262/0.35)]'
                  : 'border-border hover:shadow-lg',
              )}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent text-accent-foreground text-xs font-medium px-3 py-1">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  {t.price}
                </span>
                <span className="text-muted-foreground">{t.period}</span>
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={t.href}
                className={cn(
                  'mt-8 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition',
                  t.highlighted
                    ? 'bg-accent text-accent-foreground hover:opacity-90'
                    : 'border border-border bg-background text-foreground hover:bg-secondary',
                )}
              >
                {t.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}