"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Resume, PersonalInfo, ResumeTheme, Section, SectionType, ResumeContent } from "@/app/types/Content";
import { createBlankSection, createBlankItem } from "../../../lib/sectionFactory";
import EditorPanel from "../../../components/resumeBuilder/EditorPanel";
import PreviewPanel from "../../../components/resumeBuilder/PreviewPanel";
import { templates } from "../../../components/templates/templates";
import { createClient } from "@/app/lib/supabase/client";
import { createResume, updateResume } from "@/app/lib/supabase/resume";

// Put these at the top of your builder page, before the component

const DEFAULT_THEME: ResumeTheme = {
  primaryColor: "#2B2B2B",
  accentColor: "#F2A93B",
  backgroundColor: "#FFFFFF",
  textColor: "#2A2A2A",
  mutedColor: "#8A8A8A",
  headingFont: "Inter",
  bodyFont: "Inter",
  fontScale: "md",
  radius: "none",
};

const DEFAULT_CONTENT: ResumeContent = {
  personalInfo: {
    fullName: "Sarah Johnson",
    title: "Senior Product Designer",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "sarahdesigns.com",
    summary:
      "Creative and user-focused Product Designer with 7+ years of experience in designing digital products for startups and enterprise companies. Passionate about creating intuitive, accessible, and beautiful user experiences that solve real problems. Proven track record of leading design teams and delivering products that users love.",
    photoUrl: "/womenPic.jpg",
  },
  sectionOrder: ["contact", "exp", "edu", "ratedSkills", "references"],
  sections: [
    {
      id: "contact",
      type: "custom",
      title: "Contact",
      items: [
        { label: "phone", description: "+1 (555) 123-4567" },
        { label: "email", description: "sarah.johnson@email.com" },
        { label: "website", description: "sarahdesigns.com" },
        { label: "location", description: "San Francisco, CA" },
      ],
    },
    {
      id: "exp",
      type: "experience",
      title: "Experience",
      items: [
        {
          role: "Senior Product Designer",
          company: "Google",
          location: "Mountain View, CA",
          start: "2021",
          end: "Present",
          bullets: [
            "Led design for Google Workspace, improving user engagement by 35% and reducing support tickets by 28%",
            "Managed a team of 8 designers and conducted user research with 500+ participants",
            "Launched 3 major product features that reached 50M+ users globally",
          ],
        },
        {
          role: "Product Designer",
          company: "Apple",
          location: "Cupertino, CA",
          start: "2018",
          end: "2021",
          bullets: [
            "Designed core features for iOS that improved user retention by 22%",
            "Collaborated with engineering to ship 10 major releases on schedule",
            "Created design system components used by 20+ product teams",
          ],
        },
        {
          role: "Junior Designer",
          company: "Microsoft",
          location: "Redmond, WA",
          start: "2016",
          end: "2018",
          bullets: [
            "Supported design team on Windows OS updates and new features",
            "Created prototypes and user flows for 5 major projects",
            "Conducted usability testing with 200+ participants",
          ],
        },
      ],
    },
    {
      id: "edu",
      type: "education",
      title: "Education",
      items: [
        {
          school: "Stanford University",
          degree: "Master of Science in Human-Computer Interaction",
          start: "2014",
          end: "2016",
        },
        {
          school: "University of California, Berkeley",
          degree: "Bachelor of Arts in Design",
          start: "2010",
          end: "2014",
        },
      ],
    },
    {
      id: "ratedSkills",
      type: "ratedSkills",
      title: "Skills",
      items: [
        { name: "UI/UX Design", level: 95 },
        { name: "Product Strategy", level: 88 },
        { name: "User Research", level: 92 },
        { name: "Figma", level: 98 },
        { name: "Adobe Creative Suite", level: 85 },
        { name: "Prototyping", level: 90 },
        { name: "Design Systems", level: 87 },
        { name: "Team Leadership", level: 82 },
      ],
    },
    {
      id: "references",
      type: "references",
      title: "References",
      items: [
        {
          name: "Michael Rodriguez",
          role: "Design Director",
          phone: "+1 (555) 987-6543",
          email: "michael.r@google.com",
          address: "Mountain View, CA",
        },
        {
          name: "Emily Watson",
          role: "VP of Product",
          phone: "+1 (555) 456-7890",
          email: "emily.w@apple.com",
          address: "Cupertino, CA",
        },
      ],
    },
  ],
};

function createResumeFromTemplate(templateId: string): Resume {
  const template = templates.find((t) => t.id === templateId);
  return {
    // id is a placeholder — the real DB id comes after the first save
    id: "",
    userId: "",
    templateId,
    theme: template?.defaultTheme ?? DEFAULT_THEME,
    content: DEFAULT_CONTENT,
    status: "draft",
    thumbnail_url: null,
  } as Resume;
}

const AUTOSAVE_DEBOUNCE_MS = 3000;
const DRAFT_TTL_MS = 24 * 60 * 60 * 1000;

export default function ResumeBuilderPage() {
  const params = useParams();
  const templateId = params.id as string;
  const router = useRouter();

  const [resume, setResume] = useState<Resume>(() => createResumeFromTemplate(templateId));

  // null until the first successful DB write
  const [persistedId, setPersistedId] = useState<string | null>(null);

  // Always-current ref — lets timers and unload handlers see fresh data
  // without re-subscribing on every keystroke.
  const resumeRef = useRef(resume);
  useEffect(() => { resumeRef.current = resume; }, [resume]);

  // Track last-saved hash so we skip no-op saves.
  const lastSavedHashRef = useRef<string>("");
  // Prevent overlapping writes.
  const inFlightRef = useRef(false);
  const pendingRef = useRef(false);

  // ---------------------------------------------------------------
  // Core save: create once, update after.
  // ---------------------------------------------------------------
  const saveToDb = useCallback(async () => {
    if (inFlightRef.current) {
      pendingRef.current = true;
      return;
    }
    inFlightRef.current = true;

    try {
      const current = resumeRef.current;

      const hash = JSON.stringify({
        title: current.title,
        theme: current.theme,
        content: current.content,
      });

      // Nothing changed since last save → skip
      if (hash === lastSavedHashRef.current) return;

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      if (!persistedId) {
        // First save — create the row
        const created = await createResume({
          userId: user.id,
          templateId: current.templateId,
          theme: current.theme,
          content: current.content,
          title: current.title ?? "Untitled Resume",
          thumbnail_url: current.thumbnail_url ?? null,
          status: "draft",
        });
        setPersistedId(created.id);
        lastSavedHashRef.current = hash;
        localStorage.removeItem("resume-draft:new");
      } else {
        // Subsequent saves — update
        await updateResume(persistedId, {
          title: current.title ?? null,
          theme: current.theme,
          content: current.content,
          status: "draft",
        });
        lastSavedHashRef.current = hash;
        localStorage.removeItem(`resume-draft:${persistedId}`);
      }
    } catch (err) {
      console.error("Autosave failed:", err);
    } finally {
      inFlightRef.current = false;
      if (pendingRef.current) {
        pendingRef.current = false;
        saveToDb(); // run once more with latest state
      }
    }
  }, [persistedId, router]);

  // ---------------------------------------------------------------
  // Debounced autosave: 3s after last change.
  // ---------------------------------------------------------------
  useEffect(() => {
    const t = setTimeout(saveToDb, AUTOSAVE_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [resume, saveToDb]);

  // ---------------------------------------------------------------
  // Save when the tab becomes hidden (mobile background, tab switch).
  // ---------------------------------------------------------------
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === "hidden") saveToDb();
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [saveToDb]);

  // ---------------------------------------------------------------
  // Draft recovery on mount.
  // Look in "resume-draft:new" — a single slot for the resume the
  // user was working on before it ever got saved to the DB.
  // ---------------------------------------------------------------
  useEffect(() => {
    const key = "resume-draft:new";
    const raw = localStorage.getItem(key);
    if (!raw) return;

    try {
      const snap = JSON.parse(raw);
      if (Date.now() - snap.savedAt > DRAFT_TTL_MS) {
        localStorage.removeItem(key);
        return;
      }
      if (confirm("We found unsaved changes from your last session. Restore them?")) {
        setResume((prev) => ({
          ...prev,
          title: snap.title ?? prev.title,
          theme: snap.theme ?? prev.theme,
          content: snap.content ?? prev.content,
          templateId: snap.templateId ?? prev.templateId,
        }));
      } else {
        localStorage.removeItem(key);
      }
    } catch {
      localStorage.removeItem(key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------------------------------------
  // Last-resort save on unload — writes to localStorage.
  // Key is "resume-draft:new" if we haven't saved to DB yet,
  // otherwise "resume-draft:<persistedId>".
  // Reads from resumeRef so it always has the freshest data.
  // ---------------------------------------------------------------
  useEffect(() => {
    const handler = () => {
      const current = resumeRef.current;
      const key = persistedId ? `resume-draft:${persistedId}` : "resume-draft:new";
      try {
        localStorage.setItem(
          key,
          JSON.stringify({
            savedAt: Date.now(),
            title: current.title,
            theme: current.theme,
            content: current.content,
            templateId: current.templateId,
          }),
        );
      } catch {
        // quota / disabled — ignore
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [persistedId]);

  // ---------------------------------------------------------------
  // Editor callbacks (unchanged)
  // ---------------------------------------------------------------
  const updatePersonalInfo = useCallback(
    <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
      setResume((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          personalInfo: { ...prev.content.personalInfo, [field]: value },
        },
      }));
    },
    [],
  );

  const updateTheme = useCallback(
    <K extends keyof ResumeTheme>(field: K, value: ResumeTheme[K]) => {
      setResume((prev) => ({ ...prev, theme: { ...prev.theme, [field]: value } }));
    },
    [],
  );

  const switchTemplate = useCallback((newTemplateId: string) => {
    const template = templates.find((t) => t.id === newTemplateId);
    if (template) {
      setResume((prev) => ({
        ...prev,
        templateId: newTemplateId,
        theme: { ...prev.theme, ...template.defaultTheme },
      }));
    }
  }, []);

  const updateSection = useCallback(
    (sectionId: string, updater: (section: Section) => Section) => {
      setResume((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          sections: prev.content.sections.map((s) =>
            s.id === sectionId ? updater(s) : s,
          ),
        },
      }));
    },
    [],
  );

  const updateSectionTitle = useCallback(
    (sectionId: string, title: string) => {
      updateSection(sectionId, (s) => ({ ...s, title }));
    },
    [updateSection],
  );

  const updateItem = useCallback(
    (sectionId: string, index: number, value: unknown) => {
      updateSection(sectionId, (s) => {
        const items = [...(s.items as unknown[])];
        items[index] = value;
        return { ...s, items } as Section;
      });
    },
    [updateSection],
  );

  const addItem = useCallback(
    (sectionId: string) => {
      updateSection(sectionId, (s) => {
        let blankItem;
        if (s.type === "ratedSkills") blankItem = { name: "", level: 50 };
        else if (s.type === "skills") blankItem = "";
        else blankItem = createBlankItem(s.type);
        return { ...s, items: [...(s.items as unknown[]), blankItem] } as Section;
      });
    },
    [updateSection],
  );

  const removeItem = useCallback(
    (sectionId: string, index: number) => {
      updateSection(sectionId, (s) => {
        const items = (s.items as unknown[]).filter((_, i) => i !== index);
        return { ...s, items } as Section;
      });
    },
    [updateSection],
  );

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
    const byId = new Map(resume.content.sections.map((s) => [s.id, s]));
    return resume.content.sectionOrder
      .map((id) => byId.get(id))
      .filter((s): s is Section => Boolean(s));
  }, [resume.content.sections, resume.content.sectionOrder]);

  // ---------------------------------------------------------------
  // Finish — force a completed save, then navigate.
  // ---------------------------------------------------------------
  const handleFinish = useCallback(async () => {
    const current = resumeRef.current;

    // Wait for any in-flight save to settle
    while (inFlightRef.current) {
      await new Promise((r) => setTimeout(r, 50));
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    let finalId = persistedId;

    if (!finalId) {
      const created = await createResume({
        userId: user.id,
        templateId: current.templateId,
        theme: current.theme,
        content: current.content,
        title: current.title ?? "Untitled Resume",
        thumbnail_url: current.thumbnail_url ?? null,
        status: "completed",
      });
      finalId = created.id;
      setPersistedId(finalId);
      localStorage.removeItem("resume-draft:new");
    } else {
      await updateResume(finalId, {
        title: current.title ?? null,
        theme: current.theme,
        content: current.content,
        status: "completed",
      });
      localStorage.removeItem(`resume-draft:${finalId}`);
    }

    router.push(`/dashboard/resumeBuilder/${finalId}/complete`);
  }, [persistedId, router]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="w-[480px] flex-shrink-0 border-r border-[#E2E8F0] dark:border-[#334155] overflow-y-auto">
        <EditorPanel
          templateId={resume.templateId}
          resumeId={persistedId ?? ""}
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
          onFinish={handleFinish}
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
    </div>
  );
}