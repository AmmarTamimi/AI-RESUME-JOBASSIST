// app/api/ai/apply-fixes/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { Resume, ResumeContent } from "@/app/types/Content";
import { buildChanges, type RawFix } from "@/app/lib/resumeFixes";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

function extractJson(raw: string) {
  const cleaned = raw
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error("Model returned invalid JSON");
  }
}

// Render the resume with explicit indexes so the model can point at exact fields.
function annotate(content: ResumeContent): string {
  const lines: string[] = [];
  lines.push(`TITLE: ${content.personalInfo.title ?? ""}`);
  lines.push(`SUMMARY: ${content.personalInfo.summary ?? "(none)"}`);

  const sections = content.sectionOrder
    .map((id) => content.sections.find((s) => s.id === id))
    .filter(Boolean);

  for (const section of sections) {
    if (!section) continue;
    lines.push("");
    lines.push(`SECTION id="${section.id}" type=${section.type} title="${section.title}"`);

    switch (section.type) {
      case "experience":
        section.items.forEach((it, i) => {
          lines.push(`  item ${i}: ${it.role} at ${it.company} (${it.start}–${it.end})`);
          if (it.description) lines.push(`    description: ${it.description}`);
          it.bullets.forEach((b, j) => lines.push(`    bullet ${j}: ${b}`));
        });
        break;
      case "skills":
        lines.push(`  skills: ${section.items.join(", ")}`);
        break;
      case "custom":
        section.items.forEach((it, i) =>
          lines.push(`  item ${i}: ${it.label}\n    description: ${it.description}`),
        );
        break;
      case "achievements":
        section.items.forEach((it, i) =>
          lines.push(
            `  item ${i}: ${it.title}${it.description ? `\n    description: ${it.description}` : ""}`,
          ),
        );
        break;
      case "education":
        section.items.forEach((it, i) =>
          lines.push(`  item ${i}: ${it.degree}, ${it.school} (${it.start}–${it.end})`),
        );
        break;
      default:
        lines.push("  (not editable)");
    }
  }
  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set on the server" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const resume: Resume | undefined = body.resume;
    const analysis = body.analysis;

    if (!resume?.content?.sections || !analysis) {
      return NextResponse.json(
        { error: "resume and analysis are required" },
        { status: 400 },
      );
    }

    const content = resume.content;

    const feedbackText = JSON.stringify(
      {
        topRecommendations: analysis.topRecommendations ?? [],
        keywordsMissing: analysis.keywordsMissing ?? [],
        sectionFeedback: (analysis.sectionFeedback ?? []).map((s: any) => ({
          id: s.id,
          title: s.title,
          improvements: s.improvements ?? [],
        })),
      },
      null,
      2,
    );

    const prompt = `You are an expert resume editor. Apply the reviewer's feedback to the resume by proposing precise edits.

RESUME (with indexes):
"""
${annotate(content)}
"""

REVIEWER FEEDBACK:
"""
${feedbackText}
"""

Return ONLY a JSON object: { "changes": [ ... ] }

Each change is one of:
1. { "target": "summary", "after": string, "reason": string }
2. { "target": "bullet", "sectionId": string, "itemIndex": number, "bulletIndex": number, "after": string, "reason": string }
3. { "target": "itemDescription", "sectionId": string, "itemIndex": number, "after": string, "reason": string }
4. { "target": "addSkill", "sectionId": string, "skill": string, "reason": string }

Rules:
- sectionId, itemIndex and bulletIndex MUST match the indexes shown above exactly.
- Only edit text that exists. Never add new bullets, items, sections, companies, roles, dates or schools.
- Never invent facts, tools, employers or numbers. If a metric would strengthen a line but none is in the resume, write a bracketed placeholder such as [X%] or [N users] so the candidate can fill it in.
- Only use addSkill for a skill that is clearly evidenced elsewhere in the resume (a bullet, project or summary). Use the "skills" section id.
- Keep each rewritten bullet to one line (under ~25 words), starting with a strong action verb, keeping the original meaning.
- Keep the rewritten summary to 2-3 sentences.
- "reason" is one short sentence explaining the improvement.
- Propose only edits that address the feedback. Skip lines that are already good. Aim for 5-15 changes total.`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a resume editing engine. You respond only with valid JSON matching the requested schema. Never wrap the JSON in markdown fences.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 8000,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "Empty response from model" },
        { status: 502 },
      );
    }

    const parsed = extractJson(raw);
    const rawChanges: RawFix[] = Array.isArray(parsed?.changes)
      ? parsed.changes
      : [];

    const changes = buildChanges(content, rawChanges);

    return NextResponse.json({ changes });
  } catch (error) {
    console.error("AI apply-fixes error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate fixes",
      },
      { status: 500 },
    );
  }
}
