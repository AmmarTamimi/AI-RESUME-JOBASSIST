// 'use client';

// import { motion, useInView } from 'framer-motion';
// import { useRef } from 'react';
// import Link from 'next/link';
// import { Check } from 'lucide-react';
// import { cn } from '../../lib/utils';

// const TIERS = [
//   {
//     name: 'Free',
//     price: '$0',
//     period: '/mo',
//     description: 'Kick the tires with core analysis.',
//     features: ['1 resume upload', 'Basic ATS score', '3 AI suggestions', 'PDF export'],
//     cta: 'Start free',
//     href: '/signup',
//     highlighted: false,
//   },
//   {
//     name: 'Pro',
//     price: '$19',
//     period: '/mo',
//     description: 'For serious job seekers.',
//     features: [
//       'Unlimited uploads',
//       'Full ATS optimization',
//       'AI rewriting & tailoring',
//       'Job matching',
//       '50 auto-applies / mo',
//       'Analytics dashboard',
//     ],
//     cta: 'Get Pro',
//     href: '/signup',
//     highlighted: true,
//   },
//   {
//     name: 'Enterprise',
//     price: 'Custom',
//     period: '',
//     description: 'For teams, bootcamps, and career centers.',
//     features: [
//       'Everything in Pro',
//       'Team seats & roles',
//       'SSO & SCIM',
//       'Custom integrations',
//       'Dedicated support',
//     ],
//     cta: 'Contact Sales',
//     href: '/contact',
//     highlighted: false,
//   },
// ];

// export function Pricing() {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: '-80px' });

//   return (
//     <section id="pricing" className="py-24 md:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="text-center max-w-2xl mx-auto">
//           <p className="text-sm font-medium text-accent">Pricing</p>
//           <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
//             Simple, honest pricing.
//           </h2>
//           <p className="mt-4 text-lg text-muted-foreground">
//             Start free. Upgrade when you're ready to accelerate.
//           </p>
//         </div>

//         <div ref={ref} className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
//           {TIERS.map((t, i) => (
//             <motion.div
//               key={t.name}
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               className={cn(
//                 'relative rounded-2xl border bg-card p-8 flex flex-col transition-all duration-300 hover:-translate-y-1',
//                 t.highlighted
//                   ? 'border-accent shadow-[0_24px_60px_-20px_oklch(0.62_0.19_262/0.35)]'
//                   : 'border-border hover:shadow-lg',
//               )}
//             >
//               {t.highlighted && (
//                 <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent text-accent-foreground text-xs font-medium px-3 py-1">
//                   Most Popular
//                 </span>
//               )}
//               <h3 className="text-lg font-semibold text-foreground">{t.name}</h3>
//               <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
//               <div className="mt-6 flex items-baseline gap-1">
//                 <span className="text-5xl font-bold tracking-tight text-foreground">
//                   {t.price}
//                 </span>
//                 <span className="text-muted-foreground">{t.period}</span>
//               </div>
//               <ul className="mt-8 space-y-3 flex-1">
//                 {t.features.map((f) => (
//                   <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
//                     <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
//                     <span>{f}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Link
//                 href={t.href}
//                 className={cn(
//                   'mt-8 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition',
//                   t.highlighted
//                     ? 'bg-accent text-accent-foreground hover:opacity-90'
//                     : 'border border-border bg-background text-foreground hover:bg-secondary',
//                 )}
//               >
//                 {t.cta}
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


















// 'use client';

// import { useState } from 'react';
// import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
// import { Button } from '@/app/components/ui/button';
// import { cn } from '@/app/lib/utils';
// import { ACCENT_VALUES, useAppearance } from '../../providers/appearance-provider';

// type BillingCycle = 'monthly' | 'yearly';

// interface Plan {
//   id: 'free' | 'pro' | 'team';
//   name: string;
//   icon: typeof Sparkles;
//   tagline: string;
//   monthlyPrice: number;
//   yearlyPrice: number;
//   features: string[];
//   cta: string;
//   highlighted?: boolean;
// }

// const plans: Plan[] = [
//   {
//     id: 'free',
//     name: 'Free',
//     icon: Sparkles,
//     tagline: 'Try it out, no card required',
//     monthlyPrice: 0,
//     yearlyPrice: 0,
//     features: [
//       '3 resumes',
//       'Basic AI suggestions',
//       '5 job matches per month',
//       'PDF export',
//       'Community support',
//     ],
//     cta: 'Current Plan',
//   },
//   {
//     id: 'pro',
//     name: 'Pro',
//     icon: Zap,
//     tagline: 'For active job seekers',
//     monthlyPrice: 12,
//     yearlyPrice: 9,
//     features: [
//       'Unlimited resumes',
//       'Advanced AI rewriting',
//       'Unlimited job matches',
//       'ATS score & optimization',
//       'Cover letter generator',
//       'Priority support',
//     ],
//     cta: 'Upgrade to Pro',
//     highlighted: true,
//   },
//   {
//     id: 'team',
//     name: 'Team',
//     icon: Building2,
//     tagline: 'For career coaches & bootcamps',
//     monthlyPrice: 39,
//     yearlyPrice: 29,
//     features: [
//       'Everything in Pro',
//       '10 team seats',
//       'Shared template library',
//       'Client progress dashboard',
//       'Dedicated onboarding',
//       'Priority support + SLA',
//     ],
//     cta: 'Contact Sales',
//   },
// ];

// const comparisonRows = [
//   { label: 'Resumes', free: '3', pro: 'Unlimited', team: 'Unlimited' },
//   { label: 'AI suggestions', free: 'Basic', pro: 'Advanced', team: 'Advanced' },
//   { label: 'Job matches / month', free: '5', pro: 'Unlimited', team: 'Unlimited' },
//   { label: 'ATS optimization', free: '—', pro: '✓', team: '✓' },
//   { label: 'Cover letter generator', free: '—', pro: '✓', team: '✓' },
//   { label: 'Team seats', free: '—', pro: '—', team: '10' },
//   { label: 'Support', free: 'Community', pro: 'Priority', team: 'Priority + SLA' },
// ];

// export default function PlansPage() {
//   const { accent } = useAppearance();
//   const accentValue = ACCENT_VALUES[accent].base;
//   const accentSubtle = ACCENT_VALUES[accent].subtle;

//   const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
//   const currentPlanId: Plan['id'] = 'free'; // TODO: pull from actual subscription data

//   return (
//     <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8 sm:mb-10">
//           <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] dark:text-white">
//             Plans & Pricing
//           </h1>
//           <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] mt-2 max-w-md mx-auto">
//             Pick the plan that fits how seriously you're job hunting.
//           </p>

//           {/* Billing toggle */}
//           <div className="inline-flex items-center gap-1 mt-6 p-1 rounded-full bg-[#F1F5F9] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155]">
//             {(['monthly', 'yearly'] as const).map((cycle) => {
//               const active = billingCycle === cycle;
//               return (
//                 <button
//                   key={cycle}
//                   onClick={() => setBillingCycle(cycle)}
//                   className={cn(
//                     "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
//                     active
//                       ? "bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white shadow-sm"
//                       : "text-[#64748B] dark:text-[#94A3B8]"
//                   )}
//                 >
//                   {cycle === 'monthly' ? 'Monthly' : 'Yearly'}
//                   {cycle === 'yearly' && (
//                     <span
//                       className="ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
//                       style={{ color: accentValue, backgroundColor: accentSubtle }}
//                     >
//                       Save 25%
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Pricing cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">
//           {plans.map((plan) => {
//             const isCurrent = plan.id === currentPlanId;
//             const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

//             return (
//               <div
//                 key={plan.id}
//                 className={cn(
//                   "relative rounded-2xl border p-6 flex flex-col bg-white dark:bg-[#1E293B] transition-shadow",
//                   plan.highlighted
//                     ? "border-2 shadow-lg"
//                     : "border-[#E2E8F0] dark:border-[#334155] shadow-sm"
//                 )}
//                 style={plan.highlighted ? { borderColor: accentValue } : undefined}
//               >
//                 {plan.highlighted && (
//                   <span
//                     className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
//                     style={{ backgroundColor: accentValue }}
//                   >
//                     Most Popular
//                   </span>
//                 )}

//                 <div className="flex items-center gap-2 mb-1">
//                   <plan.icon
//                     className="h-4 w-4"
//                     style={{ color: plan.highlighted ? accentValue : '#94A3B8' }}
//                   />
//                   <h3 className="text-base font-semibold text-[#0F172A] dark:text-white">
//                     {plan.name}
//                   </h3>
//                 </div>
//                 <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-4">
//                   {plan.tagline}
//                 </p>

//                 <div className="flex items-baseline gap-1 mb-5">
//                   <span className="text-3xl font-semibold text-[#0F172A] dark:text-white">
//                     ${price}
//                   </span>
//                   {price > 0 && (
//                     <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">/ month</span>
//                   )}
//                 </div>

//                 <ul className="space-y-2.5 mb-6 flex-1">
//                   {plan.features.map((feature) => (
//                     <li key={feature} className="flex items-start gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
//                       <Check
//                         className="h-4 w-4 flex-shrink-0 mt-0.5"
//                         style={{ color: plan.highlighted ? accentValue : '#94A3B8' }}
//                       />
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>

//                 <Button
//                   disabled={isCurrent}
//                   className={cn(
//                     "w-full",
//                     isCurrent
//                       ? "bg-[#F1F5F9] dark:bg-[#334155] text-[#94A3B8] cursor-not-allowed hover:bg-[#F1F5F9] dark:hover:bg-[#334155]"
//                       : "text-white"
//                   )}
//                   style={!isCurrent ? { backgroundColor: accentValue } : undefined}
//                 >
//                   {isCurrent ? 'Current Plan' : plan.cta}
//                 </Button>
//               </div>
//             );
//           })}
//         </div>

//         {/* Comparison table */}
//         <div className="mt-12 sm:mt-16">
//           <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white mb-4">
//             Compare plans
//           </h2>
//           <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B]">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-[#E2E8F0] dark:border-[#334155]">
//                   <th className="text-left font-medium text-[#64748B] dark:text-[#94A3B8] px-4 py-3">Feature</th>
//                   <th className="text-center font-medium text-[#64748B] dark:text-[#94A3B8] px-4 py-3">Free</th>
//                   <th className="text-center font-medium px-4 py-3" style={{ color: accentValue }}>Pro</th>
//                   <th className="text-center font-medium text-[#64748B] dark:text-[#94A3B8] px-4 py-3">Team</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {comparisonRows.map((row, i) => (
//                   <tr
//                     key={row.label}
//                     className={i !== comparisonRows.length - 1 ? "border-b border-[#E2E8F0] dark:border-[#334155]" : ""}
//                   >
//                     <td className="px-4 py-3 text-[#0F172A] dark:text-white font-medium">{row.label}</td>
//                     <td className="px-4 py-3 text-center text-[#64748B] dark:text-[#94A3B8]">{row.free}</td>
//                     <td className="px-4 py-3 text-center text-[#0F172A] dark:text-white font-medium">{row.pro}</td>
//                     <td className="px-4 py-3 text-center text-[#64748B] dark:text-[#94A3B8]">{row.team}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
















































// 'use client';

// import { useState } from 'react';
// import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
// import { Button } from '@/app/components/ui/button';
// import { cn } from '@/app/lib/utils';
// // import { ACCENT_VALUES, useAppearance } from '../../providers/appearance-provider';
// import { Shell } from '../../components/layout/Shell-temp';

// type BillingCycle = 'monthly' | 'yearly';

// interface Plan {
//   id: 'free' | 'pro' | 'team';
//   name: string;
//   icon: typeof Sparkles;
//   tagline: string;
//   monthlyPrice: number;
//   yearlyPrice: number;
//   features: string[];
//   cta: string;
//   highlighted?: boolean;
// }

// const plans: Plan[] = [
//   {
//     id: 'free',
//     name: 'Free',
//     icon: Sparkles,
//     tagline: 'Try it out, no card required',
//     monthlyPrice: 0,
//     yearlyPrice: 0,
//     features: [
//       '3 resumes',
//       'Basic AI suggestions',
//       '5 job matches per month',
//       'PDF export',
//       'Community support',
//     ],
//     cta: 'Current Plan',
//   },
//   {
//     id: 'pro',
//     name: 'Pro',
//     icon: Zap,
//     tagline: 'For active job seekers',
//     monthlyPrice: 12,
//     yearlyPrice: 9,
//     features: [
//       'Unlimited resumes',
//       'Advanced AI rewriting',
//       'Unlimited job matches',
//       'ATS score & optimization',
//       'Cover letter generator',
//       'Priority support',
//     ],
//     cta: 'Upgrade to Pro',
//     highlighted: true,
//   },
//   {
//     id: 'team',
//     name: 'Team',
//     icon: Building2,
//     tagline: 'For career coaches & bootcamps',
//     monthlyPrice: 39,
//     yearlyPrice: 29,
//     features: [
//       'Everything in Pro',
//       '10 team seats',
//       'Shared template library',
//       'Client progress dashboard',
//       'Dedicated onboarding',
//       'Priority support + SLA',
//     ],
//     cta: 'Contact Sales',
//   },
// ];

// const comparisonRows = [
//   { label: 'Resumes', free: '3', pro: 'Unlimited', team: 'Unlimited' },
//   { label: 'AI suggestions', free: 'Basic', pro: 'Advanced', team: 'Advanced' },
//   { label: 'Job matches / month', free: '5', pro: 'Unlimited', team: 'Unlimited' },
//   { label: 'ATS optimization', free: '—', pro: '✓', team: '✓' },
//   { label: 'Cover letter generator', free: '—', pro: '✓', team: '✓' },
//   { label: 'Team seats', free: '—', pro: '—', team: '10' },
//   { label: 'Support', free: 'Community', pro: 'Priority', team: 'Priority + SLA' },
// ];

// export default function PlansPage() {
// //   const { accent } = useAppearance();
// //   const accentValue = ACCENT_VALUES[accent].base;
// //   const accentSubtle = ACCENT_VALUES[accent].subtle;

//   const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
//   const currentPlanId: Plan['id'] = 'free';

//   return (
//     <Shell>
//       <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         <div className="max-w-5xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-8 sm:mb-10">
//             <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] dark:text-white">
//               Plans & Pricing
//             </h1>
//             <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] mt-2 max-w-md mx-auto">
//               Pick the plan that fits how seriously you're job hunting.
//             </p>

//             {/* Billing toggle */}
//             <div className="inline-flex items-center gap-1 mt-6 p-1 rounded-full bg-[#F1F5F9] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155]">
//               {(['monthly', 'yearly'] as const).map((cycle) => {
//                 const active = billingCycle === cycle;
//                 return (
//                   <button
//                     key={cycle}
//                     onClick={() => setBillingCycle(cycle)}
//                     className={cn(
//                       "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
//                       active
//                         ? "bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white shadow-sm"
//                         : "text-[#64748B] dark:text-[#94A3B8]"
//                     )}
//                   >
//                     {cycle === 'monthly' ? 'Monthly' : 'Yearly'}
//                     {cycle === 'yearly' && (
//                       <span
//                         className="ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
//                       >
//                         Save 25%
//                       </span>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Pricing cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">
//             {plans.map((plan) => {
//               const isCurrent = plan.id === currentPlanId;
//               const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

//               return (
//                 <div
//                   key={plan.id}
//                   className={cn(
//                     "relative rounded-2xl border p-6 flex flex-col bg-white dark:bg-[#1E293B] transition-shadow",
//                     plan.highlighted
//                       ? "border-2 shadow-lg"
//                       : "border-[#E2E8F0] dark:border-[#334155] shadow-sm"
//                   )}
                  
//                 >
//                   {plan.highlighted && (
//                     <span
//                       className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
//                     >
//                       Most Popular
//                     </span>
//                   )}

//                   <div className="flex items-center gap-2 mb-1">
//                     <plan.icon
//                       className="h-4 w-4"
//                     />
//                     <h3 className="text-base font-semibold text-[#0F172A] dark:text-white">
//                       {plan.name}
//                     </h3>
//                   </div>
//                   <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-4">
//                     {plan.tagline}
//                   </p>

//                   <div className="flex items-baseline gap-1 mb-5">
//                     <span className="text-3xl font-semibold text-[#0F172A] dark:text-white">
//                       ${price}
//                     </span>
//                     {price > 0 && (
//                       <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">/ month</span>
//                     )}
//                   </div>

//                   <ul className="space-y-2.5 mb-6 flex-1">
//                     {plan.features.map((feature) => (
//                       <li key={feature} className="flex items-start gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
//                         <Check
//                           className="h-4 w-4 flex-shrink-0 mt-0.5"
//                         />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>

//                   <Button
//                     disabled={isCurrent}
//                     className={cn(
//                       "w-full",
//                       isCurrent
//                         ? "bg-[#F1F5F9] dark:bg-[#334155] text-[#94A3B8] cursor-not-allowed hover:bg-[#F1F5F9] dark:hover:bg-[#334155]"
//                         : "text-white"
//                     )}
//                   >
//                     {isCurrent ? 'Current Plan' : plan.cta}
//                   </Button>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Comparison table */}
//           <div className="mt-12 sm:mt-16">
//             <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white mb-4">
//               Compare plans
//             </h2>
//             <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B]">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-[#E2E8F0] dark:border-[#334155]">
//                     <th className="text-left font-medium text-[#64748B] dark:text-[#94A3B8] px-4 py-3">Feature</th>
//                     <th className="text-center font-medium text-[#64748B] dark:text-[#94A3B8] px-4 py-3">Free</th>
//                     <th className="text-center font-medium text-[#0F172A] dark:text-white px-4 py-3">Pro</th>
//                     <th className="text-center font-medium text-[#64748B] dark:text-[#94A3B8] px-4 py-3">Team</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {comparisonRows.map((row, i) => (
//                     <tr
//                       key={row.label}
//                       className={i !== comparisonRows.length - 1 ? "border-b border-[#E2E8F0] dark:border-[#334155]" : ""}
//                     >
//                       <td className="px-4 py-3 text-[#0F172A] dark:text-white font-medium">{row.label}</td>
//                       <td className="px-4 py-3 text-center text-[#64748B] dark:text-[#94A3B8]">{row.free}</td>
//                       <td className="px-4 py-3 text-center text-[#0F172A] dark:text-white font-medium">{row.pro}</td>
//                       <td className="px-4 py-3 text-center text-[#64748B] dark:text-[#94A3B8]">{row.team}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Shell>
//   );
// }














































'use client';

import { useState } from 'react';
import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/app/lib/utils';
import { Shell } from '../../components/layout/Shell-temp';

type BillingCycle = 'monthly' | 'yearly';

interface Plan {
  id: 'free' | 'pro' | 'team';
  name: string;
  icon: typeof Sparkles;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

// Default blue color
const BLUE = '#2563EB';
const BLUE_SUBTLE = '#DBEAFE'; // blue-100

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    icon: Sparkles,
    tagline: 'Try it out, no card required',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '3 resumes',
      'Basic AI suggestions',
      '5 job matches per month',
      'PDF export',
      'Community support',
    ],
    cta: 'Current Plan',
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Zap,
    tagline: 'For active job seekers',
    monthlyPrice: 12,
    yearlyPrice: 9,
    features: [
      'Unlimited resumes',
      'Advanced AI rewriting',
      'Unlimited job matches',
      'ATS score & optimization',
      'Cover letter generator',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    id: 'team',
    name: 'Team',
    icon: Building2,
    tagline: 'For career coaches & bootcamps',
    monthlyPrice: 39,
    yearlyPrice: 29,
    features: [
      'Everything in Pro',
      '10 team seats',
      'Shared template library',
      'Client progress dashboard',
      'Dedicated onboarding',
      'Priority support + SLA',
    ],
    cta: 'Contact Sales',
  },
];

const comparisonRows = [
  { label: 'Resumes', free: '3', pro: 'Unlimited', team: 'Unlimited' },
  { label: 'AI suggestions', free: 'Basic', pro: 'Advanced', team: 'Advanced' },
  { label: 'Job matches / month', free: '5', pro: 'Unlimited', team: 'Unlimited' },
  { label: 'ATS optimization', free: '—', pro: '✓', team: '✓' },
  { label: 'Cover letter generator', free: '—', pro: '✓', team: '✓' },
  { label: 'Team seats', free: '—', pro: '—', team: '10' },
  { label: 'Support', free: 'Community', pro: 'Priority', team: 'Priority + SLA' },
];

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const currentPlanId: Plan['id'] = 'free';

  return (
    <Shell>
      <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] dark:text-white">
              Plans & Pricing
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] mt-2 max-w-md mx-auto">
              Pick the plan that fits how seriously you're job hunting.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-1 mt-6 p-1 rounded-full bg-[#F1F5F9] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155]">
              {(['monthly', 'yearly'] as const).map((cycle) => {
                const active = billingCycle === cycle;
                return (
                  <button
                    key={cycle}
                    onClick={() => setBillingCycle(cycle)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                      active
                        ? "bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white shadow-sm"
                        : "text-[#64748B] dark:text-[#94A3B8]"
                    )}
                  >
                    {cycle === 'monthly' ? 'Monthly' : 'Yearly'}
                    {cycle === 'yearly' && (
                      <span
                        className="ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                        style={{ color: BLUE, backgroundColor: BLUE_SUBTLE }}
                      >
                        Save 25%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">
            {plans.map((plan) => {
              const isCurrent = plan.id === currentPlanId;
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "relative rounded-2xl border p-6 flex flex-col bg-white dark:bg-[#1E293B] transition-shadow",
                    plan.highlighted
                      ? "border-2 shadow-lg"
                      : "border-[#E2E8F0] dark:border-[#334155] shadow-sm"
                  )}
                  style={plan.highlighted ? { borderColor: BLUE } : undefined}
                >
                  {plan.highlighted && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: BLUE }}
                    >
                      Most Popular
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-1">
                    <plan.icon
                      className="h-4 w-4"
                      style={{ color: plan.highlighted ? BLUE : '#94A3B8' }}
                    />
                    <h3 className="text-base font-semibold text-[#0F172A] dark:text-white">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-4">
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-3xl font-semibold text-[#0F172A] dark:text-white">
                      ${price}
                    </span>
                    {price > 0 && (
                      <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">/ month</span>
                    )}
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                        <Check
                          className="h-4 w-4 flex-shrink-0 mt-0.5"
                          style={{ color: plan.highlighted ? BLUE : '#94A3B8' }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    disabled={isCurrent}
                    className={cn(
                      "w-full",
                      isCurrent
                        ? "bg-[#F1F5F9] dark:bg-[#334155] text-[#94A3B8] cursor-not-allowed hover:bg-[#F1F5F9] dark:hover:bg-[#334155]"
                        : "text-white"
                    )}
                    style={!isCurrent ? { backgroundColor: BLUE } : undefined}
                  >
                    {isCurrent ? 'Current Plan' : plan.cta}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Comparison table */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white mb-4">
              Compare plans
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#334155]">
                    <th className="text-left font-medium text-[#64748B] dark:text-[#94A3B8] px-4 py-3">Feature</th>
                    <th className="text-center font-medium text-[#64748B] dark:text-[#94A3B8] px-4 py-3">Free</th>
                    <th className="text-center font-medium px-4 py-3" style={{ color: BLUE }}>Pro</th>
                    <th className="text-center font-medium text-[#64748B] dark:text-[#94A3B8] px-4 py-3">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={i !== comparisonRows.length - 1 ? "border-b border-[#E2E8F0] dark:border-[#334155]" : ""}
                    >
                      <td className="px-4 py-3 text-[#0F172A] dark:text-white font-medium">{row.label}</td>
                      <td className="px-4 py-3 text-center text-[#64748B] dark:text-[#94A3B8]">{row.free}</td>
                      <td className="px-4 py-3 text-center text-[#0F172A] dark:text-white font-medium">{row.pro}</td>
                      <td className="px-4 py-3 text-center text-[#64748B] dark:text-[#94A3B8]">{row.team}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}