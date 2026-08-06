// app/lib/sectionFactory.ts
import type { Section, SectionType } from "@/app/types/Content";

let counter = 0;
export function makeId(prefix: string) {
  counter += 1;
  return `${prefix}_${Date.now()}_${counter}`;
}

export function createBlankSection(type: SectionType): Section {
  const id = makeId(type);
  switch (type) {
    case "experience":
      return { id, type, title: "Experience", items: [] };
    case "education":
      return { id, type, title: "Education", items: [] };
    case "skills":
      return { id, type, title: "Skills", items: [] };
    case "ratedSkills":
      return { id, type, title: "Skills", items: [] };
    case "references":
      return { id, type, title: "References", items: [] };
    case "custom":
      return { id, type, title: "Custom Section", items: [] };
  }
}

export function createBlankItem(type: SectionType) {
  switch (type) {
    case "experience":
      return { role: "", company: "", location: "", start: "", end: "", bullets: [""] };
    case "education":
      return { school: "", degree: "", start: "", end: "" };
    case "skills":
      return ""; // pushed as a plain string
    case "ratedSkills":
      return { name: "", level: 50 };
    case "references":
      return { name: "", phone: "", email: "", address: "" };
    case "custom":
      return { label: "", description: "" };
  }
}