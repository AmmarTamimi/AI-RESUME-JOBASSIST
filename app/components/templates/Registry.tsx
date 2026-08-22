'use client';

import React from 'react';
import type { ResumeContent, ResumeTheme, TemplateLayoutConfig } from '@/app/types/Content';
import ModernTemplate from './ModernTemplate';
import ModernTemplate2 from './ModernTemplate2';
import ModernTemplate3 from './ModernTemplate3';
import ModernTemplate4 from './ModernTemplate4';
import ModernTemplate5 from './ModernTemplate5';
import ModernTemplate6 from './ModernTemplate6';
import MinimalTemplate from './MinimalTemplate';
import MinimalTemplate2 from './MinimalTemplate2';
import MinimalTemplate3 from './MinimalTemplate3';
import ProfessionalTemplate from './ProfessionalTemplate';
import ProfessionalTemplate2 from './ProfessionalTemplate2';
import BusinessTemplate from './BusinessTemplate';

interface TemplateRendererProps {
  templateComponent: string;
  content: ResumeContent;
  theme: ResumeTheme;
  layoutConfig?: TemplateLayoutConfig;
}

// Map of template component strings to actual React components
const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<{ content: ResumeContent; theme: ResumeTheme }>> = {
  'ModernTemplate': ModernTemplate,
  'ModernTemplate2': ModernTemplate2,
  'ModernTemplate3': ModernTemplate3,
  'ModernTemplate4': ModernTemplate4,
  'ModernTemplate5': ModernTemplate5,
  'ModernTemplate6': ModernTemplate6,
  'MinimalTemplate': MinimalTemplate,
  'MinimalTemplate2': MinimalTemplate2,
  'MinimalTemplate3': MinimalTemplate3,
  'ProfessionalTemplate': ProfessionalTemplate,
  'ProfessionalTemplate2': ProfessionalTemplate2,
  'BusinessTemplate': BusinessTemplate,
};

export default function TemplateRenderer({ templateComponent, content, theme }: TemplateRendererProps) {
  const Component = TEMPLATE_COMPONENTS[templateComponent];
  
  if (!Component) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Template "{templateComponent}" not found.</p>
        <p className="text-sm mt-2">Available templates: {Object.keys(TEMPLATE_COMPONENTS).join(', ')}</p>
      </div>
    );
  }

  return <Component content={content} theme={theme} />;
}