// app/types/Content.ts
// Merge this with what you already have — ResumeContent/PersonalInfo/Section etc.
// should already exist; this adds Resume + theme + template-catalog types the
// editor page needs.

export interface PersonalInfo {
  fullName: string;
  title: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  summary?: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
}
export interface AchievementItems {
  start?: string;
  end?: string;
  achievement: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  start: string;
  end: string;
  location?: string;
}

export interface CustomItem {
  label: string;
  description: string;
}

export interface ReferenceItem {
  name: string;
  role?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface RatedSkillItem {
  name: string;
  level: number; // 0-100
}



export type Section =
  | { id: string; type: "experience"; title: string; items: ExperienceItem[] }
  | { id: string; type: "education"; title: string; items: EducationItem[] }
  | { id: string; type: "skills"; title: string; items: string[] }
  | { id: string; type: "ratedSkills"; title: string; items: RatedSkillItem[] }
  | { id: string; type: "references"; title: string; items: ReferenceItem[] }
  | { id: string; type: "languages"; title: string; items: string[] }
  | { id: string; type: "achievements"; title: string; items: AchievementItems[] }
  | { id: string; type: "custom"; title: string; items: CustomItem[] };

export type SectionType = Section["type"];

export interface ResumeContent {
  personalInfo: PersonalInfo;
  sectionOrder: string[];
  sections: Section[];
}

export type FontScale = "sm" | "md" | "lg";
export type Radius = "none" | "sm" | "md" | "lg";

export interface ResumeTheme {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  mutedColor: string;
  headingFont: string;
  bodyFont: string;
  fontScale: FontScale;
  radius?: Radius;
}

export interface TemplateProps {
  content: ResumeContent;
  theme: ResumeTheme;
  layoutConfig?: TemplateLayoutConfig;
}

export type TemplateLayout = "sidebar-left" | "single-column" | "two-column" | "header-band";

export interface TemplateMeta {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  component: string;
  layout: TemplateLayout;
  defaultTheme: ResumeTheme;
  allowedFonts: string[];
  layoutConfig?: TemplateLayoutConfig;
}

export interface TemplateLayoutConfig {
  pageWidth: number;
  pageHeight: number;

  sectionLabelWidth: number;
  contentWidth: number;

  contentStartX: number;

  sectionGap: number;

  headingFont: string;
  bodyFont: string;

  headingSize: number;
  bodySize: number;
}

export interface Resume {
  id: string;
  userId: string;
  templateId: string;
  theme: ResumeTheme;
  content: ResumeContent;
}