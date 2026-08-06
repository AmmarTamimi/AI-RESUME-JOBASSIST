'use client';

import React, { useState } from "react";
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
  Phone
} from "lucide-react";
import Link from "next/link";

interface EditorPanelProps {
  personalInfo: PersonalInfo;
  sections: Section[];
  theme: ResumeTheme;
  onUpdatePersonalInfo: <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => void;
  onUpdateTheme: <K extends keyof ResumeTheme>(field: K, value: ResumeTheme[K]) => void;
  onUpdateSectionTitle: (sectionId: string, title: string) => void;
  onUpdateItem: (sectionId: string, index: number, value: unknown) => void;
  onAddItem: (sectionId: string) => void;
  onRemoveItem: (sectionId: string, index: number) => void;
  onAddSection: (type: SectionType) => void;
  onRemoveSection: (sectionId: string) => void;
  onReorderSections: (sectionOrder: string[]) => void;
}

const ADDABLE_TYPES: { type: SectionType; label: string; icon: React.ReactNode }[] = [
  { type: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
  { type: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
  { type: "skills", label: "Skills", icon: <Sparkles className="h-4 w-4" /> },
  { type: "custom", label: "Custom", icon: <Plus className="h-4 w-4" /> },
];

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
}: EditorPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.map(s => s.id))
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div className="h-full bg-white dark:bg-[#0F172A] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-[#334155] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#0F172A] dark:text-white">My Resume</h1>
            <div className="flex gap-1 items-center justify-center text-slate-500">

            <Link href={'/dashboard'}>Dashboard</Link>
            <p>/</p>
            <Link href={'/dashboard/resumes'}>Resumes</Link>
            <p> / </p>
            <p> Resume </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] bg-[#F1F5F9] dark:bg-[#1E293B] rounded-lg hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors">
              Create
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition-colors">
              Templates
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Personal Information */}
        <SectionCard 
          title="Personal Information"
          icon={<User className="h-5 w-5" />}
          isExpanded={true}
          onToggle={()=>{}}
        >
          <div className="grid grid-cols-2 gap-3">
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
              value={personalInfo.email || ''} 
              onChange={(v) => onUpdatePersonalInfo("email", v)}
              placeholder="john@email.com"
            />
            <InputField 
              label="Phone" 
              value={personalInfo.phone || ''} 
              onChange={(v) => onUpdatePersonalInfo("phone", v)}
              placeholder="+1 (555) 000-0000"
            />
            <InputField 
              label="Location" 
              value={personalInfo.location || ''} 
              onChange={(v) => onUpdatePersonalInfo("location", v)}
              placeholder="San Francisco, CA"
            />
            <InputField 
              label="Website" 
              value={personalInfo.website || ''} 
              onChange={(v) => onUpdatePersonalInfo("website", v)}
              placeholder="johndoe.com"
            />
            <div className="col-span-2">
              <TextAreaField 
                label="Professional Summary" 
                value={personalInfo.summary || ''} 
                onChange={(v) => onUpdatePersonalInfo("summary", v)}
                placeholder="Write a brief summary of your professional background..."
                rows={3}
              />
            </div>
          </div>
        </SectionCard>

        {/* Dynamic Sections */}
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          const sectionIcon = getSectionIcon(section.type);
          const itemCount = section.items.length;

          return (
            <SectionCard 
              key={section.id}
              title={
                <div className="flex items-center gap-2">
                  <input
                    value={section.title}
                    onChange={(e) => onUpdateSectionTitle(section.id, e.target.value)}
                    className="bg-transparent border-none focus:outline-none text-sm font-medium text-[#0F172A] dark:text-white"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-xs text-[#94A3B8]">({itemCount})</span>
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
                    onUpdateItem={(value) => onUpdateItem(section.id, index, value)}
                    onRemoveItem={() => onRemoveItem(section.id, index)}
                  />
                ))}
                
                <button
                  onClick={() => onAddItem(section.id)}
                  className="flex items-center gap-1 text-sm text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add {section.type === "experience" ? "Experience" : 
                       section.type === "education" ? "Education" : 
                       section.type === "skills" ? "Skill" : "Item"}
                </button>
              </div>
            </SectionCard>
          );
        })}

        {/* Add Section */}
        <div className="border-2 border-dashed border-[#E2E8F0] dark:border-[#334155] rounded-xl p-4">
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-3">Add a section</p>
          <div className="flex flex-wrap gap-2">
            {ADDABLE_TYPES.map((type) => (
              <button
                key={type.type}
                onClick={() => onAddSection(type.type)}
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
  );
}

// Section Card Component - Fixed button nesting issue
function SectionCard({ 
  title, 
  icon, 
  children, 
  isExpanded, 
  onToggle,
  onRemove 
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
      {/* Header - using div instead of button to avoid button nesting */}
      <div className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors cursor-pointer">
        <div 
          className="flex items-center gap-2 flex-1"
          onClick={onToggle}
        >
          <span className="text-[#64748B] dark:text-[#94A3B8]">{icon}</span>
          <span className="text-sm font-medium text-[#0F172A] dark:text-white">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {onRemove && (
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
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
      {isExpanded && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

// Item Card Component
function ItemCard({ 
  section, 
  item, 
  index, 
  onUpdateItem, 
  onRemoveItem 
}: { 
  section: Section;
  item: any; 
  index: number; 
  onUpdateItem: (value: any) => void; 
  onRemoveItem: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const renderItemFields = () => {
    switch (section.type) {
      case 'experience':
        const exp = item as ExperienceItem;
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
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
              <div className="col-span-2">
                <InputField 
                  label="City" 
                  value={exp.location || ''} 
                  onChange={(v) => onUpdateItem({ ...exp, location: v })}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                Description
              </label>
              <div className="flex items-center gap-1 mb-2">
                <button type="button" className="p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors">
                  <Bold className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
                </button>
                <button type="button" className="p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors">
                  <Italic className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
                </button>
                <button type="button" className="p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors">
                  <Underline className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
                </button>
              </div>
              <textarea
                value={exp.bullets.join('\n')}
                onChange={(e) => onUpdateItem({ ...exp, bullets: e.target.value.split('\n').filter(b => b.trim()) })}
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all resize-none"
              />
            </div>
          </div>
        );

      case 'education':
        const edu = item as EducationItem;
        return (
          <div className="grid grid-cols-2 gap-3">
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

      case 'skills':
        return (
          <InputField 
            label="Skill" 
            value={item} 
            onChange={(v) => onUpdateItem(v)}
            placeholder="React, TypeScript, Node.js"
          />
        );
    
      default:
        return null;
    }
  };

  return (
    <div className="border border-[#E2E8F0] dark:border-[#334155] rounded-lg mb-3 last:mb-0 overflow-hidden">
      <div className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors cursor-pointer">
        <div 
          className="flex-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">
            {section.type === 'experience' && (item as ExperienceItem).role || 'Untitled'}
            {section.type === 'education' && (item as EducationItem).school || 'Untitled'}
            {section.type === 'skills' && (item || 'Untitled')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onRemoveItem(); }}
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
      {isExpanded && (
        <div className="px-3 pb-3">
          {renderItemFields()}
        </div>
      )}
    </div>
  );
}

// Input Field Component
function InputField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = "text" 
}: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void; 
  placeholder?: string;
  type?: string;
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
  rows = 3 
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
    case 'experience': return <Briefcase className="h-5 w-5" />;
    case 'education': return <GraduationCap className="h-5 w-5" />;
    case 'skills': return <Sparkles className="h-5 w-5" />;
    default: return <Plus className="h-5 w-5" />;
  }
}