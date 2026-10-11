// app/lib/resumeFixes.ts
// Shared by the API route (validation) and the page (applying accepted fixes).

import type { ResumeContent, Section } from "@/app/types/Content";

export type FixKind = "summary" | "bullet" | "itemDescription" | "addSkill";

export interface FixChange {
  id: string;
  kind: FixKind;
  sectionId?: string;
  sectionTitle: string;
  itemIndex?: number;
  bulletIndex?: number;
  itemLabel?: string;
  before: string; // "" for addSkill
  after: string; // the new text, or the skill being added
  reason: string;
}

// Shape the model returns (untrusted).
export interface RawFix {
  target?: string;
  sectionId?: string;
  itemIndex?: number;
  bulletIndex?: number;
  after?: string;
  skill?: string;
  reason?: string;
}

type Describable = { description?: string };

const clean = (s: unknown) => (typeof s === "string" ? s.trim() : "");
const idx = (n: unknown) =>
  typeof n === "number" && Number.isInteger(n) && n >= 0 ? n : null;

/** True if the text contains an unfilled placeholder such as [X%] or [N]. */
export function needsInput(text: string) {
  return /\[[^\]]{1,24}\]/.test(text);
}

function labelFor(section: Section, i: number): string | undefined {
  switch (section.type) {
    case "experience": {
      const it = section.items[i];
      return it ? `${it.role} at ${it.company}` : undefined;
    }
    case "custom":
      return section.items[i]?.label;
    case "achievements":
      return section.items[i]?.title;
    default:
      return undefined;
  }
}

/**
 * Turns the model's raw suggestions into validated changes. Anything that
 * doesn't point at a real, existing field is silently dropped, so the model
 * can't invent items or touch fields we don't allow.
 */
export function buildChanges(
  content: ResumeContent,
  raw: RawFix[],
): FixChange[] {
  const out: Omit<FixChange, "id">[] = [];
  const seen = new Set<string>();

  const push = (key: string, change: Omit<FixChange, "id">) => {
    if (seen.has(key)) return;
    seen.add(key);
    out.push(change);
  };

  for (const r of raw.slice(0, 40)) {
    const reason = clean(r.reason);

    if (r.target === "summary") {
      const before = content.personalInfo.summary ?? "";
      const after = clean(r.after);
      if (!after || after === before.trim()) continue;
      push("summary", {
        kind: "summary",
        sectionTitle: "Professional summary",
        before,
        after,
        reason,
      });
      continue;
    }

    const section = content.sections.find((s) => s.id === r.sectionId);
    if (!section) continue;

    if (r.target === "bullet" && section.type === "experience") {
      const i = idx(r.itemIndex);
      const j = idx(r.bulletIndex);
      if (i === null || j === null) continue;
      const before = section.items[i]?.bullets?.[j];
      const after = clean(r.after);
      if (typeof before !== "string" || !after || after === before.trim())
        continue;
      push(`bullet:${section.id}:${i}:${j}`, {
        kind: "bullet",
        sectionId: section.id,
        sectionTitle: section.title,
        itemIndex: i,
        bulletIndex: j,
        itemLabel: labelFor(section, i),
        before,
        after,
        reason,
      });
      continue;
    }

    if (
      r.target === "itemDescription" &&
      (section.type === "experience" ||
        section.type === "custom" ||
        section.type === "achievements")
    ) {
      const i = idx(r.itemIndex);
      if (i === null) continue;
      const item = (section.items as unknown as Describable[])[i];
      const before = item?.description;
      const after = clean(r.after);
      if (typeof before !== "string" || !before.trim()) continue;
      if (!after || after === before.trim()) continue;
      push(`desc:${section.id}:${i}`, {
        kind: "itemDescription",
        sectionId: section.id,
        sectionTitle: section.title,
        itemIndex: i,
        itemLabel: labelFor(section, i),
        before,
        after,
        reason,
      });
      continue;
    }

    if (r.target === "addSkill" && section.type === "skills") {
      const skill = clean(r.skill);
      if (!skill || skill.length > 40) continue;
      const exists = section.items.some(
        (s) => s.trim().toLowerCase() === skill.toLowerCase(),
      );
      if (exists) continue;
      push(`skill:${skill.toLowerCase()}`, {
        kind: "addSkill",
        sectionId: section.id,
        sectionTitle: section.title,
        before: "",
        after: skill,
        reason,
      });
    }
  }

  // Order: summary first, then sections in resume order, then by position.
  const sectionRank = (id?: string) => {
    if (!id) return -1;
    const k = content.sectionOrder.indexOf(id);
    return k === -1 ? 999 : k;
  };
  out.sort(
    (a, b) =>
      sectionRank(a.sectionId) - sectionRank(b.sectionId) ||
      (a.itemIndex ?? 0) - (b.itemIndex ?? 0) ||
      (a.bulletIndex ?? 0) - (b.bulletIndex ?? 0),
  );

  return out.map((c, n) => ({ ...c, id: `fix-${n}` }));
}

/** Applies the accepted changes to a copy of the content. */
export function applyChanges(
  content: ResumeContent,
  changes: FixChange[],
): ResumeContent {
  const next: ResumeContent = structuredClone(content);

  for (const c of changes) {
    if (c.kind === "summary") {
      next.personalInfo.summary = c.after;
      continue;
    }

    const section = next.sections.find((s) => s.id === c.sectionId);
    if (!section) continue;

    if (c.kind === "addSkill" && section.type === "skills") {
      const exists = section.items.some(
        (s) => s.trim().toLowerCase() === c.after.toLowerCase(),
      );
      if (!exists) section.items.push(c.after);
    } else if (c.kind === "bullet" && section.type === "experience") {
      const item = section.items[c.itemIndex ?? -1];
      const j = c.bulletIndex ?? -1;
      if (item && typeof item.bullets?.[j] === "string") {
        item.bullets[j] = c.after;
      }
    } else if (c.kind === "itemDescription") {
      const item = (section.items as unknown as Describable[])[
        c.itemIndex ?? -1
      ];
      if (item) item.description = c.after;
    }
  }

  return next;
}
