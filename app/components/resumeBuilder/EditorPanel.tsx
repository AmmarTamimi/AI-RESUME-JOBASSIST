"use client";

import React, { useState, useRef, useEffect } from "react";
import type {
  PersonalInfo,
  ResumeTheme,
  Section,
  SectionType,
  ExperienceItem,
  EducationItem,
  RatedSkillItem,
  ReferenceItem,
  CustomItem,
} from "@/app/types/Content";
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  GripVertical,
  Bold,
  Italic,
  Underline,
  ChevronDown,
  ChevronRight,
  X,
  Phone,
  Mail,
  MapPin,
  Globe,
  Link as LinkIcon,
  Menu,
  Camera,
  Palette,
  Type,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { templates } from "../templates/templates";
import { AnimatePresence, motion } from "framer-motion";

// Template Card Component - Add this after the imports
function TemplateCard({
  template,
  onUse,
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
      <div
        className="aspect-[3/4] relative bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] dark:from-[#1E293B] dark:to-[#334155] p-4 flex items-center justify-center"
        style={{
          backgroundImage: `url(${template.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

        <div className="relative z-10 text-center">
          <FileText className="h-12 w-12 text-white/80 mx-auto mb-2" />
          <div className="text-xs font-medium text-white/90 capitalize">
            {template.category}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[#0F172A] dark:text-white text-sm">
          {template.name}
        </h3>
        <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
          {template.layout.replace("-", " ")}
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
interface EditorPanelProps {
  personalInfo: PersonalInfo;
  sections: Section[];
  theme: ResumeTheme;
  onUpdatePersonalInfo: <K extends keyof PersonalInfo>(
    field: K,
    value: PersonalInfo[K],
  ) => void;
  onUpdateTheme: <K extends keyof ResumeTheme>(
    field: K,
    value: ResumeTheme[K],
  ) => void;
  onUpdateSectionTitle: (sectionId: string, title: string) => void;
  onUpdateItem: (sectionId: string, index: number, value: unknown) => void;
  onAddItem: (sectionId: string) => void;
  onRemoveItem: (sectionId: string, index: number) => void;
  onAddSection: (type: SectionType) => void;
  onRemoveSection: (sectionId: string) => void;
  onReorderSections: (sectionOrder: string[]) => void;
  onUpdateTemplate: (templateId: string) => void;
}

const ADDABLE_TYPES: {
  type: SectionType;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    type: "experience",
    label: "Experience",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    type: "education",
    label: "Education",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  { type: "skills", label: "Skills", icon: <Sparkles className="h-4 w-4" /> },
  { type: "custom", label: "Custom", icon: <Plus className="h-4 w-4" /> },
];

const GOOGLE_FONTS = [
  // Sans-serif
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Raleway",
  "Nunito",
  "Work Sans",
  "Source Sans Pro",
  "Nunito Sans",
  "Josefin Sans",
  "Quicksand",
  "Manrope",
  "Plus Jakarta Sans",
  "DM Sans",
  "Lexend",
  "Public Sans",
  "Figtree",
  "Epilogue",
  "Karla",
  // Serif
  "Playfair Display",
  "Merriweather",
  "Georgia",
  "Times New Roman",
  "Garamond",
  "Bodoni Moda",
  "Cormorant Garamond",
  "EB Garamond",
  "Libre Baskerville",
  "Lora",
  // Display
  "Poppins",
  "Oswald",
  "Bebas Neue",
  "Anton",
  "Pacifico",
  "Dancing Script",
  "Great Vibes",
  "Satisfy",
  // Monospace
  "Fira Code",
  "JetBrains Mono",
  "Source Code Pro",
  "Cascadia Code",
  "Roboto Mono",
];

// Color presets
const COLOR_PRESETS = [
  "#8B5CF6",
  "#2563EB",
  "#F59E0B",
  "#EF4444",
  "#10B981",
  "#EC4899",
  "#F97316",
  "#06B6D4",
  "#6366F1",
  "#14B8A6",
  "#F4A51C",
  "#2B2B2B",
];

// Add this helper function to load Google Fonts
const loadGoogleFont = (fontName: string) => {
  if (
    !fontName ||
    fontName === "system-ui" ||
    fontName === "sans-serif" ||
    fontName === "serif" ||
    fontName === "monospace"
  ) {
    return;
  }

  const fontId = fontName.replace(/ /g, "+");
  const linkId = `google-font-${fontId}`;

  if (document.getElementById(linkId)) {
    return;
  }

  const link = document.createElement("link");
  link.id = linkId;
  link.href = `https://fonts.googleapis.com/css2?family=${fontId}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

const CATEGORIES = ["All", "Modern", "Professional", "Minimal", "Creative"];
export default function EditorPanel({
  personalInfo,
  sections,
  theme,
  onUpdatePersonalInfo,
  onUpdateTheme,
  onUpdateSectionTitle,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  onAddSection,
  onRemoveSection,
  onUpdateTemplate,
}: EditorPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.map((s) => s.id)),
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeExpanded, setIsThemeExpanded] = useState(true);
  const [isPersonalInfoExpanded, setIsPersonalInfoExpanded] = useState(true);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Add this inside the EditorPanel component, after the useState declarations
  useEffect(() => {
    if (theme.headingFont) loadGoogleFont(theme.headingFont);
    if (theme.bodyFont) loadGoogleFont(theme.bodyFont);
  }, []);

  // Update expanded sections when sections change
  useEffect(() => {
    const sectionIds = new Set(sections.map((s) => s.id));
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      for (const id of prev) {
        if (!sectionIds.has(id)) {
          newSet.delete(id);
        }
      }
      for (const section of sections) {
        if (!prev.has(section.id)) {
          newSet.add(section.id);
        }
      }
      return newSet;
    });
  }, [sections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleAddSection = (type: SectionType) => {
    onAddSection(type);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-[#2563EB] text-white rounded-full shadow-lg hover:bg-[#1D4ED8] transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        className={`h-full bg-white dark:bg-[#0F172A] overflow-y-auto transition-all duration-300 ${
          isMobileMenuOpen ? "fixed inset-0 z-40" : "relative"
        } lg:relative lg:inset-auto`}
      >
        {/* Header */}
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-[#334155] px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-[#0F172A] dark:text-white">
                My Resume
              </h1>
              <div className="flex gap-1 items-center text-xs sm:text-sm text-slate-500 flex-wrap">
                <Link href={"/dashboard"}>Dashboard</Link>
                <p>/</p>
                <Link href={"/dashboard/resumes"}>Resumes</Link>
                <p>/</p>
                <p>Resume</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-[#64748B] dark:text-[#94A3B8] bg-[#F1F5F9] dark:bg-[#1E293B] rounded-lg hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors">
                Create
              </button>
              <button
                onClick={() => setIsTemplateModalOpen(true)}
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition-colors"
              >
                Templates
              </button>
            </div>
          </div>
        </div>

        {/* Templates Modal */}
        <AnimatePresence>
          {isTemplateModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsTemplateModalOpen(false)}
                className="fixed inset-0 bg-black/50 z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0F172A] rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden"
                style={{ maxWidth: "100%" }}
              >
                <div className="p-4 sm:p-6 border-b border-[#E2E8F0] dark:border-[#334155] flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white">
                      Choose a Template
                    </h2>
                    <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                      Select a template to customize your resume
                    </p>
                  </div>
                  <button
                    onClick={() => setIsTemplateModalOpen(false)}
                    className="p-2 hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-[#64748B] dark:text-[#94A3B8]" />
                  </button>
                </div>

                {/* Categories */}
                <div className="px-4 sm:px-6 py-3 border-b border-[#E2E8F0] dark:border-[#334155] overflow-x-auto">
                  <div className="flex gap-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                          selectedCategory === category
                            ? "bg-[#2563EB] text-white"
                            : "bg-[#F1F5F9] dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0] dark:hover:bg-[#334155]"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Templates Grid - Horizontal Scroll */}
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[55vh]">
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#CBD5E1] dark:scrollbar-thumb-[#334155] scrollbar-track-transparent">
                    {templates
                      .filter(
                        (template) =>
                          selectedCategory === "All" ||
                          template.category.toLowerCase() ===
                            selectedCategory.toLowerCase(),
                      )
                      .map((template) => (
                        <div
                          key={template.id}
                          className="min-w-[200px] max-w-[200px] flex-shrink-0"
                        >
                          <TemplateCard
                            template={template}
                            onUse={() => {
                              // Handle template selection
                              console.log("Selected template:", template);
                              setIsTemplateModalOpen(false);
                              onUpdateTemplate(template.id);
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Theme Editor - New Section */}
          {/* Theme Customization Section */}
          {/* Theme Customization - Expandable */}
          <SectionCard
            title="Theme Customization"
            icon={<Palette className="h-5 w-5" />}
            isExpanded={isThemeExpanded}
            onToggle={() => setIsThemeExpanded(!isThemeExpanded)}
          >
            <div className="space-y-4">
              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-[#0F172A] dark:text-white mb-2">
                  Colors
                </label>
                <div className="space-y-3">
                  {/* Primary Color */}
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme.primaryColor || "#2B2B2B"}
                        onChange={(e) =>
                          onUpdateTheme("primaryColor", e.target.value)
                        }
                        className="w-10 h-10 rounded-lg cursor-pointer border border-[#E2E8F0] dark:border-[#334155] p-1"
                      />
                      <input
                        type="text"
                        value={theme.primaryColor || "#2B2B2B"}
                        onChange={(e) =>
                          onUpdateTheme("primaryColor", e.target.value)
                        }
                        className="flex-1 px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                        placeholder="#2B2B2B"
                      />
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                      Accent Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme.accentColor || "#F4A51C"}
                        onChange={(e) =>
                          onUpdateTheme("accentColor", e.target.value)
                        }
                        className="w-10 h-10 rounded-lg cursor-pointer border border-[#E2E8F0] dark:border-[#334155] p-1"
                      />
                      <input
                        type="text"
                        value={theme.accentColor || "#F4A51C"}
                        onChange={(e) =>
                          onUpdateTheme("accentColor", e.target.value)
                        }
                        className="flex-1 px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                        placeholder="#F4A51C"
                      />
                    </div>
                  </div>

                  {/* Color Presets */}
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                      Presets
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_PRESETS.map((color) => (
                        <button
                          key={color}
                          onClick={() => onUpdateTheme("accentColor", color)}
                          className="w-8 h-8 rounded-full border-2 border-[#E2E8F0] dark:border-[#334155] transition-transform hover:scale-110"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-[#E2E8F0] dark:border-[#334155]" />

              {/* Fonts */}
              <div>
                <label className="block text-sm font-medium text-[#0F172A] dark:text-white mb-2">
                  <Type className="h-4 w-4 inline mr-2" />
                  Fonts
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                      Heading Font
                    </label>
                    <select
                      value={theme.headingFont || "Poppins"}
                      onChange={(e) => {
                        const font = e.target.value;
                        onUpdateTheme("headingFont", font as any);
                        loadGoogleFont(font);
                      }}
                      className="w-full px-2 py-1.5 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                      size={1}
                    >
                      {GOOGLE_FONTS.map((font) => (
                        <option
                          key={font}
                          value={font}
                          style={{ fontFamily: font }}
                        >
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                      Body Font
                    </label>
                    <select
                      value={theme.bodyFont || "Inter"}
                      onChange={(e) => {
                        const font = e.target.value;
                        onUpdateTheme("bodyFont", font as any);
                        loadGoogleFont(font);
                      }}
                      className="w-full px-2 py-1.5 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                      size={1}
                    >
                      {GOOGLE_FONTS.map((font) => (
                        <option
                          key={font}
                          value={font}
                          style={{ fontFamily: font }}
                        >
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Font Preview */}
              <div className="mt-2 p-3 bg-[#F8FAFC] dark:bg-[#1E293B] rounded-lg border border-[#E2E8F0] dark:border-[#334155]">
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-1">
                  Preview
                </p>
                <p
                  className="text-lg font-bold"
                  style={{
                    fontFamily: theme.headingFont || "Poppins",
                    color: theme.primaryColor || "#2B2B2B",
                  }}
                >
                  Heading Font
                </p>
                <p
                  className="text-sm"
                  style={{
                    fontFamily: theme.bodyFont || "Inter",
                    color: theme.textColor || "#666",
                  }}
                >
                  The quick brown fox jumps over the lazy dog. Body font
                  preview.
                </p>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded inline-block mt-1"
                  style={{
                    backgroundColor: theme.accentColor || "#F4A51C",
                    color: "#fff",
                  }}
                >
                  Accent Color
                </span>
              </div>
            </div>
          </SectionCard>

          {/* Personal Information - Expandable */}
          <SectionCard
            title="Personal Information"
            icon={<User className="h-5 w-5" />}
            isExpanded={isPersonalInfoExpanded}
            onToggle={() => setIsPersonalInfoExpanded(!isPersonalInfoExpanded)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Picture Upload - Circular */}
              <div className="col-span-1 sm:col-span-2 flex justify-center mb-2">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-[#F1F5F9] dark:bg-[#1E293B] border-2 border-dashed border-[#E2E8F0] dark:border-[#334155] hover:border-[#8B5CF6] dark:hover:border-[#8B5CF6] transition-colors cursor-pointer group">
                    {personalInfo.photoUrl ? (
                      <img
                        src={personalInfo.photoUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-10 w-10 text-[#94A3B8] dark:text-[#64748B]" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            onUpdatePersonalInfo(
                              "photoUrl",
                              reader.result as string,
                            );
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-[#8B5CF6] rounded-full p-1.5 border-2 border-white dark:border-[#0F172A] shadow-sm">
                    <Camera className="h-3.5 w-3.5 text-white" />
                  </div>
                  {personalInfo.photoUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdatePersonalInfo("photoUrl", undefined);
                      }}
                      className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 rounded-full p-1 border-2 border-white dark:border-[#0F172A] shadow-sm transition-colors"
                      title="Remove picture"
                    >
                      <X className="h-3.5 w-3.5 text-white" />
                    </button>
                  )}
                </div>
              </div>

              <InputField
                label="Full Name"
                value={personalInfo.fullName}
                onChange={(v) => onUpdatePersonalInfo("fullName", v)}
                placeholder="John Doe"
              />
              <InputField
                label="Job Title"
                value={personalInfo.title}
                onChange={(v) => onUpdatePersonalInfo("title", v)}
                placeholder="Software Engineer"
              />

              <div className="col-span-1 sm:col-span-2">
                <TextAreaField
                  label="Professional Summary"
                  value={personalInfo.summary || ""}
                  onChange={(v) => onUpdatePersonalInfo("summary", v)}
                  placeholder="Write a brief summary of your professional background..."
                  rows={8}
                />
              </div>
            </div>
          </SectionCard>

          {/* Dynamic Sections */}
          {sections.map((section) => {
            const isExpanded = expandedSections.has(section.id);
            const sectionIcon = getSectionIcon(section.type);
            const itemCount = section.items.length;
            const isContactSection =
              section.id === "contact" || section.title === "Contact";

            return (
              <SectionCard
                key={section.id}
                title={
                  <div className="flex items-center gap-2">
                    <input
                      value={section.title}
                      onChange={(e) =>
                        onUpdateSectionTitle(section.id, e.target.value)
                      }
                      className="bg-transparent border-none focus:outline-none text-sm font-medium text-[#0F172A] dark:text-white min-w-0"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-xs text-[#94A3B8]">
                      ({itemCount})
                    </span>
                  </div>
                }
                icon={sectionIcon}
                isExpanded={isExpanded}
                onToggle={() => toggleSection(section.id)}
                onRemove={() => onRemoveSection(section.id)}
              >
                <div className="space-y-3">
                  {section.items.map((item, index) => (
                    <ItemCard
                      key={index}
                      index={index}
                      section={section}
                      item={item}
                      personalInfo={personalInfo}
                      onUpdateItem={(value) =>
                        onUpdateItem(section.id, index, value)
                      }
                      onRemoveItem={() => onRemoveItem(section.id, index)}
                    />
                  ))}

                  {/* Hide Add Item button for contact section */}
                  {!isContactSection && (
                    <button
                      onClick={() => onAddItem(section.id)}
                      className="flex items-center gap-1 text-sm text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Add{" "}
                      {section.type === "experience"
                        ? "Experience"
                        : section.type === "education"
                          ? "Education"
                          : section.type === "ratedSkills"
                            ? "Skill"
                            : "Item"}
                    </button>
                  )}
                </div>
              </SectionCard>
            );
          })}

          {/* Add Section */}
          <div className="border-2 border-dashed border-[#E2E8F0] dark:border-[#334155] rounded-xl p-4">
            <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-3">
              Add a section
            </p>
            <div className="flex flex-wrap gap-2">
              {ADDABLE_TYPES.map((type) => (
                <button
                  key={type.type}
                  onClick={() => handleAddSection(type.type)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#F1F5F9] dark:bg-[#1E293B] text-[#0F172A] dark:text-white rounded-lg hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors"
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Section Card Component
function SectionCard({
  title,
  icon,
  children,
  isExpanded,
  onToggle,
  onRemove,
}: {
  title: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove?: () => void;
}) {
  return (
    <div className="border border-[#E2E8F0] dark:border-[#334155] rounded-xl overflow-hidden">
      <div className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors cursor-pointer">
        <div
          className="flex items-center gap-2 flex-1 min-w-0"
          onClick={onToggle}
        >
          <span className="text-[#64748B] dark:text-[#94A3B8] flex-shrink-0">
            {icon}
          </span>
          <span className="text-sm font-medium text-[#0F172A] dark:text-white truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-1 text-[#94A3B8] hover:text-[#EF4444] transition-colors"
              type="button"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onToggle}
            className="p-1 text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors"
            type="button"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      {isExpanded && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// Item Card Component
function ItemCard({
  section,
  item,
  index,
  personalInfo,
  onUpdateItem,
  onRemoveItem,
}: {
  section: Section;
  item: any;
  index: number;
  personalInfo: PersonalInfo;
  onUpdateItem: (value: any) => void;
  onRemoveItem: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand skills when they're added
  useEffect(() => {
    if (section.type === "skills") {
      setIsExpanded(true);
    }
  }, [section.type, item]);

  // Function to get display label
  const getDisplayLabel = () => {
    if (section.type === "custom" && section.id === "contact") {
      if (
        item &&
        typeof item === "object" &&
        "label" in item &&
        "description" in item
      ) {
        return item.description || item.label || "Untitled";
      }
      return "Untitled";
    }

    if (section.type === "experience") {
      const exp = item as ExperienceItem;
      if (exp.role && exp.company) {
        return `${exp.role} at ${exp.company}`;
      }
      return exp.role || exp.company || "Untitled";
    }

    if (section.type === "education") {
      const edu = item as EducationItem;
      if (edu.degree && edu.school) {
        return `${edu.degree} - ${edu.school}`;
      }
      return edu.school || edu.degree || "Untitled";
    }

    if (section.type === "skills") {
      if (typeof item === "string") {
        return item || "Untitled";
      }
      if (item && typeof item === "object" && "name" in item) {
        return (item as RatedSkillItem).name || "Untitled";
      }
      return "Untitled";
    }

    if (section.type === "references") {
      const ref = item as ReferenceItem;
      if (ref.name) {
        return ref.name;
      }
      return "Untitled";
    }

    if (item && typeof item === "object") {
      if ("name" in item) return item.name || "Untitled";
      if ("label" in item) return item.label || "Untitled";
      if ("title" in item) return item.title || "Untitled";
    }

    if (typeof item === "string") {
      return item || "Untitled";
    }

    return "Untitled";
  };

  const applyFormatting = (command: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (!selectedText) {
      switch (command) {
        case "bold":
          setIsBold(!isBold);
          break;
        case "italic":
          setIsItalic(!isItalic);
          break;
        case "underline":
          setIsUnderline(!isUnderline);
          break;
      }
      return;
    }

    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);

    let formattedText = selectedText;
    switch (command) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "underline":
        formattedText = `__${selectedText}__`;
        break;
    }

    const newText = before + formattedText + after;

    if (section.type === "experience") {
      const exp = item as ExperienceItem;
      const bullets = newText.split("\n").filter((b) => b.trim());
      onUpdateItem({ ...exp, bullets });
    }

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formattedText.length);
    }, 0);
  };

  const renderItemFields = () => {
    switch (section.type) {
      case "experience": {
        const exp = item as ExperienceItem;
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InputField
                label="Job Title"
                value={exp.role}
                onChange={(v) => onUpdateItem({ ...exp, role: v })}
                placeholder="untitled"
              />
              <InputField
                label="Employer"
                value={exp.company}
                onChange={(v) => onUpdateItem({ ...exp, company: v })}
                placeholder="untitled"
              />
              <InputField
                label="Start Date"
                value={exp.start}
                onChange={(v) => onUpdateItem({ ...exp, start: v })}
                placeholder="MM / YYYY"
                type="month"
              />
              <InputField
                label="End Date"
                value={exp.end}
                onChange={(v) => onUpdateItem({ ...exp, end: v })}
                placeholder="MM / YYYY"
                type="month"
              />
              <div className="col-span-1 sm:col-span-2">
                <InputField
                  label="City"
                  value={exp.location || ""}
                  onChange={(v) => onUpdateItem({ ...exp, location: v })}
                  placeholder="untitled"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                Description
              </label>
              <div className="flex items-center gap-1 mb-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => applyFormatting("bold")}
                  className={`p-1.5 rounded transition-colors ${
                    isBold
                      ? "bg-[#2563EB] text-white"
                      : "hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8]"
                  }`}
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting("italic")}
                  className={`p-1.5 rounded transition-colors ${
                    isItalic
                      ? "bg-[#2563EB] text-white"
                      : "hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8]"
                  }`}
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting("underline")}
                  className={`p-1.5 rounded transition-colors ${
                    isUnderline
                      ? "bg-[#2563EB] text-white"
                      : "hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8]"
                  }`}
                >
                  <Underline className="h-4 w-4" />
                </button>
              </div>
              <textarea
                ref={textareaRef}
                value={exp.bullets.join("\n")}
                onChange={(e) =>
                  onUpdateItem({
                    ...exp,
                    bullets: e.target.value.split("\n").filter((b) => b.trim()),
                  })
                }
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
                className={`w-full px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all resize-none ${
                  isBold ? "font-bold" : ""
                } ${isItalic ? "italic" : ""} ${isUnderline ? "underline" : ""}`}
              />
            </div>
          </div>
        );
      }

      case "education": {
        const edu = item as EducationItem;
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="School"
              value={edu.school}
              onChange={(v) => onUpdateItem({ ...edu, school: v })}
              placeholder="Stanford University"
            />
            <InputField
              label="Degree"
              value={edu.degree}
              onChange={(v) => onUpdateItem({ ...edu, degree: v })}
              placeholder="Bachelor's"
            />
            <InputField
              label="Start Date"
              value={edu.start}
              onChange={(v) => onUpdateItem({ ...edu, start: v })}
              placeholder="MM / YYYY"
              type="month"
            />
            <InputField
              label="End Date"
              value={edu.end}
              onChange={(v) => onUpdateItem({ ...edu, end: v })}
              placeholder="MM / YYYY"
              type="month"
            />
          </div>
        );
      }

      case "skills": {
       
          return (
            <div>
              <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                Skill
              </label>
              <input
                type="text"
                value={item}
                onChange={(e) => onUpdateItem(e.target.value)}
                placeholder="Enter a skill (e.g., React, TypeScript)"
                autoFocus
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all placeholder:text-[#94A3B8]"
              />
            </div>
          );
        }
        case 'ratedSkills':
        // For ratedSkills, item has name and level
        const rated = item as RatedSkillItem;
        return (
          <div className="space-y-3">
            <InputField 
              label="Skill Name" 
              value={rated.name || ''} 
              onChange={(v) => onUpdateItem({ ...rated, name: v })}
              placeholder="UI/UX Design"
            />
            <div>
              <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                Proficiency Level: {rated.level || 50}%
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={rated.level || 50}
                onChange={(e) => onUpdateItem({ ...rated, level: Number(e.target.value) })}
                className="w-full h-2 bg-[#E2E8F0] dark:bg-[#334155] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              />
              <div className="flex justify-between text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        );


      case "custom": {
        if (section.id === "contact") {
          if (
            item &&
            typeof item === "object" &&
            "label" in item &&
            "description" in item
          ) {
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                    Type
                  </label>
                  <div className="w-full px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg text-[#0F172A] dark:text-white">
                    {item.label || "Email"}
                  </div>
                </div>
                <InputField
                  label="Value"
                  value={item.description || ""}
                  onChange={(v) => onUpdateItem({ ...item, description: v })}
                  placeholder="Enter contact value"
                  autoFocus
                />
              </div>
            );
          }
        }
        if (
          item &&
          typeof item === "object" &&
          "label" in item &&
          "description" in item
        ) {
          return (
            <div className="space-y-3">
              <InputField
                label="Label"
                value={item.label || ""}
                onChange={(v) => onUpdateItem({ ...item, label: v })}
                placeholder="Enter label"
                autoFocus
              />
              <InputField
                label="Description"
                value={item.description || ""}
                onChange={(v) => onUpdateItem({ ...item, description: v })}
                placeholder="Enter description"
              />
            </div>
          );
        }
        return null;
      }

      case "references": {
        const ref = item as ReferenceItem;
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Name"
              value={ref.name || ""}
              onChange={(v) => onUpdateItem({ ...ref, name: v })}
              placeholder="John Smith"
              autoFocus
            />
            <InputField
              label="Address"
              value={ref.address || ""}
              onChange={(v) => onUpdateItem({ ...ref, address: v })}
              placeholder="New York, NY"
            />
            <InputField
              label="Phone"
              value={ref.phone || ""}
              onChange={(v) => onUpdateItem({ ...ref, phone: v })}
              placeholder="+1 (555) 000-0000"
            />
            <InputField
              label="Email"
              value={ref.email || ""}
              onChange={(v) => onUpdateItem({ ...ref, email: v })}
              placeholder="john@email.com"
            />
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="border border-[#E2E8F0] dark:border-[#334155] rounded-lg mb-3 last:mb-0 overflow-hidden">
      <div className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors cursor-pointer">
        <div
          className="flex-1 min-w-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-sm font-medium text-[#0F172A] dark:text-white truncate block">
            {getDisplayLabel()}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveItem();
            }}
            className="p-1 text-[#94A3B8] hover:text-[#EF4444] transition-colors"
            type="button"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors"
            type="button"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      {isExpanded && <div className="px-3 pb-3">{renderItemFields()}</div>}
    </div>
  );
}

// Input Field Component
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all placeholder:text-[#94A3B8]"
      />
    </div>
  );
}

// TextArea Field Component
function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all resize-none placeholder:text-[#94A3B8]"
      />
    </div>
  );
}

// Helper function to get section icon
function getSectionIcon(type: SectionType): React.ReactNode {
  switch (type) {
    case "experience":
      return <Briefcase className="h-5 w-5" />;
    case "education":
      return <GraduationCap className="h-5 w-5" />;
    case "skills":
      return <Sparkles className="h-5 w-5" />;
    default:
      return <Plus className="h-5 w-5" />;
  }
}