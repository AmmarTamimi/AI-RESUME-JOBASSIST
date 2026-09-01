// app/lib/resumeStore.ts
import type { Resume } from "@/app/types/Content";

const keyFor = (id: string) => `resume:${id}`;

export function saveResumeLocal(resume: Resume) {
  sessionStorage.setItem(keyFor(resume.id), JSON.stringify(resume));
}

export function loadResumeLocal(id: string): Resume | null {
  const raw = sessionStorage.getItem(keyFor(id));
  return raw ? (JSON.parse(raw) as Resume) : null;
}