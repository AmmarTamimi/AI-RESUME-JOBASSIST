// app/api/ai/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { Resume } from "@/app/types/Content";

export const runtime = "nodejs";
export const maxDuration = 60;

// Use a model ID your key can access. Override via GEMINI_MODEL in .env.local.
const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

type SectionFeedbackOut = {
  id: string;
  title: string;
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
};

type FeedbackOut = {
  atsScore: number;
  overallScore: number;
  summary: string;
  sectionFeedback: SectionFeedbackOut[];
  keywordsPresent: string[];
  keywordsMissing: string[];
  topRecommendations: string[];
};

// --- helpers ---------------------------------------------------------------

const clampScore = (n: unknown) => {
  const v = Number(n);
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(100, Math.round(v)));
};

const toStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];

// Make sure the frontend always receives the exact shape it renders,
// even if the model leaves something out.
function normalizeFeedback(input: any): FeedbackOut {
  return {
    atsScore: clampScore(input?.atsScore),
    overallScore: clampScore(input?.overallScore),
    summary: typeof input?.summary === "string" ? input.summary : "",
    sectionFeedback: Array.isArray(input?.sectionFeedback)
      ? input.sectionFeedback.map((s: any, i: number) => ({
          id: typeof s?.id === "string" ? s.id : `section-${i}`,
          title: typeof s?.title === "string" ? s.title : "Section",
          score: clampScore(s?.score),
          summary: typeof s?.summary === "string" ? s.summary : "",
          strengths: toStringArray(s?.strengths),
          improvements: toStringArray(s?.improvements),
        }))
      : [],
    keywordsPresent: toStringArray(input?.keywordsPresent),
    keywordsMissing: toStringArray(input?.keywordsMissing),
    topRecommendations: toStringArray(input?.topRecommendations),
  };
}

// Pull a JSON object out of the model's text, tolerating ```json fences
// or stray text around it.
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

// --- route -----------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set on the server" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const resume: Resume = body.resume;

    if (!resume || !resume.content) {
      return NextResponse.json(
        { error: "resume is required" },
        { status: 400 },
      );
    }

    const { personalInfo, sections, sectionOrder } = resume.content as any;

    // Flatten the resume into a compact text block the model can read easily.
    const safeSections: any[] = Array.isArray(sections) ? sections : [];
    const safeOrder: string[] = Array.isArray(sectionOrder)
      ? sectionOrder
      : safeSections.map((s) => s.id);

    const orderedSections = safeOrder
      .map((id) => safeSections.find((s) => s.id === id))
      .filter(Boolean);

    const sectionsText = orderedSections
      .map((section: any) => {
        const items = (Array.isArray(section.items) ? section.items : [])
          .map((item: any) => {
            if (typeof item === "string") return `  - ${item}`;
            if (item.role)
              return `  - ${item.role} at ${item.company} (${item.start}–${item.end})\n    ${(item.bullets ?? []).join("\n    ")}`;
            if (item.school)
              return `  - ${item.degree}, ${item.school} (${item.start}–${item.end})`;
            if (item.name && item.level !== undefined)
              return `  - ${item.name}: ${item.level}%`;
            if (item.label) return `  - ${item.label}: ${item.description}`;
            if (item.title)
              return `  - ${item.title}${item.description ? `: ${item.description}` : ""}`;
            return `  - ${JSON.stringify(item)}`;
          })
          .join("\n");
        return `${section.title}\n${items}`;
      })
      .join("\n\n");

    const resumeText = `
Name: ${personalInfo?.fullName ?? "—"}
Title: ${personalInfo?.title ?? "—"}
Location: ${personalInfo?.location ?? "—"}
Email: ${personalInfo?.email ?? "—"}
Phone: ${personalInfo?.phone ?? "—"}
Website: ${personalInfo?.website ?? "—"}

Professional Summary:
${personalInfo?.summary ?? "(none)"}

${sectionsText}
`.trim();

    const prompt = `You are an expert resume reviewer and ATS specialist. Analyze the resume below and return structured feedback.

Resume:
"""
${resumeText}
"""

Return ONLY a JSON object matching this exact schema:
{
  "atsScore": number (0-100, how well an ATS parser reads and ranks this resume),
  "overallScore": number (0-100, content quality, clarity, and impact),
  "summary": string (2-3 sentence overall assessment),
  "sectionFeedback": [
    {
      "id": string (short slug like "summary", "experience", "skills", "education", "projects"),
      "title": string (human-readable section name),
      "score": number (0-100),
      "summary": string (one-line takeaway for this section),
      "strengths": string[] (2-3 concrete things done well),
      "improvements": string[] (2-3 specific, actionable changes)
    }
  ],
  "keywordsPresent": string[] (role-relevant keywords found in the resume),
  "keywordsMissing": string[] (role-relevant keywords the resume should include),
  "topRecommendations": string[] (3-4 highest-impact changes, ordered by priority)
}

Rules:
- Be specific and concrete. Cite the actual text where possible.
- Do not invent experience that isn't in the resume.
- Improvements must be actionable ("Add a metric to the Google bullet" not "quantify more").
- Base keywords on the candidate's target role implied by their title and experience.`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a resume analysis engine. You respond only with valid JSON matching the requested schema. Never wrap the JSON in markdown fences.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      // Thinking models spend part of this budget on reasoning tokens,
      // so keep it generous.
      max_tokens: 8000,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "Empty response from model" },
        { status: 502 },
      );
    }

    const analysis = normalizeFeedback(extractJson(raw));

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("AI feedback error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate feedback",
      },
      { status: 500 },
    );
  }
}
