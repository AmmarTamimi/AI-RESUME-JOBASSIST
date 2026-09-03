'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/auth-provider';
import { 
  FileText, 
  Search, 
  Grid3x3,
  LayoutList,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shell } from '../../components/layout/Shell-temp';
import { templates } from '../../components/templates/templates';
import { useState, useEffect } from 'react';

export default function TemplatesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Categories
  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'modern', label: 'Modern' },
    { id: 'professional', label: 'Professional' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'business', label: 'Business' },
    { id: 'ats-friendly', label: 'ATS Friendly' },
  ];

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || 
                          template.category?.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Preview handlers
  const openPreview = (template: any) => {
    setSelectedTemplate(template);
    setPreviewIndex(templates.indexOf(template));
    setIsPreviewOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedTemplate(null);
    document.body.style.overflow = 'auto';
  };

  const navigatePreview = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
      setSelectedTemplate(templates[previewIndex - 1]);
    } else if (direction === 'next' && previewIndex < templates.length - 1) {
      setPreviewIndex(previewIndex + 1);
      setSelectedTemplate(templates[previewIndex + 1]);
    }
  };

  const handleUseTemplate = (templateId: string) => {
    router.push(`/dashboard/resumeBuilder/${templateId}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPreviewOpen) {
        if (e.key === 'Escape') closePreview();
        if (e.key === 'ArrowLeft') navigatePreview('prev');
        if (e.key === 'ArrowRight') navigatePreview('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen, previewIndex]);

  // Stats
  const stats = [
    { label: 'Total Templates', value: templates.length },
    { label: 'Categories', value: categories.length - 1 },
    { label: 'ATS Friendly', value: templates.filter(t => t.category === 'ATS-Friendly').length },
  ];

  return (
    <Shell>
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-[#0F172A] dark:text-white">
                  Template Library
                </h1>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Choose from professionally designed resume templates
                </p>
              </div>
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition-colors flex items-center gap-1.5 sm:gap-2 shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40 w-full sm:w-auto justify-center">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Generate with AI
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
                <p className="text-base sm:text-xl font-semibold text-[#0F172A] dark:text-white">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search templates by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all text-xs sm:text-sm text-[#0F172A] dark:text-white placeholder:text-[#94A3B8]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
                >
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#2563EB] text-white' : 'text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155]'}`}
                >
                  <Grid3x3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 sm:p-2 transition-colors ${viewMode === 'list' ? 'bg-[#2563EB] text-white' : 'text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155]'}`}
                >
                  <LayoutList className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories - Scrollable on mobile */}
          <div className="flex flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-thin scrollbar-thumb-[#E2E8F0] dark:scrollbar-thumb-[#334155] scrollbar-track-transparent">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A]'
                    : 'bg-white dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] border border-[#E2E8F0] dark:border-[#334155]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8]">
              {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'} available
            </p>
          </div>

          {/* Templates Grid */}
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-white dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-[#94A3B8] mx-auto mb-2 sm:mb-3" />
              <h3 className="text-sm sm:text-base font-medium text-[#0F172A] dark:text-white">No templates found</h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredTemplates.map((template, index) => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  onUse={() => handleUseTemplate(template.id)}
                  onPreview={() => openPreview(template)}
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
            onClick={closePreview}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#0F172A] rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 border-b border-[#E2E8F0] dark:border-[#334155]">
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-[#0F172A] dark:text-white truncate">
                    {selectedTemplate.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] capitalize truncate">
                    {selectedTemplate.category} • {selectedTemplate.layout?.replace('-', ' ') || 'Standard'}
                  </p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <button
                    onClick={() => navigatePreview('prev')}
                    disabled={previewIndex === 0}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-[#64748B]" />
                  </button>
                  <button
                    onClick={() => navigatePreview('next')}
                    disabled={previewIndex === templates.length - 1}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#64748B]" />
                  </button>
                  <button
                    onClick={closePreview}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5 text-[#64748B]" />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-3 sm:p-6 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Template Preview Image */}
                  <div className="bg-[#F1F5F9] dark:bg-[#1E293B] rounded-xl overflow-hidden aspect-[3/4] relative">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${selectedTemplate.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </div>

                  {/* Template Details */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider mb-1 sm:mb-2">
                        About this template
                      </h3>
                      <p className="text-sm sm:text-base text-[#0F172A] dark:text-white">
                        A {selectedTemplate.category} resume template designed for {selectedTemplate.layout?.replace('-', ' ') || 'Standard'} positions.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider mb-1 sm:mb-2">
                        Features
                      </h3>
                      <ul className="space-y-1.5 sm:space-y-2">
                        <li className="flex items-center gap-2 text-xs sm:text-sm text-[#0F172A] dark:text-white">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                          Clean {selectedTemplate.layout} layout
                        </li>
                        <li className="flex items-center gap-2 text-xs sm:text-sm text-[#0F172A] dark:text-white">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                          ATS-friendly formatting
                        </li>
                        <li className="flex items-center gap-2 text-xs sm:text-sm text-[#0F172A] dark:text-white">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                          Easy to customize
                        </li>
                        <li className="flex items-center gap-2 text-xs sm:text-sm text-[#0F172A] dark:text-white">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                          Professional typography
                        </li>
                      </ul>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-[#E2E8F0] dark:border-[#334155]">
                      <button
                        onClick={() => {
                          closePreview();
                          handleUseTemplate(selectedTemplate.id);
                        }}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40"
                      >
                        <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Use Template
                      </button>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8]">
                      <span>Template {previewIndex + 1} of {templates.length}</span>
                      <span>•</span>
                      <span>Category: {selectedTemplate.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}

// Template Card Component
function TemplateCard({ 
  template, 
  onUse,
  onPreview,
  viewMode,
  index
}: { 
  template: any; 
  onUse: () => void;
  onPreview: () => void;
  viewMode: 'grid' | 'list';
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03 }}
        className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col sm:flex-row"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="w-full sm:w-48 h-32 sm:h-auto sm:aspect-[4/5] flex-shrink-0 bg-[#F1F5F9] dark:bg-[#1E293B] relative cursor-pointer"
          style={{
            backgroundImage: `url(${template.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={onPreview}
        >
          <div className="absolute top-2 left-2">
            <span className="text-[10px] font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full capitalize">
              {template.category}
            </span>
          </div>
        </div>
        <div className="flex-1 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-medium text-[#0F172A] dark:text-white truncate">{template.name}</h3>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-0.5">
              {template.layout?.replace('-', ' ') || 'Standard'}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={onPreview}
              className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155] rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-1.5"
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
            <button 
              onClick={onUse}
              className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition-colors shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Use Template
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Template Preview */}
      <div 
        className="aspect-[4/5] relative bg-[#F1F5F9] dark:bg-[#1E293B] cursor-pointer"
        style={{
          backgroundImage: `url(${template.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onClick={onPreview}
      >
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] sm:text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full capitalize">
            {template.category}
          </span>
        </div>

        {/* Hover Overlay with Preview and Use Buttons */}
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); onPreview(); }}
            className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 border border-white/30"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onUse(); }}
            className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors flex items-center gap-2 shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            <FileText className="h-4 w-4" />
            Use Template
          </button>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-medium text-[#0F172A] dark:text-white truncate">
              {template.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-0.5 truncate">
              {template.layout?.replace('-', ' ') || 'Standard'}
            </p>
          </div>
          <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-[#F1F5F9] dark:bg-[#334155] text-[#64748B] dark:text-[#94A3B8] rounded-full capitalize flex-shrink-0">
            {template.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}