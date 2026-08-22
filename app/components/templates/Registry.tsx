'use client';

import React from 'react';
import type { ResumeContent, ResumeTheme, TemplateLayoutConfig } from '@/app/types/Content';
import ModernTemplate from './ModernTemplate';
import MinimalTemplate3 from './MinimalTemplate3';

interface TemplateRendererProps {
  templateComponent: string;
  content: ResumeContent;
  theme: ResumeTheme;
  layoutConfig?: TemplateLayoutConfig;
}

const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<{ content: ResumeContent; theme: ResumeTheme }>> = {
  'ModernTemplate': ModernTemplate,
  'MinimalTemplate3': MinimalTemplate3,
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