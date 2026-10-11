import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ResumeContent, Section } from "@/app/types/Content";

export const runtime = "nodejs";
export const maxDuration = 90;

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const DEFAULT_THEME = {
  primaryColor: "#1F2A44",
  accentColor: "#C08A3E",
  backgroundColor: "#FFFFFF",
  textColor: "#1E1E1E",
  mutedColor: "#6B7280",
  headingFont: "Poppins",
  bodyFont: "Inter",
  fontScale: "md",
  radius: "md",
} as const;

const SCHEMA_HINT = `
Return ONLY a JSON object (no markdown, no commentary) matching this shape:

{
  "title": string,                            // a friendly name for this resume, e.g. "Senior React Developer"
  "templateId": string,                       // pick one of: "modern-01", "modern-02", "professional-01", "minimal-01", "ats-01"
  "personalInfo": {
    "fullName": string,                       // a plausible full name
    "title": string,                          // the target role
    "email": string,
    "phone": string,
    "location": string,
    "website": string,
    "summary": string                         // 3-4 sentence professional summary
  },
  "sections": [
    {
      "id": "exp",
      "type": "experience",
      "title": "Experience",
      "items": [
        {
          "role": string,
          "company": string,
          "location": string,
          "start": string,
          "end": string,
          "bullets": string[]
        }
      ]
    },
    {
      "id": "edu",
      "type": "education",
      "title": "Education",
      "items": [
        {
          "school": string,
          "degree": string,
          "start": string,
          "end": string,
          "location": string
        }
      ]
    },
    {
      "id": "skills",
      "type": "ratedSkills",
      "title": "Skills",
      "items": [
        { "name": string, "level": number }
      ]
    },
    {
      "id": "languages",
      "type": "languages",
      "title": "Languages",
      "items": [
        { "name": string, "level": string }
      ]
    }
  ]
}
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = String(body.prompt || "").trim();

    if (!prompt) {
      return NextResponse.json(
        { error: "A prompt is required" },
        { status: 400 },
      );
    }

    if (prompt.length < 10) {
      return NextResponse.json(
        { error: "Please provide a bit more detail in your prompt" },
        { status: 400 },
      );
    }

    if (prompt.length > 2000) {
      return NextResponse.json(
        { error: "Prompt is too long (max 2000 characters)" },
        { status: 400 },
      );
    }

    const systemPrompt = `You are an expert professional resume writer.
You generate complete, realistic, ATS-friendly resumes from a short user prompt.

Rules:
- Invent plausible companies, dates, schools, and achievements consistent with the user's prompt. This is a starter draft the user will edit.
- Do NOT copy the user's prompt verbatim — turn it into a well-structured resume.
- Use quantified achievements where natural (numbers, %, $).
- All dates should be realistic and in the past or "Present".
- Skills should match the role implied by the prompt.
- Return ONLY valid JSON. No markdown fences, no extra text.`;

    const userPrompt = `The user wants a resume tailored to this description:

"""
${prompt}
"""

Generate a complete resume draft. ${SCHEMA_HINT}`;

    const completion = await openai.chat.completions.create({
      model: "gemini-3.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4000,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "Model returned no content" },
        { status: 502 },
      );
    }

    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON parse failed:", cleaned.slice(0, 400));
      return NextResponse.json(
        { error: "AI returned invalid JSON" },
        { status: 502 },
      );
    }

    const nowId = (prefix: string) =>
      `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

    const rawSections: any[] = Array.isArray(parsed.sections)
      ? parsed.sections
      : [];

    const sections: Section[] = rawSections.map((s) => ({
      ...s,
      id: s.id || nowId(s.type || "section"),
      items: Array.isArray(s.items) ? s.items : [],
    }));

    const hasType = (t: string) => sections.some((s) => s.type === t);
    if (!hasType("experience")) {
      sections.push({
        id: "exp",
        type: "experience",
        title: "Experience",
        items: [],
      } as Section);
    }
    if (!hasType("education")) {
      sections.push({
        id: "edu",
        type: "education",
        title: "Education",
        items: [],
      } as Section);
    }
    if (!hasType("ratedSkills") && !hasType("skills")) {
      sections.push({
        id: "skills",
        type: "ratedSkills",
        title: "Skills",
        items: [],
      } as Section);
    }

    const content: ResumeContent = {
      personalInfo: {
        fullName: parsed.personalInfo?.fullName || "Your Name",
        title: parsed.personalInfo?.title || "Professional",
        email: parsed.personalInfo?.email || "",
        phone: parsed.personalInfo?.phone || "",
        location: parsed.personalInfo?.location || "",
        website: parsed.personalInfo?.website || "",
        summary: parsed.personalInfo?.summary || "",
        photoUrl: undefined,
      },
      sections,
      sectionOrder: sections.map((s) => s.id),
    };

    const title =
      typeof parsed.title === "string" && parsed.title.trim()
        ? parsed.title.trim()
        : content.personalInfo.title || "AI Resume";

    const allowedTemplates = [
      "modern-01",
      "modern-02",
      "modern-03",
      "modern-04",
      "modern-05",
      "modern-06",
      "professional-01",
      "professional-02",
      "professional-03",
      "professional-04",
      "professional-05",
      "ats-01",
      "ats-02",
      "ats-03",
      "ats-04",
      "ats-05",
      "minimal-01",
      "minimal-02",
      "minimal-03",
      "minimal-04",
      "minimal-05",
      "minimal-06",
      "business-01",
      "business-02",
      "business-03",
      "business-04",
      "business-05",
    ];
    const templateId =
      typeof parsed.templateId === "string" &&
      allowedTemplates.includes(parsed.templateId)
        ? parsed.templateId
        : "modern-01";

    return NextResponse.json({
      content,
      theme: DEFAULT_THEME,
      title,
      templateId,
    });
  } catch (error) {
    console.error("AI build-resume error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to build resume",
      },
      { status: 500 },
    );
  }
}