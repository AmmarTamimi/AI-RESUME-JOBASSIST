'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Resume, PersonalInfo, ResumeTheme, Section, SectionType } from '@/app/types/Content';
import { createBlankSection, createBlankItem, makeId } from '../../../lib/sectionFactory';
import EditorPanel from '../../../components/resumeBuilder/EditorPanel';
import PreviewPanel from '../../../components/resumeBuilder/PreviewPanel';
import { templates } from '../../../components/templates/templates';

function createResumeFromTemplate(templateId: string): Resume {
  const template = templates.find(t => t.id === templateId);
  console.log("template : ", template);
  
  return {
    id: `resume_${Date.now()}`,
    userId: 'user_1',
    templateId: templateId,
    theme: template?.defaultTheme || {
      primaryColor: '#2B2B2B',
      accentColor: '#F2A93B',
      backgroundColor: '#FFFFFF',
      textColor: '#2A2A2A',
      mutedColor: '#8A8A8A',
      headingFont: 'Inter',
      bodyFont: 'Inter',
      fontScale: 'md',
      radius: 'none',
    },
    content: {
      personalInfo: {
        fullName: 'Sarah Johnson',
        title: 'Senior Product Designer',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        website: 'sarahdesigns.com',
        summary: 'Creative and user-focused Product Designer with 7+ years of experience in designing digital products for startups and enterprise companies. Passionate about creating intuitive, accessible, and beautiful user experiences that solve real problems. Proven track record of leading design teams and delivering products that users love.',
        photoUrl: '/womenPic.jpg',
      },
      sectionOrder: ['contact', 'exp', 'edu', 'ratedSkills', 'references'],
      sections: [
        {
          id: 'contact',
          type: 'custom',
          title: 'Contact',
          items: [
            { label: 'phone', description: '+1 (555) 123-4567' },
            { label: 'email', description: 'sarah.johnson@email.com' },
            { label: 'website', description: 'sarahdesigns.com' },
            { label: 'location', description: 'San Francisco, CA' },
          ],
        },
        {
          id: 'exp',
          type: 'experience',
          title: 'Experience',
          items: [
            {
              role: 'Senior Product Designer',
              company: 'Google',
              location: 'Mountain View, CA',
              start: '2021',
              end: 'Present',
              bullets: [
                'Led design for Google Workspace, improving user engagement by 35% and reducing support tickets by 28%',
                'Managed a team of 8 designers and conducted user research with 500+ participants',
                'Launched 3 major product features that reached 50M+ users globally',
              ],
            },
            {
              role: 'Product Designer',
              company: 'Apple',
              location: 'Cupertino, CA',
              start: '2018',
              end: '2021',
              bullets: [
                'Designed core features for iOS that improved user retention by 22%',
                'Collaborated with engineering to ship 10 major releases on schedule',
                'Created design system components used by 20+ product teams',
              ],
            },
            {
              role: 'Junior Designer',
              company: 'Microsoft',
              location: 'Redmond, WA',
              start: '2016',
              end: '2018',
              bullets: [
                'Supported design team on Windows OS updates and new features',
                'Created prototypes and user flows for 5 major projects',
                'Conducted usability testing with 200+ participants',
              ],
            },
          ],
        },
        {
          id: 'edu',
          type: 'education',
          title: 'Education',
          items: [
            {
              school: 'Stanford University',
              degree: 'Master of Science in Human-Computer Interaction',
              start: '2014',
              end: '2016',
            },
            {
              school: 'University of California, Berkeley',
              degree: 'Bachelor of Arts in Design',
              start: '2010',
              end: '2014',
            },
          ],
        },
        {
          id: 'ratedSkills',
          type: 'ratedSkills',
          title: 'Skills',
          items: [
            { name: 'UI/UX Design', level: 95 },
            { name: 'Product Strategy', level: 88 },
            { name: 'User Research', level: 92 },
            { name: 'Figma', level: 98 },
            { name: 'Adobe Creative Suite', level: 85 },
            { name: 'Prototyping', level: 90 },
            { name: 'Design Systems', level: 87 },
            { name: 'Team Leadership', level: 82 },
          ],
        },
        {
          id: 'references',
          type: 'references',
          title: 'References',
          items: [
            {
              name: 'Michael Rodriguez',
              role: 'Design Director',
              phone: '+1 (555) 987-6543',
              email: 'michael.r@google.com',
              address: 'Mountain View, CA',
            },
            {
              name: 'Emily Watson',
              role: 'VP of Product',
              phone: '+1 (555) 456-7890',
              email: 'emily.w@apple.com',
              address: 'Cupertino, CA',
            },
          ],
        },
      ],
    },
  };
}

export default function ResumeBuilderPage() {
  const params = useParams();
  const templateId = params.id as string;
  console.log("template id: ", templateId);
  
  const [resume, setResume] = useState<Resume>(() => {
    return createResumeFromTemplate(templateId);
  });

  const updatePersonalInfo = useCallback(<K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
    setResume((prev) => ({
      ...prev,
      content: { ...prev.content, personalInfo: { ...prev.content.personalInfo, [field]: value } },
    }));
  }, []);

  const updateTheme = useCallback(<K extends keyof ResumeTheme>(field: K, value: ResumeTheme[K]) => {
    setResume((prev) => ({ ...prev, theme: { ...prev.theme, [field]: value } }));
  }, []);

  const switchTemplate = useCallback((newTemplateId: string) => {
    const template = templates.find(t => t.id === newTemplateId);
    if (template) {
      setResume((prev) => ({
        ...prev,
        templateId: newTemplateId,
        theme: { ...prev.theme, ...template.defaultTheme },
      }));
    }
  }, []);

  const updateSection = useCallback((sectionId: string, updater: (section: Section) => Section) => {
    setResume((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((s) => (s.id === sectionId ? updater(s) : s)),
      },
    }));
  }, []);

  const updateSectionTitle = useCallback((sectionId: string, title: string) => {
    updateSection(sectionId, (s) => ({ ...s, title }));
  }, [updateSection]);

  const updateItem = useCallback((sectionId: string, index: number, value: unknown) => {
    updateSection(sectionId, (s) => {
      const items = [...(s.items as unknown[])];
      items[index] = value;
      return { ...s, items } as Section;
    });
  }, [updateSection]);

  const addItem = useCallback((sectionId: string) => {
    updateSection(sectionId, (s) => {
      let blankItem;
      if (s.type === 'ratedSkills') {
        blankItem = { name: '', level: 50 };
      } else if (s.type === 'skills') {
        blankItem = '';
      } else {
        blankItem = createBlankItem(s.type);
      }
      return { ...s, items: [...(s.items as unknown[]), blankItem] } as Section;
    });
  }, [updateSection]);

  const removeItem = useCallback((sectionId: string, index: number) => {
    updateSection(sectionId, (s) => {
      const items = (s.items as unknown[]).filter((_, i) => i !== index);
      return { ...s, items } as Section;
    });
  }, [updateSection]);

  const addSection = useCallback((type: SectionType) => {
    setResume((prev) => {
      const section = createBlankSection(type);
      return {
        ...prev,
        content: {
          ...prev.content,
          sections: [...prev.content.sections, section],
          sectionOrder: [...prev.content.sectionOrder, section.id],
        },
      };
    });
  }, []);

  const removeSection = useCallback((sectionId: string) => {
    setResume((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.filter((s) => s.id !== sectionId),
        sectionOrder: prev.content.sectionOrder.filter((id) => id !== sectionId),
      },
    }));
  }, []);

  const reorderSections = useCallback((sectionOrder: string[]) => {
    setResume((prev) => ({ ...prev, content: { ...prev.content, sectionOrder } }));
  }, []);

  const orderedSections = useMemo(() => {
    const bySectionId = new Map(resume.content.sections.map((s) => [s.id, s]));
    return resume.content.sectionOrder
      .map((id) => bySectionId.get(id))
      .filter((s): s is Section => Boolean(s));
  }, [resume.content.sections, resume.content.sectionOrder]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="w-[480px] flex-shrink-0 border-r border-[#E2E8F0] dark:border-[#334155] overflow-y-auto">
        <EditorPanel
          personalInfo={resume.content.personalInfo}
          sections={orderedSections}
          theme={resume.theme}
          onUpdatePersonalInfo={updatePersonalInfo}
          onUpdateTheme={updateTheme}
          onUpdateSectionTitle={updateSectionTitle}
          onUpdateItem={updateItem}
          onAddItem={addItem}
          onRemoveItem={removeItem}
          onAddSection={addSection}
          onRemoveSection={removeSection}
          onReorderSections={reorderSections}
          onUpdateTemplate={switchTemplate}
        />
      </div>

      <div className="flex-1 overflow-hidden">
        <PreviewPanel
          templateId={resume.templateId}
          theme={resume.theme}
          content={{ ...resume.content, sections: orderedSections }}
          onSwitchTemplate={switchTemplate}
        />
      </div>

      <style>{`
        .editor-layout {
          display: grid;
          grid-template-columns: minmax(360px, 480px) 1fr;
          height: 100vh;
          overflow: hidden;
        }
        .editor-left { 
          overflow-y: auto; 
          border-right: 1px solid #e5e5e5; 
          background: #fafafa; 
        }
        .editor-right { 
          overflow: hidden; 
          background: #ececec; 
        }
        @media (max-width: 900px) {
          .editor-layout { 
            grid-template-columns: 1fr; 
            height: auto; 
          }
          .editor-left, .editor-right { 
            height: auto; 
            min-height: 50vh;
          }
        }
      `}</style>
    </div>
  );
}