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
import MinimalTemplate4 from './MinimalTemplate4';
import MinimalTemplate5 from './MinimalTemplate5';
import MinimalTemplate6 from './MinimalTemplate6';
import ProfessionalTemplate from './ProfessionalTemplate';
import ProfessionalTemplate2 from './ProfessionalTemplate2';
import ProfessionalTemplate3 from './ProfessionalTemplate3';
import ProfessionalTemplate4 from './ProfessionalTemplate4';
import ProfessionalTemplate5 from './ProfessionalTemplate5';
import BusinessTemplate from './BusinessTemplate';
import BusinessTemplate2 from './BusinessTemplate2';
import BusinessTemplate3 from './BusinessTemplate3';
import BusinessTemplate4 from './BusinessTemplate4';
import BusinessTemplate5 from './BusinessTemplate5';
import ATSTemplate from './ATSTemplate';
import ATSTemplate2 from './ATSTemplate2';
import ATSTemplate3 from './ATSTemplate3';
import ATSTemplate4 from './ATSTemplate4';
import ATSTemplate5 from './ATSTemplate5';

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
  'MinimalTemplate4': MinimalTemplate4,
  'MinimalTemplate5': MinimalTemplate5,
  'MinimalTemplate6': MinimalTemplate6,
  'ProfessionalTemplate': ProfessionalTemplate,
  'ProfessionalTemplate2': ProfessionalTemplate2,
  'ProfessionalTemplate3': ProfessionalTemplate3,
  'ProfessionalTemplate4': ProfessionalTemplate4,
  'ProfessionalTemplate5': ProfessionalTemplate5,
  'BusinessTemplate': BusinessTemplate,
  'BusinessTemplate2': BusinessTemplate2,
  'BusinessTemplate3': BusinessTemplate3,
  'BusinessTemplate4': BusinessTemplate4,
  'BusinessTemplate5': BusinessTemplate5,
  'ATSTemplate': ATSTemplate,
  'ATSTemplate2': ATSTemplate2,
  'ATSTemplate3': ATSTemplate3,
  'ATSTemplate4': ATSTemplate4,
  'ATSTemplate5': ATSTemplate5,

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