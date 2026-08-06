'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/auth-provider';
import { FileText, Search, Sparkles, Star, Shield, Layers, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from '../../components/layout/Sidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { templates } from '../../components/templates/templates';

export default function TemplatesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleUseTemplate = (templateId: string) => {
    router.push(`/dashboard/resumeBuilder/${templateId}`);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64">
        <DashboardHeader user={user} />
        <main className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white">
                Welcome to the Template Library!
              </h1>
              <p className="text-[#64748B] dark:text-[#94A3B8] mt-1">
                Browse professionally designed resume templates. Customize them easily, or let AI help you create one that fits your goals.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button className="px-4 py-2 text-sm font-medium bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-lg">
                Role
              </button>
              <button className="px-4 py-2 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] bg-[#F1F5F9] dark:bg-[#1E293B] rounded-lg hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors">
                Style
              </button>
              <div className="h-6 w-px bg-[#E2E8F0] dark:bg-[#334155]" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">Saved</span>
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">0</span>
              </div>
              <div className="h-6 w-px bg-[#E2E8F0] dark:bg-[#334155]" />
              <button className="px-3 py-1.5 text-sm text-[#64748B] dark:text-[#94A3B8] bg-[#F1F5F9] dark:bg-[#1E293B] rounded-lg hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors">
                Creation Type
              </button>
              <button className="px-3 py-1.5 text-sm text-[#64748B] dark:text-[#94A3B8] bg-[#F1F5F9] dark:bg-[#1E293B] rounded-lg hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors">
                Style
              </button>
              <button className="px-3 py-1.5 text-sm text-[#64748B] dark:text-[#94A3B8] bg-[#F1F5F9] dark:bg-[#1E293B] rounded-lg hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors">
                Industry
              </button>
            </div>

            {/* Template Sections */}
            <div className="space-y-10">
              {/* Freshly Published */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white">Freshly Published</h2>
                    <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Our newest templates, hot off the press.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.slice(0, 3).map((template) => (
                    <TemplateCard 
                      key={template.id} 
                      template={template} 
                      onUse={() => handleUseTemplate(template.id)}
                    />
                  ))}
                </div>
              </section>

              {/* AI-Generated Templates */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white">AI-Generated Templates</h2>
                    <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Templates created by AI based on job roles, experience level, and industry needs.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.slice(3, 5).map((template) => (
                    <TemplateCard 
                      key={template.id} 
                      template={template} 
                      onUse={() => handleUseTemplate(template.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Most Popular Templates */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white">Most Popular Templates</h2>
                    <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Frequently used templates with proven results.</p>
                  </div>
                  <button className="text-sm text-[#8B5CF6] hover:text-[#7C3AED] font-medium flex items-center gap-1">
                    View popular templates <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.slice(0, 2).map((template) => (
                    <TemplateCard 
                      key={template.id} 
                      template={template} 
                      onUse={() => handleUseTemplate(template.id)}
                    />
                  ))}
                </div>
              </section>

              {/* ATS Optimized */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white">Designed to Pass ATS</h2>
                    <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Clean, structured templates optimized for applicant tracking systems.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.slice(0, 2).map((template) => (
                    <TemplateCard 
                      key={template.id} 
                      template={template} 
                      onUse={() => handleUseTemplate(template.id)}
                    />
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// Template Card Component
function TemplateCard({ 
  template, 
  onUse 
}: { 
  template: any; 
  onUse: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] dark:from-[#1E293B] dark:to-[#334155] p-4 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-[#64748B] dark:text-[#94A3B8] mx-auto mb-2" />
          <div className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">{template.category}</div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[#0F172A] dark:text-white text-sm">{template.name}</h3>
        <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
          {template.layout.replace('-', ' ')}
        </p>
        <button 
          onClick={onUse}
          className="mt-3 w-full px-3 py-1.5 text-sm font-medium text-[#8B5CF6] bg-[#EDE9FE] dark:bg-[#4C1D95] dark:text-[#C4B5FD] rounded-lg hover:bg-[#DDD6FE] dark:hover:bg-[#5B21B6] transition-colors"
        >
          Use Template
        </button>
      </div>
    </motion.div>
  );
}