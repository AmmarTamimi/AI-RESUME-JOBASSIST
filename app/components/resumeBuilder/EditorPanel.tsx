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
  LanguageItem,
  AchievementItem,
} from "@/app/types/Content";
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  Bold,
  Italic,
  Underline,
  ChevronDown,
  ChevronRight,
  X,
  Menu,
  Camera,
  Palette,
  Type,
  FileText,
  Trophy,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Home,
  Settings,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Star,
  BookOpen,
  Users,
  Code,
  Languages,
  Edit,
  Loader2,
  Check,
} from "lucide-react";
import Link from "next/link";
import { templates } from "../templates/templates";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { TypingText } from "./TypingText";

// Template Card Component
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
          {template.layout?.replace("-", " ") || "Standard"}
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
    type: "languages",
    label: "Languages",
    icon: <Languages className="h-4 w-4" />,
  },
  {
    type: "achievements",
    label: "Achievements",
    icon: <Award className="h-4 w-4" />,
  },
  {
    type: "ratedSkills",
    label: "Rated Skills",
    icon: <Star className="h-4 w-4" />,
  },
  {
    type: "skills",
    label: "Skills",
    icon: <Code className="h-4 w-4" />,
  },
  {
    type: "custom",
    label: "Custom",
    icon: <Plus className="h-4 w-4" />,
  },
];

const GOOGLE_FONTS = [
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
  "Poppins",
  "Oswald",
  "Bebas Neue",
  "Anton",
  "Pacifico",
  "Dancing Script",
  "Great Vibes",
  "Satisfy",
  "Fira Code",
  "JetBrains Mono",
  "Source Code Pro",
  "Cascadia Code",
  "Roboto Mono",
];

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

const loadGoogleFont = (fontName: string) => {
  if (
    !fontName ||
    ["system-ui", "sans-serif", "serif", "monospace"].includes(fontName)
  )
    return;
  const fontId = fontName.replace(/ /g, "+");
  const linkId = `google-font-${fontId}`;
  if (document.getElementById(linkId)) return;
  const link = document.createElement("link");
  link.id = linkId;
  link.href = `https://fonts.googleapis.com/css2?family=${fontId}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

const CATEGORIES = [
  "All",
  "Modern",
  "Professional",
  "Minimal",
  "Business",
  "ATS-Friendly",
];

// Helper function to check if a string has meaningful content
const hasMeaningfulContent = (str: string): boolean => {
  if (!str) return false;
  const trimmed = str.trim();
  if (trimmed === "") return false;
  const defaultValues = [
    "John Doe",
    "Software Engineer",
    "john@email.com",
    "+1 (555) 000-0000",
    "San Francisco, CA",
    "johndoe.com",
  ];
  if (defaultValues.includes(trimmed)) return false;
  return trimmed.length > 0;
};

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
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentStep, setCurrentStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<{
    type: string;
    message: string;
  } | null>(null);

  // Add these state variables
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiModalType, setAiModalType] = useState<
    "experience" | "achievement" | "summary" | null
  >(null);
  const [aiModalIndex, setAiModalIndex] = useState<number | undefined>(
    undefined,
  );
  const [aiModalContext, setAiModalContext] = useState("");
  const [aiModalResult, setAiModalResult] = useState<string | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Get all section IDs for navigation
  const allSectionIds = [
    "theme",
    "personal",
    ...sections.map((s) => s.id),
    "add-section",
  ];

  const getStepInfo = () => {
    const currentId = allSectionIds[currentStep] || "theme";
    const totalSteps = allSectionIds.length;
    return { currentId, totalSteps };
  };

  const { currentId, totalSteps } = getStepInfo();

  const navigateToSection = (direction: "next" | "prev") => {
    setIsNavigating(true);
    const newStep =
      direction === "next"
        ? Math.min(currentStep + 1, totalSteps - 1)
        : Math.max(currentStep - 1, 0);

    setCurrentStep(newStep);

    const container = document.querySelector(".editor-content");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }

    setTimeout(() => setIsNavigating(false), 500);
  };

  const hasSectionContent = (sectionId: string) => {
    if (sectionId === "theme") {
      return !!(theme.primaryColor && theme.primaryColor !== "#2B2B2B");
    }
    if (sectionId === "personal") {
      return (
        hasMeaningfulContent(personalInfo.fullName) &&
        hasMeaningfulContent(personalInfo.title)
      );
    }
    if (sectionId === "add-section") {
      return false;
    }
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return false;

    for (const item of section.items) {
      if (typeof item === "string" && hasMeaningfulContent(item)) return true;
      if (typeof item === "object" && item !== null) {
        const values = Object.values(item);
        for (const val of values) {
          if (typeof val === "string" && hasMeaningfulContent(val)) return true;
        }
      }
    }
    return false;
  };

  const getSectionLabel = (id: string) => {
    if (id === "theme") return "Theme";
    if (id === "personal") return "Profile";
    if (id === "add-section") return "Add Section";
    const section = sections.find((s) => s.id === id);
    return section?.title || id;
  };

  const renderStepContent = () => {
    const currentId = allSectionIds[currentStep];

    if (currentId === "theme") {
      return renderThemeSection();
    }
    if (currentId === "personal") {
      return renderPersonalInfoSection();
    }
    if (currentId === "add-section") {
      return renderAddSectionContent();
    }
    const section = sections.find((s) => s.id === currentId);
    if (section) {
      return renderDynamicSection(section);
    }
    return null;
  };


  const handleGenerate = async (
    type: "experience" | "achievement" | "summary",
    index?: number,
    userContext?: string,
  ) => {
    // Generate a unique key for tracking loading state
    const generateKey = type === "summary" ? "summary" : `${type}-${index}`;
    setIsGenerating(generateKey);
    setGenerationError(null);

    try {
      let data = {};

      if (type === "summary") {
        // For summary, we need the whole resume data
        data = { personalInfo, sections };
      } else if (type === "experience" && index !== undefined) {
        const expSection = sections.find((s) => s.type === "experience");
        if (!expSection || !expSection.items[index]) {
          throw new Error("Experience item not found");
        }
        const exp = expSection.items[index] as ExperienceItem;
        data = {
          role: exp.role,
          company: exp.company,
          location: exp.location,
          start: exp.start,
          end: exp.end,
          userContext: userContext || "",
          existingDescription: exp.description || "",
        };
      } else if (type === "achievement" && index !== undefined) {
        const achSection = sections.find((s) => s.type === "achievements");
        if (!achSection || !achSection.items[index]) {
          throw new Error("Achievement item not found");
        }
        const ach = achSection.items[index] as AchievementItem;
        data = {
          title: ach.title,
          existingDescription: ach.description || "",
          userContext: userContext || "",
        };
      } else {
        throw new Error("Invalid type or missing index");
      }

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          data: data,
        }),
      });

      const response = await res.json();

      if (!response.success) {
        console.error(response.error || "Generation failed");
        setGenerationError(response.error);
        return;
      }

      // Update the specific field
      if (type === "summary") {
        onUpdatePersonalInfo("summary", response.result);
      } else if (type === "experience" && index !== undefined) {
        const expSection = sections.find((s) => s.type === "experience");
        if (expSection && expSection.items[index]) {
          const exp = expSection.items[index] as ExperienceItem;
          onUpdateItem(expSection.id, index, {
            ...exp,
            description: response.result,
          });
        }
      } else if (type === "achievement" && index !== undefined) {
        const achSection = sections.find((s) => s.type === "achievements");
        if (achSection && achSection.items[index]) {
          const ach = achSection.items[index] as AchievementItem;
          onUpdateItem(achSection.id, index, {
            ...ach,
            description: response.result,
          });
        }
      }

      // Close modal if open
      setAiModalOpen(false);
      setAiModalResult(null);
    } catch (error) {
      console.error("Error in AI generation:", error);
      setGenerationError({
        type: generateKey,
        message:
          error instanceof Error ? error.message : "Failed to generate content",
      });
    } finally {
      setIsGenerating(null);
      setIsGeneratingAI(false);
    }
  };

  // Helper function to get AI preview without applying to resume
  const getAIPreview = async (
    type: "experience" | "achievement" | "summary",
    index: number | undefined,
    userContext?: string,
  ) => {
    let data = {};

    if (type === "summary") {
      data = { personalInfo, sections };
    } else if (type === "experience") {
      // Ensure index is defined
      if (index === undefined) {
        throw new Error("Index is required for experience generation");
      }
      const expSection = sections.find((s) => s.type === "experience");
      if (!expSection || !expSection.items[index]) {
        throw new Error("Experience item not found");
      }
      const exp = expSection.items[index] as ExperienceItem;
      data = {
        role: exp.role,
        company: exp.company,
        location: exp.location,
        start: exp.start,
        end: exp.end,
        userContext: userContext || "",
        existingDescription: exp.description || "",
      };
    } else if (type === "achievement") {
      // Ensure index is defined
      if (index === undefined) {
        throw new Error("Index is required for achievement generation");
      }
      const achSection = sections.find((s) => s.type === "achievements");
      if (!achSection || !achSection.items[index]) {
        throw new Error("Achievement item not found");
      }
      const ach = achSection.items[index] as AchievementItem;
      data = {
        title: ach.title,
        existingDescription: ach.description || "",
        userContext: userContext || "",
      };
    }

    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        data: data,
      }),
    });

    const response = await res.json();
    console.log("response: ", response);
    if (!response.success) {
      throw new Error(response.error || "Generation failed");
    }

    return response.result;
  };

  // Open AI Modal
  const openAIModal = (
    type: "experience" | "achievement" | "summary",
    index?: number,
  ) => {
    setAiModalType(type);
    setAiModalIndex(index);
    setAiModalContext("");
    setAiModalResult(null);
    setAiModalOpen(true);
  };

  const renderAddSectionContent = () => (
    <div className="border-2 border-dashed border-[#E2E8F0] dark:border-[#334155] rounded-xl p-8 text-center">
      <Plus className="h-12 w-12 text-[#94A3B8] mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-[#0F172A] dark:text-white mb-2">
        Add a New Section
      </h3>
      <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-4">
        Choose from the available section types to add to your resume
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {ADDABLE_TYPES.map((type) => (
          <button
            key={type.type}
            onClick={() => {
              onAddSection(type.type);
              setTimeout(() => {
                const newIndex = allSectionIds.length - 2;
                setCurrentStep(newIndex);
              }, 100);
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#F1F5F9] dark:bg-[#1E293B] text-[#0F172A] dark:text-white rounded-lg hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors"
          >
            {type.icon}
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderThemeSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#0F172A] dark:text-white mb-2">
          Colors
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.primaryColor || "#2B2B2B"}
                onChange={(e) => onUpdateTheme("primaryColor", e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-[#E2E8F0] dark:border-[#334155] p-1"
              />
              <input
                type="text"
                value={theme.primaryColor || "#2B2B2B"}
                onChange={(e) => onUpdateTheme("primaryColor", e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
              Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.accentColor || "#F4A51C"}
                onChange={(e) => onUpdateTheme("accentColor", e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-[#E2E8F0] dark:border-[#334155] p-1"
              />
              <input
                type="text"
                value={theme.accentColor || "#F4A51C"}
                onChange={(e) => onUpdateTheme("accentColor", e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
              />
            </div>
          </div>
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
      <div>
        <label className="block text-sm font-medium text-[#0F172A] dark:text-white mb-2">
          <Type className="h-4 w-4 inline mr-2" /> Fonts
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
            >
              {GOOGLE_FONTS.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
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
            >
              {GOOGLE_FONTS.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfoSection = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  reader.onloadend = () =>
                    onUpdatePersonalInfo("photoUrl", reader.result as string);
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
      <InputField
        label="Email"
        value={personalInfo.email || ""}
        onChange={(v) => onUpdatePersonalInfo("email", v)}
        placeholder="john@email.com"
      />
      <InputField
        label="Phone"
        value={personalInfo.phone || ""}
        onChange={(v) => onUpdatePersonalInfo("phone", v)}
        placeholder="+1 (555) 000-0000"
      />
      <InputField
        label="Location"
        value={personalInfo.location || ""}
        onChange={(v) => onUpdatePersonalInfo("location", v)}
        placeholder="San Francisco, CA"
      />
      <InputField
        label="Website"
        value={personalInfo.website || ""}
        onChange={(v) => onUpdatePersonalInfo("website", v)}
        placeholder="johndoe.com"
      />
      <div className="col-span-1 sm:col-span-2">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
            Professional Summary
          </label>
          <AIGenerateButton
            onClick={() => openAIModal("summary")}
            isLoading={isGenerating === "summary"}
            label="AI Generate Summary"
          />
        </div>
        <textarea
          value={personalInfo.summary || ""}
          onChange={(e) => onUpdatePersonalInfo("summary", e.target.value)}
          placeholder="Write a brief summary of your professional background..."
          rows={6}
          className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all resize-none"
        />
        {generationError && generationError.type === "summary" && (
          <p className="mt-1 text-xs text-red-500">{generationError.message}</p>
        )}
      </div>
    </div>
  );

  const renderDynamicSection = (section: Section) => {
    const itemCount = section.items.length;

    return (
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                value={section.title}
                onChange={(e) =>
                  onUpdateSectionTitle(section.id, e.target.value)
                }
                className="text-lg font-semibold bg-transparent border-none focus:outline-none text-[#0F172A] dark:text-white min-w-0"
                placeholder="Section Title"
              />
              <span className="text-xs text-[#94A3B8]">({itemCount})</span>
            </div>
            <button
              onClick={() => onRemoveSection(section.id)}
              className="p-1 text-[#94A3B8] hover:text-[#EF4444] transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
            {section.type === "experience" &&
              "Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z)."}
            {section.type === "education" &&
              "List your educational background, including degrees, institutions, and graduation years."}
            {section.type === "skills" &&
              "List your technical skills and competencies."}
            {section.type === "ratedSkills" &&
              "Rate your skills on a scale of 0-100%."}
            {section.type === "languages" &&
              "List the languages you speak and your proficiency level."}
            {section.type === "achievements" &&
              "Highlight your key achievements and awards."}
            {section.type === "references" &&
              "Provide professional references who can vouch for your skills and experience."}
          </p>
        </div>

        <div className="space-y-3">
          {section.items.map((item, index) => (
            <ItemCard
              key={index}
              index={index}
              section={section}
              item={item}
              personalInfo={personalInfo}
              onUpdateItem={(value) => onUpdateItem(section.id, index, value)}
              onRemoveItem={() => onRemoveItem(section.id, index)}
              isGenerating={isGenerating}
              handleGenerate={handleGenerate}
              generationError={generationError}
              openAIModal={openAIModal}
            />
          ))}
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
                : "Item"}
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (theme.headingFont) loadGoogleFont(theme.headingFont);
    if (theme.bodyFont) loadGoogleFont(theme.bodyFont);
  }, [theme.headingFont, theme.bodyFont]);

  useEffect(() => {
    const sectionIds = new Set(sections.map((s) => s.id));
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      for (const id of prev) {
        if (!sectionIds.has(id)) newSet.delete(id);
      }
      for (const section of sections) {
        if (!prev.has(section.id)) newSet.add(section.id);
      }
      return newSet;
    });
  }, [sections]);

  useEffect(() => {
    const total = 3 + sections.length;
    if (currentStep >= total) {
      setCurrentStep(total - 1);
    }
  }, [sections.length]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#0F172A]">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-[#334155] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5 text-[#64748B]" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-[#0F172A] dark:text-white">
                Edit
              </h1>
            </div>
          </div>
          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="px-3 py-1.5 text-xs font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition-colors"
          >
            Templates
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 editor-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-white dark:bg-[#0F172A] border-t border-[#E2E8F0] dark:border-[#334155] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigateToSection("prev")}
            disabled={currentStep === 0 || isNavigating}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
            <span className="font-medium text-[#0F172A] dark:text-white">
              {currentStep + 1}
            </span>
            <span>/</span>
            <span>{totalSteps}</span>
          </div>

          <button
            onClick={() => navigateToSection("next")}
            disabled={currentStep === totalSteps - 1 || isNavigating}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps - 2 ? "Finish" : "Next"}
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Template Modal */}
      <AnimatePresence>
        {isTemplateModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTemplateModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0F172A] rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden"
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
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[55vh]">
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {templates
                    .filter(
                      (template) =>
                        selectedCategory === "All" ||
                        template.category?.toLowerCase() ===
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
      {/* AI Generation Modal */}
      <AnimatePresence>
        {aiModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAiModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-[#E2E8F0] dark:border-[#334155] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
                    <Sparkles className="h-5 w-5 text-[#1D4ED8]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] dark:text-white">
                      AI Generate{" "}
                      {aiModalType === "summary"
                        ? "Summary"
                        : aiModalType === "experience"
                          ? "Experience"
                          : "Achievement"}
                    </h3>
                    <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                      {aiModalType === "summary"
                        ? "Provide context or let AI generate a professional summary"
                        : aiModalType === "experience"
                          ? "Provide context or let AI work with your existing data"
                          : "Describe your achievement or let AI generate it"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAiModalOpen(false)}
                  className="p-2 hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-[#64748B]" />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] dark:text-white mb-2">
                      {aiModalType === "summary"
                        ? "Key points to include (optional)"
                        : aiModalType === "experience"
                          ? "Give a brief overview (optional)"
                          : "Describe your achievement (optional)"}
                    </label>
                    <textarea
                      value={aiModalContext}
                      onChange={(e) => setAiModalContext(e.target.value)}
                      placeholder={
                        aiModalType === "experience"
                          ? 'e.g., "Led a team to build a new feature that increased user engagement"'
                          : 'e.g., "Won the company\'s innovation award for designing a new workflow"'
                      }
                      rows={3}
                      className="w-full px-4 py-3 text-sm bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    />
                    <p className="mt-1.5 text-xs text-[#94A3B8]">
                      Leave empty to let AI generate based on your existing data
                    </p>
                  </div>

                  {/* AI Result with Typing Animation */}
                  {aiModalResult && (
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                          AI Generated Result
                        </span>
                        {isGeneratingAI && (
                          <span className="text-xs text-purple-400 animate-pulse">
                            ● Generating...
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-[#0F172A] dark:text-white whitespace-pre-wrap leading-relaxed min-h-[40px]">
                        <TypingText
                          text={aiModalResult}
                          isTyping={isGeneratingAI}
                          speed={25}
                          delay={150}
                          onComplete={() => {
                            console.log("Typing complete!");
                          }}
                        />
                      </div>
                      <button
                        onClick={() => setAiModalResult(null)}
                        className="mt-2 text-xs text-purple-500 hover:text-purple-600 transition-colors"
                      >
                        Regenerate
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-[#E2E8F0] dark:border-[#334155] flex items-center justify-between">
                <button
                  onClick={() => {
                    setAiModalOpen(false);
                    setAiModalResult(null);
                    setAiModalContext("");
                  }}
                  className="px-4 py-2 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <div className="flex items-center gap-3">
                  {aiModalResult && (
                    <button
                      onClick={() => {
                        if (aiModalType === "summary") {
                          onUpdatePersonalInfo("summary", aiModalResult);
                          setAiModalOpen(false);
                          setAiModalResult(null);
                          setAiModalContext("");
                          setGenerationError(null);
                        } else if (
                          aiModalType === "experience" &&
                          aiModalIndex !== undefined
                        ) {
                          const expSection = sections.find(
                            (s) => s.type === "experience",
                          );
                          if (expSection && expSection.items[aiModalIndex]) {
                            const exp = expSection.items[
                              aiModalIndex
                            ] as ExperienceItem;
                            onUpdateItem(expSection.id, aiModalIndex, {
                              ...exp,
                              bullets: aiModalResult,
                            });
                            setAiModalOpen(false);
                            setAiModalResult(null);
                            setAiModalContext("");
                            setGenerationError(null);
                          }
                        } else if (
                          aiModalType === "achievement" &&
                          aiModalIndex !== undefined
                        ) {
                          const achSection = sections.find(
                            (s) => s.type === "achievements",
                          );
                          if (achSection && achSection.items[aiModalIndex]) {
                            const ach = achSection.items[
                              aiModalIndex
                            ] as AchievementItem;
                            onUpdateItem(achSection.id, aiModalIndex, {
                              ...ach,
                              description: aiModalResult,
                            });
                            setAiModalOpen(false);
                            setAiModalResult(null);
                            setAiModalContext("");
                            setGenerationError(null);
                          }
                        }
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors shadow-lg shadow-emerald-500/25"
                    >
                      <Check className="h-4 w-4 inline mr-2" />
                      Apply to Resume
                    </button>
                  )}
                  <button
                    onClick={async () => {
                      if (!aiModalType) return;
                      setIsGeneratingAI(true);
                      setAiModalResult(null); // Clear previous to trigger animation
                      try {
                        const index = aiModalIndex ?? undefined;
                        const data = await getAIPreview(
                          aiModalType,
                          index,
                          aiModalContext,
                        );
                        setAiModalResult(data);
                        // Estimate typing duration and turn off generating state
                        const estimatedDuration = data.length * 20 + 300;
                        setTimeout(() => {
                          setIsGeneratingAI(false);
                        }, estimatedDuration);
                      } catch (error) {
                        console.error("Failed to generate preview:", error);
                        setIsGeneratingAI(false);
                      }
                    }}
                    disabled={isGeneratingAI}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingAI ? (
                      <>
                        <Loader2 className="h-4 w-4 inline mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 inline mr-2" />
                        {aiModalResult ? "Regenerate" : "Generate"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
        className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
      />
    </div>
  );
}

// TextArea Field Component
// function TextAreaField({
//   label,
//   value,
//   onChange,
//   placeholder,
//   rows = 3,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   rows?: number;
// }) {
//   return (
//     <div>
//       <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
//         {label}
//       </label>
//       <textarea
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         rows={rows}
//         className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all resize-none"
//       />
//     </div>
//   );
// }

// Item Card Component - FIXED VERSION
function ItemCard({
  section,
  item,
  index,
  personalInfo,
  onUpdateItem,
  onRemoveItem,
  handleGenerate,
  isGenerating,
  generationError,
  openAIModal,
}: {
  section: Section;
  item: any;
  index: number;
  personalInfo: PersonalInfo;
  isGenerating: string | null;
  generationError: { type: string; message: string } | null;
  onUpdateItem: (value: any) => void;
  onRemoveItem: () => void;
  handleGenerate: (
    type: "experience" | "achievement",
    index: number,
    userContext?: string,
  ) => void;
  openAIModal: (type: "experience" | "achievement", index: number) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (section.type === "skills" || section.type === "ratedSkills") {
      setIsExpanded(true);
    }
  }, [section.type, item]);

  const getDisplayLabel = () => {
    // Handle contact section items
    if (section.id === "contact") {
      if (item && typeof item === "object") {
        // If it has a description, show it
        if ("description" in item && item.description) {
          return item.description;
        }
        // If it has a label, show the label
        if ("label" in item && item.label) {
          return item.label;
        }
      }
      return "Contact Item";
    }

    if (section.type === "experience") {
      const exp = item as ExperienceItem;
      if (exp.role && exp.company) return `${exp.role} at ${exp.company}`;
      return exp.role || exp.company || "Untitled";
    }
    if (section.type === "education") {
      const edu = item as EducationItem;
      if (edu.degree && edu.school) return `${edu.degree} - ${edu.school}`;
      return edu.school || edu.degree || "Untitled";
    }
    if (section.type === "skills" || section.type === "ratedSkills") {
      if (typeof item === "string") return item || "Untitled";
      if (item && typeof item === "object" && "name" in item) {
        return (item as RatedSkillItem).name || "Untitled";
      }
      return "Untitled";
    }
    if (section.type === "references") {
      const ref = item as ReferenceItem;
      if (ref.name) return ref.name;
      return "Untitled";
    }
    if (section.type === "languages") {
      const lang = item as LanguageItem;
      if (lang.name) return lang.name;
      return "Untitled";
    }
    if (section.type === "achievements") {
      const achievement = item as AchievementItem;
      if (achievement.title) return achievement.title;
      return "Untitled";
    }
    if (item && typeof item === "object") {
      if ("name" in item) return item.name || "Untitled";
      if ("label" in item) return item.label || "Untitled";
      if ("title" in item) return item.title || "Untitled";
    }
    if (typeof item === "string") return item || "Untitled";
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
    // Handle contact section items
    if (section.id === "contact") {
      if (
        item &&
        typeof item === "object" &&
        "label" in item &&
        "description" in item
      ) {
        const labelMap: Record<string, string> = {
          phone: "Phone",
          email: "Email",
          website: "Website",
          location: "Location",
          web: "Website",
        };
        const displayLabel = labelMap[item.label] || item.label || "Email";
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                Type
              </label>
              <div className="w-full px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg text-[#0F172A] dark:text-white">
                {displayLabel}
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
      return null;
    }

    switch (section.type) {
      case "experience": {
        const exp = item as ExperienceItem;
        const isGeneratingExp = isGenerating === `experience-${index}`;

        return (
          <div className="space-y-3">
            <InputField
              label="Job Title"
              value={exp.role}
              onChange={(v) => onUpdateItem({ ...exp, role: v })}
              placeholder="Software Engineer"
            />
            <InputField
              label="Employer"
              value={exp.company}
              onChange={(v) => onUpdateItem({ ...exp, company: v })}
              placeholder="Google"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            </div>
            <InputField
              label="City, State"
              value={exp.location || ""}
              onChange={(v) => onUpdateItem({ ...exp, location: v })}
              placeholder="San Francisco, CA"
            />
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                  Description
                </label>
                <AIGenerateButton
                  onClick={() => openAIModal("experience", index)}
                  isLoading={isGeneratingExp}
                  label="AI Generate"
                />
              </div>
              <div className="flex items-center gap-1 mb-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => applyFormatting("bold")}
                  className={`p-1.5 rounded transition-colors ${isBold ? "bg-[#8B5CF6] text-white" : "hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8]"}`}
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting("italic")}
                  className={`p-1.5 rounded transition-colors ${isItalic ? "bg-[#8B5CF6] text-white" : "hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8]"}`}
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting("underline")}
                  className={`p-1.5 rounded transition-colors ${isUnderline ? "bg-[#8B5CF6] text-white" : "hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8]"}`}
                >
                  <Underline className="h-4 w-4" />
                </button>
              </div>
              <textarea
                ref={textareaRef}
                value={exp.bullets || ""}
                onChange={(e) =>
                  onUpdateItem({
                    ...exp,
                    bullets: e.target.value,
                  })
                }
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
                className={`w-full px-3 py-2 text-sm bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all resize-none ${isBold ? "font-bold" : ""} ${isItalic ? "italic" : ""} ${isUnderline ? "underline" : ""}`}
              />
              {generationError &&
                generationError.type === `experience-${index}` && (
                  <p className="mt-1 text-xs text-red-500">
                    {generationError.message}
                  </p>
                )}
            </div>
          </div>
        );
      }

      case "education": {
        const edu = item as EducationItem;
        return (
          <div className="space-y-3">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <InputField
              label="City, State"
              value={edu.location || ""}
              onChange={(v) => onUpdateItem({ ...edu, location: v })}
              placeholder="Stanford, CA"
            />
          </div>
        );
      }

      case "skills": {
        if (typeof item === "string") {
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
                className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
              />
            </div>
          );
        }
        return null;
      }

      case "ratedSkills": {
        const rated = item as RatedSkillItem;
        return (
          <div className="space-y-3">
            <InputField
              label="Skill Name"
              value={rated.name || ""}
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
                onChange={(e) =>
                  onUpdateItem({ ...rated, level: Number(e.target.value) })
                }
                className="w-full h-2 bg-[#E2E8F0] dark:bg-[#334155] rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
              />
              <div className="flex justify-between text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        );
      }

      case "languages": {
        const lang = item as LanguageItem;
        return (
          <div className="space-y-3">
            <InputField
              label="Language"
              value={lang.name || ""}
              onChange={(v) => onUpdateItem({ ...lang, name: v })}
              placeholder="English"
              autoFocus
            />
            <div>
              <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                Level
              </label>
              <select
                value={lang.level || ""}
                onChange={(e) =>
                  onUpdateItem({ ...lang, level: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
              >
                <option value="">Select level</option>
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Beginner">Beginner</option>
              </select>
            </div>
          </div>
        );
      }

      case "achievements": {
        const achievement = item as AchievementItem;
        const isGeneratingAchievement = isGenerating === `achievement-${index}`;

        return (
          <div className="space-y-3">
            <InputField
              label="Title"
              value={achievement.title || ""}
              onChange={(v) => onUpdateItem({ ...achievement, title: v })}
              placeholder="Award or achievement title"
              autoFocus
            />
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                  Description
                </label>
                <AIGenerateButton
                  onClick={() => openAIModal("achievement", index)}
                  isLoading={isGeneratingAchievement}
                  label="AI Generate Description"
                  icon={Award}
                />
              </div>
              <textarea
                value={achievement.description || ""}
                onChange={(e) =>
                  onUpdateItem({ ...achievement, description: e.target.value })
                }
                placeholder="Describe the achievement..."
                rows={3}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all resize-none"
              />
              {generationError &&
                generationError.type === `achievement-${index}` && (
                  <p className="mt-1 text-xs text-red-500">
                    {generationError.message}
                  </p>
                )}
            </div>
            <InputField
              label="Date (Optional)"
              value={achievement.date || ""}
              onChange={(v) => onUpdateItem({ ...achievement, date: v })}
              placeholder="2023"
            />
          </div>
        );
      }

      case "references": {
        const ref = item as ReferenceItem;
        return (
          <div className="space-y-3">
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

      case "custom": {
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

      default:
        return null;
    }
  };

  return (
    <div className="border border-[#E2E8F0] dark:border-[#334155] rounded-lg overflow-hidden">
      <div
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm font-medium text-[#0F172A] dark:text-white truncate">
          {getDisplayLabel()}
        </span>
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
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
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
      {isExpanded && <div className="px-4 pb-4">{renderItemFields()}</div>}
    </div>
  );
}
// AI Generation Button Component - Professional & Clean
function AIGenerateButton({
  onClick,
  isLoading,
  label = "Generate with AI",
  icon: Icon = Sparkles,
  variant = "primary",
}: {
  onClick: () => void;
  isLoading: boolean;
  label?: string;
  icon?: any;
  variant?: "primary" | "secondary" | "minimal";
}) {
  const variants = {
    primary: {
      button:
        "bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm shadow-purple-500/20 hover:shadow-purple-500/30",
      glow: "bg-purple-500/10",
    },
    secondary: {
      button:
        "bg-[#F1F5F9] dark:bg-[#1E293B] hover:bg-[#E2E8F0] dark:hover:bg-[#334155] text-[#0F172A] dark:text-white border border-[#E2E8F0] dark:border-[#334155]",
      glow: "",
    },
    minimal: {
      button:
        "bg-transparent hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white",
      glow: "",
    },
  };

  const currentVariant = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0F172A]",
        currentVariant.button,
        "relative overflow-hidden group",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        "hover:scale-[1.02] active:scale-[0.97]",
      )}
    >
      {/* Subtle shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

      {isLoading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span className="font-medium">Generating...</span>
        </>
      ) : (
        <>
          <Icon
            className={cn(
              "h-3.5 w-3.5",
              variant === "primary" ? "text-white" : "text-current",
            )}
          />
          <span className="font-medium">{label}</span>
        </>
      )}
    </button>
  );
}
