import React from "react";
import type { ComponentType } from "react";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import BusinessTemplate from "./BusinessTemplate";
import type { TemplateProps } from "../../types/Content";

export const TEMPLATE_REGISTRY: Record<string, ComponentType<TemplateProps>> = {
  ModernTemplate,
  MinimalTemplate,
  ProfessionalTemplate,
  BusinessTemplate,
};

export type TemplateComponentKey = keyof typeof TEMPLATE_REGISTRY;

interface TemplateRendererProps extends TemplateProps {
  templateComponent: string;
}

/**
 * Single generic renderer used by:
 *  - the editor page's live preview (right panel)
 *  - PDF export (server-side render of the same component)
 *
 * Usage:
 *   <TemplateRenderer templateComponent={template.component} content={resume.content} theme={resume.theme} />
 */
export default function TemplateRenderer({ templateComponent, content, theme }: TemplateRendererProps) {
  const Template = TEMPLATE_REGISTRY[templateComponent];
  if (!Template) return null;
  return <Template content={content} theme={theme} />;
}