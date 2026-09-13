import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ResumeContent } from "@/app/types/Content";

import { extractText, getDocumentProxy } from "unpdf";

export const runtime = "nodejs";
export const maxDuration = 60;




const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Same shape as your AI feedback schema — reuse the pattern
const CONTENT_SCHEMA = {
  type: "object",
  properties: {
    personalInfo: {
      type: "object",
      properties: {
        fullName: { type: "string" },
        title: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        location: { type: "string" },
        website: { type: "string" },
        summary: { type: "string" },
      },
      required: [
        "fullName",
        "title",
        "email",
        "phone",
        "location",
        "website",
        "summary",
      ],
      additionalProperties: false,
    },
    sectionOrder: { type: "array", items: { type: "string" } },
    sections: { type: "array", items: { type: "object" } }, // loose — see note
  },
  required: ["personalInfo", "sectionOrder", "sections"],
  additionalProperties: false,
} as const;


// ---------------------------------------------------------------------------
// Normalize whatever the LLM returned into our canonical ResumeContent shape.
// ---------------------------------------------------------------------------

function normalizeContent(raw: any): ResumeContent {
  const pi = raw?.personalInfo ?? {};
  const rawSections: any[] = Array.isArray(raw?.sections) ? raw.sections : [];

  // Helper: pull the first non-empty string from a list of candidates
  const str = (...candidates: unknown[]): string => {
    for (const c of candidates) {
      if (typeof c === "string" && c.trim()) return c.trim();
    }
    return "";
  };

  // -- 1. Build the contact section from whatever we can find --
  const existingContact = rawSections.find(
    (s) => s?.id === "contact" || s?.type === "contact",
  );
  const existingContactItems = Array.isArray(existingContact?.items)
    ? existingContact.items
    : [];

  // Pull values, preferring what's already in a contact section (in case
  // the LLM was smart about it) then falling back to personalInfo fields
  const findInContact = (label: string): string => {
    const item = existingContactItems.find(
      (i: any) => String(i?.label ?? "").toLowerCase() === label,
    );
    return str(item?.description);
  };

  const email = str(findInContact("email"), pi.email);
  const phone = str(findInContact("phone"), pi.phone);
  const website = str(findInContact("website"), findInContact("web"), pi.website);
  const location = str(findInContact("location"), pi.location);

  const contactItems = [
    email && { label: "email", description: email },
    phone && { label: "phone", description: phone },
    website && { label: "website", description: website },
    location && { label: "location", description: location },
  ].filter(Boolean) as { label: string; description: string }[];

  // -- 2. Extract and normalize each standard section --
  const findSection = (id: string) =>
    rawSections.find((s) => s?.id === id) ?? null;

  const expSection = findSection("exp");
  const eduSection = findSection("edu");
  const skillsSection = findSection("ratedSkills");
  const refsSection = findSection("references");

  const experience = {
    id: "exp",
    type: "experience" as const,
    title: str(expSection?.title) || "Experience",
    items: Array.isArray(expSection?.items)
      ? expSection.items.map((item: any) => ({
          role: str(item?.role, item?.title, item?.position),
          company: str(item?.company, item?.employer, item?.organization),
          location: str(item?.location, item?.city),
          start: str(item?.start, item?.startDate),
          end: str(item?.end, item?.endDate) || "Present",
          bullets: Array.isArray(item?.bullets)
            ? item.bullets.filter((b: any) => typeof b === "string" && b.trim())
            : [],
        }))
      : [],
  };

  const education = {
    id: "edu",
    type: "education" as const,
    title: str(eduSection?.title) || "Education",
    items: Array.isArray(eduSection?.items)
      ? eduSection.items.map((item: any) => ({
          school: str(item?.school, item?.institution, item?.university),
          degree: str(item?.degree, item?.field, item?.major),
          start: str(item?.start, item?.startDate),
          end: str(item?.end, item?.endDate),
          location: str(item?.location),
        }))
      : [],
  };

  const ratedSkills = {
    id: "ratedSkills",
    type: "ratedSkills" as const,
    title: str(skillsSection?.title) || "Skills",
    items: Array.isArray(skillsSection?.items)
      ? skillsSection.items.map((item: any) => {
          // The LLM might give strings (just skill names) or objects
          if (typeof item === "string") {
            return { name: item.trim(), level: 75 };
          }
          return {
            name: str(item?.name, item?.skill),
            level:
              typeof item?.level === "number"
                ? Math.max(0, Math.min(100, item.level))
                : 75,
          };
        }).filter((s: any) => s.name)
      : [],
  };

  const references = {
    id: "references",
    type: "references" as const,
    title: str(refsSection?.title) || "References",
    items: Array.isArray(refsSection?.items)
      ? refsSection.items.map((item: any) => ({
          name: str(item?.name),
          role: str(item?.role, item?.title),
          phone: str(item?.phone, item?.telephone),
          email: str(item?.email),
          address: str(item?.address, item?.location),
        }))
      : [],
  };

  const contact = {
    id: "contact",
    type: "custom" as const,
    title: "Contact",
    items: contactItems,
  };

  // -- 3. Carry through any non-canonical sections (Languages, Awards, etc.) --
  const canonicalIds = new Set(["contact", "exp", "edu", "ratedSkills", "references"]);
  const extraSections = rawSections.filter(
    (s) => s?.id && !canonicalIds.has(s.id),
  );

  // -- 4. Assemble in canonical order --
  return {
    personalInfo: {
      fullName: str(pi.fullName, pi.name),
      title: str(pi.title, pi.jobTitle, pi.position),
      summary: str(pi.summary, pi.about, pi.bio, pi.objective),
      photoUrl: pi.photoUrl ?? undefined,
    },
    sectionOrder: [
      "contact",
      "exp",
      "edu",
      "ratedSkills",
      ...extraSections.map((s) => s.id),
      "references",
    ],
    sections: [
      contact,
      experience,
      education,
      ratedSkills,
      ...extraSections,
      references,
    ] as ResumeContent["sections"],
  };
}
export async function POST(req: NextRequest) {
 try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      // Use unpdf for PDF extraction
      const pdf = await getDocumentProxy(new Uint8Array(buffer));
      const { text: extractedText } = await extractText(pdf, { mergePages: true });
      text = extractedText;
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    ) {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      text = buffer.toString("utf-8");
    }

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Could not read any text from the file" },
        { status: 400 },
      );
    }

    // 2. Send to the LLM to structure it
    const prompt = `Extract the resume below into structured JSON.

Resume text:
"""
${text.slice(0, 8000)}
"""

Return JSON matching this schema:
{
  "personalInfo": {
    "fullName": string,
    "title": string,
    "summary": string
  },
  "sectionOrder": string[] (order of section ids),
  "sections": [
    { "id": "exp", "type": "experience", "title": "Experience", "items": [
      { "role": string, "company": string, "location": string, "start": string, "end": string, "bullets": string[] }
    ]},
    { "id": "edu", "type": "education", "title": "Education", "items": [
      { "school": string, "degree": string, "start": string, "end": string }
    ]},
    { "id": "ratedSkills", "type": "ratedSkills", "title": "Skills", "items": [
      { "name": string, "level": 80 }
    ]}
      { "id": "contact", "type": "custom", "title": "Contact", "items": [
    { "label": "email", "description": string },
    { "label": "phone", "description": string },
    { "label": "website", "description": string },
    { "label": "location", "description": string }
  ]},
  ]
}

Rules:
- Use "exp", "edu", "ratedSkills" as section ids.
- Preserve the candidate's exact wording where possible.
- If a field is missing, use "".
- Never invent experience or dates.`;

    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-super-120b-a12b:free",
      messages: [
        { role: "system", content: "..." },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "resume_content",
          strict: true,
          schema: CONTENT_SCHEMA,
        },
      },
      provider: { require_parameters: true },
      temperature: 0.1,
      max_tokens: 4000,
    } as any);

   const choice = completion?.choices?.[0];

if (!choice || !choice.message?.content) {
  console.error("Unexpected LLM response:", JSON.stringify(completion, null, 2));
  return NextResponse.json(
    { error: "Model returned an empty response" },
    { status: 502 },
  );
}

if (choice.finish_reason === "length") {
  return NextResponse.json(
    { error: "Response was truncated. Try a shorter resume." },
    { status: 502 },
  );
}



    const raw = choice.message.content ?? "";
    const parsed = JSON.parse(raw);

// Normalize before returning
const content = normalizeContent(parsed);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Import failed",
        // Include stack in dev only
        stack:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 },
    );
  }
}
