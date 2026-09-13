// 'use client';

// import { useState, useMemo } from 'react';
// import { ChevronDown, Search, Mail } from 'lucide-react';
// import { Input } from '@/app/components/ui/input';
// import { cn } from '@/app/lib/utils';
// import { ACCENT_VALUES, useAppearance } from '../../providers/appearance-provider';

// interface FaqItem {
//   question: string;
//   answer: string;
//   category: 'Getting Started' | 'Resumes & Templates' | 'AI Features' | 'Billing' | 'Account & Privacy';
// }

// const faqs: FaqItem[] = [
//   {
//     category: 'Getting Started',
//     question: 'How do I create my first resume?',
//     answer: 'Go to "My Resumes" in the sidebar and click "New Resume." You can start from a blank template, import an existing PDF/DOCX to auto-fill your details, or let the AI Assistant build a first draft from a short interview.',
//   },
//   {
//     category: 'Getting Started',
//     question: 'Do I need any design experience to use ResumeAI?',
//     answer: 'No. Every template handles layout and formatting automatically — you just add your content. Switching templates later keeps your content and re-applies the new design.',
//   },
//   {
//     category: 'Resumes & Templates',
//     question: 'Can I use more than one resume for different job types?',
//     answer: 'Yes, on the Pro and Team plans you can create unlimited resumes. The Free plan includes up to 3, which is enough to keep separate versions for different roles or industries.',
//   },
//   {
//     category: 'Resumes & Templates',
//     question: 'Will my resume pass through Applicant Tracking Systems (ATS)?',
//     answer: 'Our ATS-friendly templates use single-column layouts and standard section headers that parse cleanly. Run any resume through "AI Insights" to get a specific ATS compatibility score and flagged issues before you apply.',
//   },
//   {
//     category: 'AI Features',
//     question: 'How does Job Match work?',
//     answer: 'Paste a job description or link, and Job Match compares it against your resume to score alignment, highlight missing keywords, and suggest specific bullet-point rewrites to close the gap.',
//   },
//   {
//     category: 'AI Features',
//     question: 'Does the AI Assistant write my resume for me?',
//     answer: 'It drafts suggestions based on what you tell it about your experience, but you review and edit everything before it\'s saved. Nothing is added to your resume without your confirmation.',
//   },
//   {
//     category: 'Billing',
//     question: 'Can I cancel my subscription anytime?',
//     answer: 'Yes. Cancel from Settings → Billing at any time — you\'ll keep Pro features until the end of your current billing period, with no additional charge afterward.',
//   },
//   {
//     category: 'Billing',
//     question: 'Is there a refund if I upgrade by mistake?',
//     answer: 'Reach out within 7 days of an upgrade and we\'ll issue a full refund, no questions asked.',
//   },
//   {
//     category: 'Account & Privacy',
//     question: 'Who can see the resumes I create?',
//     answer: 'Only you, unless you explicitly generate a shareable link for a specific resume. Resumes are never used to train AI models or shared with third parties.',
//   },
//   {
//     category: 'Account & Privacy',
//     question: 'How do I delete my account and data?',
//     answer: 'Go to Settings → Danger Zone and confirm the deletion. This immediately and permanently removes your account, resumes, and all associated data.',
//   },
// ];

// const categories = Array.from(new Set(faqs.map((f) => f.category)));

// export default function FaqPage() {
//   const { accent } = useAppearance();
//   const accentValue = ACCENT_VALUES[accent].base;

//   const [query, setQuery] = useState('');
//   const [openIndex, setOpenIndex] = useState<string | null>(null);

//   const filteredByCategory = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     const filtered = q
//       ? faqs.filter(
//           (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
//         )
//       : faqs;

//     return categories
//       .map((cat) => ({ category: cat, items: filtered.filter((f) => f.category === cat) }))
//       .filter((group) => group.items.length > 0);
//   }, [query]);

//   const toggle = (key: string) => {
//     setOpenIndex((prev) => (prev === key ? null : key));
//   };

//   return (
//     <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] dark:text-white">
//             Frequently Asked Questions
//           </h1>
//           <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] mt-2">
//             Everything you need to know about ResumeAI.
//           </p>
//         </div>

//         {/* Search */}
//         <div className="relative mb-8">
//           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
//           <Input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search questions..."
//             className="pl-10 h-11 bg-white dark:bg-[#1E293B] border-[#E2E8F0] dark:border-[#334155] rounded-xl shadow-sm"
//           />
//         </div>

//         {/* Results */}
//         {filteredByCategory.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
//               No results for "{query}". Try a different search, or contact us below.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {filteredByCategory.map((group) => (
//               <div key={group.category}>
//                 <h2 className="text-xs font-semibold text-[#94A3B8] dark:text-[#64748B] mb-3 px-1">
//                   {group.category}
//                 </h2>
//                 <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] overflow-hidden divide-y divide-[#E2E8F0] dark:divide-[#334155]">
//                   {group.items.map((item, i) => {
//                     const key = `${group.category}-${i}`;
//                     const isOpen = openIndex === key;
//                     return (
//                       <div key={key}>
//                         <button
//                           onClick={() => toggle(key)}
//                           className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]/50 transition-colors"
//                         >
//                           <span
//                             className="text-sm font-medium"
//                             style={{ color: isOpen ? accentValue : undefined }}
//                           >
//                             <span className={cn(!isOpen && "text-[#0F172A] dark:text-white")}>
//                               {item.question}
//                             </span>
//                           </span>
//                           <ChevronDown
//                             className={cn(
//                               "h-4 w-4 flex-shrink-0 text-[#94A3B8] transition-transform duration-200",
//                               isOpen && "rotate-180"
//                             )}
//                             style={isOpen ? { color: accentValue } : undefined}
//                           />
//                         </button>
//                         <div
//                           className={cn(
//                             "grid transition-all duration-200 ease-in-out",
//                             isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
//                           )}
//                         >
//                           <div className="overflow-hidden">
//                             <p className="px-4 sm:px-5 pb-4 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
//                               {item.answer}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Contact fallback */}
//         <div className="mt-10 flex items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-[#E2E8F0] dark:border-[#334155] text-sm text-[#64748B] dark:text-[#94A3B8]">
//           <Mail className="h-4 w-4" />
//           Still stuck?{' '}
//           <a
//             href="mailto:support@resumeai.app"
//             className="font-medium hover:underline"
//             style={{ color: accentValue }}
//           >
//             Contact support
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }





























































































































'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, Search, Mail } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { cn } from '@/app/lib/utils';
// import { ACCENT_VALUES, useAppearance } from '../../providers/appearance-provider';
import { Shell } from '../../components/layout/Shell-temp';

interface FaqItem {
  question: string;
  answer: string;
  category: 'Getting Started' | 'Resumes & Templates' | 'AI Features' | 'Billing' | 'Account & Privacy';
}

const faqs: FaqItem[] = [
  {
    category: 'Getting Started',
    question: 'How do I create my first resume?',
    answer: 'Go to "My Resumes" in the sidebar and click "New Resume." You can start from a blank template, import an existing PDF/DOCX to auto-fill your details, or let the AI Assistant build a first draft from a short interview.',
  },
  {
    category: 'Getting Started',
    question: 'Do I need any design experience to use ResumeAI?',
    answer: 'No. Every template handles layout and formatting automatically — you just add your content. Switching templates later keeps your content and re-applies the new design.',
  },
  {
    category: 'Resumes & Templates',
    question: 'Can I use more than one resume for different job types?',
    answer: 'Yes, on the Pro and Team plans you can create unlimited resumes. The Free plan includes up to 3, which is enough to keep separate versions for different roles or industries.',
  },
  {
    category: 'Resumes & Templates',
    question: 'Will my resume pass through Applicant Tracking Systems (ATS)?',
    answer: 'Our ATS-friendly templates use single-column layouts and standard section headers that parse cleanly. Run any resume through "AI Insights" to get a specific ATS compatibility score and flagged issues before you apply.',
  },
  {
    category: 'AI Features',
    question: 'How does Job Match work?',
    answer: 'Paste a job description or link, and Job Match compares it against your resume to score alignment, highlight missing keywords, and suggest specific bullet-point rewrites to close the gap.',
  },
  {
    category: 'AI Features',
    question: 'Does the AI Assistant write my resume for me?',
    answer: 'It drafts suggestions based on what you tell it about your experience, but you review and edit everything before it\'s saved. Nothing is added to your resume without your confirmation.',
  },
  {
    category: 'Billing',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes. Cancel from Settings → Billing at any time — you\'ll keep Pro features until the end of your current billing period, with no additional charge afterward.',
  },
  {
    category: 'Billing',
    question: 'Is there a refund if I upgrade by mistake?',
    answer: 'Reach out within 7 days of an upgrade and we\'ll issue a full refund, no questions asked.',
  },
  {
    category: 'Account & Privacy',
    question: 'Who can see the resumes I create?',
    answer: 'Only you, unless you explicitly generate a shareable link for a specific resume. Resumes are never used to train AI models or shared with third parties.',
  },
  {
    category: 'Account & Privacy',
    question: 'How do I delete my account and data?',
    answer: 'Go to Settings → Danger Zone and confirm the deletion. This immediately and permanently removes your account, resumes, and all associated data.',
  },
];

const categories = Array.from(new Set(faqs.map((f) => f.category)));

export default function FaqPage() {
//   const { accent } = useAppearance();
//   const accentValue = ACCENT_VALUES[accent].base;

  const [query, setQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const filteredByCategory = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? faqs.filter(
          (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
        )
      : faqs;

    return categories
      .map((cat) => ({ category: cat, items: filtered.filter((f) => f.category === cat) }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  const toggle = (key: string) => {
    setOpenIndex((prev) => (prev === key ? null : key));
  };

  return (
    <Shell>
      <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] dark:text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] mt-2">
              Everything you need to know about ResumeAI.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="pl-10 h-11 bg-white dark:bg-[#1E293B] border-[#E2E8F0] dark:border-[#334155] rounded-xl shadow-sm"
            />
          </div>

          {/* Results */}
          {filteredByCategory.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                No results for "{query}". Try a different search, or contact us below.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredByCategory.map((group) => (
                <div key={group.category}>
                  <h2 className="text-xs font-semibold text-[#94A3B8] dark:text-[#64748B] mb-3 px-1">
                    {group.category}
                  </h2>
                  <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] overflow-hidden divide-y divide-[#E2E8F0] dark:divide-[#334155]">
                    {group.items.map((item, i) => {
                      const key = `${group.category}-${i}`;
                      const isOpen = openIndex === key;
                      return (
                        <div key={key}>
                          <button
                            onClick={() => toggle(key)}
                            className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]/50 transition-colors"
                          >
                            <span
                              className="text-sm font-medium"
                            >
                              <span className={cn(!isOpen && "text-[#0F172A] dark:text-white")}>
                                {item.question}
                              </span>
                            </span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 text-[#94A3B8] transition-transform duration-200",
                                isOpen && "rotate-180"
                              )}
                            />
                          </button>
                          <div
                            className={cn(
                              "grid transition-all duration-200 ease-in-out",
                              isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            )}
                          >
                            <div className="overflow-hidden">
                              <p className="px-4 sm:px-5 pb-4 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact fallback */}
          <div className="mt-10 flex items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-[#E2E8F0] dark:border-[#334155] text-sm text-[#64748B] dark:text-[#94A3B8]">
            <Mail className="h-4 w-4" />
            Still stuck?{' '}
            <a
              href="mailto:support@resumeai.app"
              className="font-medium hover:underline"
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    </Shell>
  );
}























































// 'use client';

// import { useState, useMemo, useRef } from 'react';
// import { ChevronDown, Search, Mail, Sparkles, Loader2, ArrowUp } from 'lucide-react';
// import { Input } from '@/app/components/ui/input';
// import { Button } from '@/app/components/ui/button';
// import { cn } from '@/app/lib/utils';
// import { ACCENT_VALUES, useAppearance } from '../../providers/appearance-provider';

// interface FaqItem {
//   question: string;
//   answer: string;
//   category: 'Getting Started' | 'Resumes & Templates' | 'AI Features' | 'Billing' | 'Account & Privacy';
// }

// const faqs: FaqItem[] = [
//   {
//     category: 'Getting Started',
//     question: 'How do I create my first resume?',
//     answer: 'Go to "My Resumes" in the sidebar and click "New Resume." You can start from a blank template, import an existing PDF/DOCX to auto-fill your details, or let the AI Assistant build a first draft from a short interview.',
//   },
//   {
//     category: 'Getting Started',
//     question: 'Do I need any design experience to use ResumeAI?',
//     answer: 'No. Every template handles layout and formatting automatically — you just add your content. Switching templates later keeps your content and re-applies the new design.',
//   },
//   {
//     category: 'Resumes & Templates',
//     question: 'Can I use more than one resume for different job types?',
//     answer: 'Yes, on the Pro and Team plans you can create unlimited resumes. The Free plan includes up to 3, which is enough to keep separate versions for different roles or industries.',
//   },
//   {
//     category: 'Resumes & Templates',
//     question: 'Will my resume pass through Applicant Tracking Systems (ATS)?',
//     answer: 'Our ATS-friendly templates use single-column layouts and standard section headers that parse cleanly. Run any resume through "AI Insights" to get a specific ATS compatibility score and flagged issues before you apply.',
//   },
//   {
//     category: 'AI Features',
//     question: 'How does Job Match work?',
//     answer: 'Paste a job description or link, and Job Match compares it against your resume to score alignment, highlight missing keywords, and suggest specific bullet-point rewrites to close the gap.',
//   },
//   {
//     category: 'AI Features',
//     question: 'Does the AI Assistant write my resume for me?',
//     answer: 'It drafts suggestions based on what you tell it about your experience, but you review and edit everything before it\'s saved. Nothing is added to your resume without your confirmation.',
//   },
//   {
//     category: 'Billing',
//     question: 'Can I cancel my subscription anytime?',
//     answer: 'Yes. Cancel from Settings → Billing at any time — you\'ll keep Pro features until the end of your current billing period, with no additional charge afterward.',
//   },
//   {
//     category: 'Billing',
//     question: 'Is there a refund if I upgrade by mistake?',
//     answer: 'Reach out within 7 days of an upgrade and we\'ll issue a full refund, no questions asked.',
//   },
//   {
//     category: 'Account & Privacy',
//     question: 'Who can see the resumes I create?',
//     answer: 'Only you, unless you explicitly generate a shareable link for a specific resume. Resumes are never used to train AI models or shared with third parties.',
//   },
//   {
//     category: 'Account & Privacy',
//     question: 'How do I delete my account and data?',
//     answer: 'Go to Settings → Danger Zone and confirm the deletion. This immediately and permanently removes your account, resumes, and all associated data.',
//   },
// ];

// const categories = Array.from(new Set(faqs.map((f) => f.category)));

// export default function FaqPage() {
//   const { accent } = useAppearance();
//   const accentValue = ACCENT_VALUES[accent].base;
//   const accentSubtle = ACCENT_VALUES[accent].subtle;

//   const [query, setQuery] = useState('');
//   const [openIndex, setOpenIndex] = useState<string | null>(null);

//   // AI assistant state
//   const [aiQuestion, setAiQuestion] = useState('');
//   const [aiAnswer, setAiAnswer] = useState('');
//   const [aiError, setAiError] = useState('');
//   const [aiLoading, setAiLoading] = useState(false);
//   const aiInputRef = useRef<HTMLInputElement>(null);

//   const filteredByCategory = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     const filtered = q
//       ? faqs.filter(
//           (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
//         )
//       : faqs;

//     return categories
//       .map((cat) => ({ category: cat, items: filtered.filter((f) => f.category === cat) }))
//       .filter((group) => group.items.length > 0);
//   }, [query]);

//   const toggle = (key: string) => {
//     setOpenIndex((prev) => (prev === key ? null : key));
//   };

//   const scrollToAskAi = () => {
//     setAiQuestion(query);
//     aiInputRef.current?.focus();
//     aiInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//   };

//   const handleAskAi = async () => {
//     if (!aiQuestion.trim() || aiLoading) return;
//     setAiLoading(true);
//     setAiError('');
//     setAiAnswer('');

//     try {
//       const res = await fetch('/api/faq-assistant', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ question: aiQuestion.trim() }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setAiError(data.error || 'Something went wrong.');
//       } else {
//         setAiAnswer(data.answer);
//       }
//     } catch {
//       setAiError('Could not reach the assistant. Check your connection and try again.');
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] dark:text-white">
//             Frequently Asked Questions
//           </h1>
//           <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] mt-2">
//             Everything you need to know about ResumeAI.
//           </p>
//         </div>

//         {/* Search */}
//         <div className="relative mb-8">
//           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
//           <Input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search questions..."
//             className="pl-10 h-11 bg-white dark:bg-[#1E293B] border-[#E2E8F0] dark:border-[#334155] rounded-xl shadow-sm"
//           />
//         </div>

//         {/* Results */}
//         {filteredByCategory.length === 0 ? (
//           <div className="text-center py-10">
//             <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-4">
//               No results for "{query}".
//             </p>
//             <Button onClick={scrollToAskAi} className="text-white" style={{ backgroundColor: accentValue }}>
//               <Sparkles className="h-4 w-4 mr-2" />
//               Ask AI instead
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {filteredByCategory.map((group) => (
//               <div key={group.category}>
//                 <h2 className="text-xs font-semibold text-[#94A3B8] dark:text-[#64748B] mb-3 px-1">
//                   {group.category}
//                 </h2>
//                 <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] overflow-hidden divide-y divide-[#E2E8F0] dark:divide-[#334155]">
//                   {group.items.map((item, i) => {
//                     const key = `${group.category}-${i}`;
//                     const isOpen = openIndex === key;
//                     return (
//                       <div key={key}>
//                         <button
//                           onClick={() => toggle(key)}
//                           className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]/50 transition-colors"
//                         >
//                           <span
//                             className="text-sm font-medium"
//                             style={{ color: isOpen ? accentValue : undefined }}
//                           >
//                             <span className={cn(!isOpen && "text-[#0F172A] dark:text-white")}>
//                               {item.question}
//                             </span>
//                           </span>
//                           <ChevronDown
//                             className={cn(
//                               "h-4 w-4 flex-shrink-0 text-[#94A3B8] transition-transform duration-200",
//                               isOpen && "rotate-180"
//                             )}
//                             style={isOpen ? { color: accentValue } : undefined}
//                           />
//                         </button>
//                         <div
//                           className={cn(
//                             "grid transition-all duration-200 ease-in-out",
//                             isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
//                           )}
//                         >
//                           <div className="overflow-hidden">
//                             <p className="px-4 sm:px-5 pb-4 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
//                               {item.answer}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Ask AI section — always available, not just on empty search */}
//         <div className="mt-10 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 sm:p-6">
//           <div className="flex items-center gap-2 mb-1">
//             <Sparkles className="h-4 w-4" style={{ color: accentValue }} />
//             <h2 className="text-sm font-semibold text-[#0F172A] dark:text-white">
//               Didn't find your answer?
//             </h2>
//           </div>
//           <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-4">
//             Ask our AI assistant anything about resumes, job searching, or using ResumeAI.
//           </p>

//           <div className="flex items-center gap-2">
//             <Input
//               ref={aiInputRef}
//               value={aiQuestion}
//               onChange={(e) => setAiQuestion(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
//               placeholder="e.g. How long should my resume be for a career change?"
//               maxLength={500}
//               className="flex-1 h-10 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
//             />
//             <Button
//               onClick={handleAskAi}
//               disabled={aiLoading || !aiQuestion.trim()}
//               className="text-white flex-shrink-0"
//               style={{ backgroundColor: accentValue }}
//             >
//               {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
//             </Button>
//           </div>

//           {aiError && (
//             <p className="text-xs text-red-500 mt-3">{aiError}</p>
//           )}

//           {aiAnswer && (
//             <div
//               className="mt-4 p-4 rounded-xl text-sm text-[#334155] dark:text-[#CBD5E1] leading-relaxed"
//               style={{ backgroundColor: accentSubtle }}
//             >
//               {aiAnswer}
//             </div>
//           )}
//         </div>

//         {/* Contact fallback */}
//         <div className="mt-6 flex items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-[#E2E8F0] dark:border-[#334155] text-sm text-[#64748B] dark:text-[#94A3B8]">
//           <Mail className="h-4 w-4" />
//           Still stuck?{' '}
//           <a
//             href="mailto:support@resumeai.app"
//             className="font-medium hover:underline"
//             style={{ color: accentValue }}
//           >
//             Contact support
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }