import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

type GenerationType = "summary" | "experience" | "achievement";

interface GenerateExperienceParams {
  role: string;
  company: string;
  location?: string;
  start?: string;
  end?: string;
  userContext?: string;
  existingDescription?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return Response.json(
        {
          success: false,
          error: "type and data are required",
        },
        { status: 400 }
      );
    }

    // System prompt to prevent thinking process
    const systemPrompt = `You are an expert professional resume writer. 
CRITICAL INSTRUCTIONS:
- Return ONLY the generated content.
- Do NOT include any thinking process, reasoning, or explanations.
- Do NOT include any prefix like "Here's a thinking process:" or "Let me analyze".
- Return ONLY the final polished content.
- Keep it concise and professional.`;

    let userPrompt = "";

    switch (type) {
      case "summary": {
        const { personalInfo, sections } = data;
        userPrompt = `
Generate a concise, professional resume summary based ONLY on the resume information provided below.

Requirements:
- Write 3-4 sentences.
- Use a professional and confident tone.
- Make it ATS-friendly.
- Highlight the candidate's most relevant skills, experience, and strengths.
- Do NOT invent skills, experience, companies, achievements, or metrics.
- Do NOT use first person ("I", "my", "me").
- Return ONLY the summary.

Here is the user's resume data:

${JSON.stringify({ personalInfo, sections }, null, 2)}
`;
        break;
      }

      case "experience": {
        const { role, company, location, start, end, userContext, existingDescription } = data as GenerateExperienceParams;
        
        const contextInfo = userContext 
          ? `\nAdditional context from user: "${userContext}"` 
          : "";
        
        const existingInfo = existingDescription
          ? `\nExisting description:\n${existingDescription}`
          : "";

        userPrompt = `
Generate a professional, well-written paragraph describing the following job experience.

Role: ${role || "Unknown Role"}
Company: ${company || "Unknown Company"}${location ? `, ${location}` : ""}${start || end ? `\nDate: ${start || ""}${start && end ? " - " : ""}${end || ""}` : ""}
${contextInfo}
${existingInfo}

Requirements:
- Write a cohesive, flowing paragraph (3-5 sentences).
- Describe responsibilities, contributions, and achievements.
- Use professional, confident language.
- Make it ATS-friendly and impactful.
- Use specific metrics ONLY if they are provided.
- Do NOT invent achievements, numbers, or technologies.
- Do NOT use first person.
- Return ONLY the paragraph, no bullet points or formatting.
- If user provided context, incorporate it naturally.
- If an existing description is provided, improve upon it.

Generate a professional experience paragraph:`;
        break;
      }

      case "achievement": {
        const { title, existingDescription, userContext } = data;
        
        const contextInfo = userContext 
          ? `\nAdditional context from user: "${userContext}"` 
          : "";
        
        userPrompt = `
Write a concise, professional paragraph describing the following achievement.

Achievement Title: ${title || "Unnamed Achievement"}
${existingDescription ? `\nExisting Description: ${existingDescription}` : ""}
${contextInfo}

Requirements:
- Write a clear, concise paragraph (1-2 sentences).
- Describe the achievement, outcome, recognition, or impact.
- Use strong and professional language.
- Keep it concise and ATS-friendly.
- Use metrics ONLY if explicitly provided.
- Do NOT invent awards, rankings, numbers, or results.
- Return ONLY the paragraph, no bullet points or formatting.
- If user provided context, incorporate it naturally.
- If an existing description is provided, improve upon it.

Write a professional achievement description:`;
        break;
      }

      default:
        return Response.json(
          {
            success: false,
            error: `Unsupported generation type: ${type}`,
          },
          { status: 400 }
        );
    }

    const completion = await openai.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    let result = completion.choices[0]?.message?.content;

    if (!result) {
      return Response.json(
      {
        success: false,
        error: "No content generated",
      },
      { status: 400 }
    );
    }

    // Clean up any remaining thinking process markers just in case
    result = result
      .replace(/^Here('s| is) (a )?thinking process:?/i, "")
      .replace(/^Let me (analyze|think about|consider|break down)/i, "")
      .replace(/^I('ll| will) (generate|write|create|provide)/i, "")
      .trim();

    // If the result starts with a numbered list or bullet, clean it up
    result = result.replace(/^[\d\s]+\.\s*/, "").trim();

    return Response.json({
      success: true,
      type,
      result: result.trim(),
      model: completion.model,
    });
  } catch (error) {
    console.error("AI generation error:", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "AI generation failed",
      },
      { status: 500 }
    );
  }
}