// app/api/ai/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { Resume } from "@/app/types/Content";

export const runtime = "nodejs";
export const maxDuration = 60;

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// This is the exact shape the frontend renders. Keep it in sync.
const FEEDBACK_SCHEMA = {
  type: "object",
  properties: {
    atsScore: { type: "number", minimum: 0, maximum: 100 },
    overallScore: { type: "number", minimum: 0, maximum: 100 },
    summary: { type: "string" },
    sectionFeedback: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          score: { type: "number", minimum: 0, maximum: 100 },
          summary: { type: "string" },
          strengths: { type: "array", items: { type: "string" } },
          improvements: { type: "array", items: { type: "string" } },
        },
        required: [
          "id",
          "title",
          "score",
          "summary",
          "strengths",
          "improvements",
        ],
        additionalProperties: false,
      },
    },
    keywordsPresent: { type: "array", items: { type: "string" } },
    keywordsMissing: { type: "array", items: { type: "string" } },
    topRecommendations: { type: "array", items: { type: "string" } },
  },
  required: [
    "atsScore",
    "overallScore",
    "summary",
    "sectionFeedback",
    "keywordsPresent",
    "keywordsMissing",
    "topRecommendations",
  ],
  additionalProperties: false,
} as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resume: Resume = body.resume;

    if (!resume || !resume.content) {
      return NextResponse.json(
        { error: "resume is required" },
        { status: 400 },
      );
    }

    // Flatten the resume into a compact text block the model can read easily.
    // Passing raw JSON wastes tokens on structure the model doesn't need.
    const { personalInfo, sections, sectionOrder } = resume.content;

    const orderedSections = sectionOrder
      .map((id) => sections.find((s) => s.id === id))
      .filter(Boolean);

    const sectionsText = orderedSections
      .map((section) => {
        if (!section) return "";
        const items = (section.items as any[])
          .map((item) => {
            if (typeof item === "string") return `  - ${item}`;
            if (item.role)
              return `  - ${item.role} at ${item.company} (${item.start}–${item.end})\n    ${(item.bullets ?? []).join("\n    ")}`;
            if (item.school)
              return `  - ${item.degree}, ${item.school} (${item.start}–${item.end})`;
            if (item.name && item.level !== undefined)
              return `  - ${item.name}: ${item.level}%`;
            if (item.name && item.level)
              return `  - ${item.name} (${item.level})`;
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
Name: ${personalInfo.fullName}
Title: ${personalInfo.title}
Location: ${personalInfo.location ?? "—"}
Email: ${personalInfo.email ?? "—"}
Phone: ${personalInfo.phone ?? "—"}
Website: ${personalInfo.website ?? "—"}

Professional Summary:
${personalInfo.summary ?? "(none)"}

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
      "id": string (short slug like "summary", "experience", "skills", "education"),
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
      model: "nvidia/nemotron-3-super-120b-a12b:free",
      messages: [
        {
          role: "system",
          content:
            "You are a resume analysis engine. You respond only with valid JSON matching the requested schema. Never wrap the JSON in markdown fences.",
        },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "resume_feedback",
          strict: true,
          schema: FEEDBACK_SCHEMA,
        },
      },
      provider: {
        require_parameters: true,
      },
      temperature: 0.3,
      max_tokens: 4000,
    } as any);

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "Empty response from model" },
        { status: 502 },
      );
    }

    const analysis = JSON.parse(raw);

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
