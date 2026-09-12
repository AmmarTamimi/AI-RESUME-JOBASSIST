// import Anthropic from '@anthropic-ai/sdk';
// import { NextRequest, NextResponse } from 'next/server';

// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

// const SYSTEM_PROMPT = `You are the support assistant embedded in the FAQ page of ResumeAI, an AI-powered resume builder and job-matching web app.

// Only answer questions related to:
// - Using ResumeAI's own features (resumes, templates, AI Insights, Job Match, AI Assistant, Integrations, billing, account settings)
// - General resume writing, job application, and career advice

// If a question is unrelated to resumes, job searching, or ResumeAI, politely say you can only help with resume and job-search related questions, and suggest emailing support@resumeai.app for anything else.

// Keep answers to 2-4 sentences, plain language, no markdown headers or bullet lists. If a question depends on ResumeAI's specific policies (refunds, data retention, pricing details) that you're not certain about, say so honestly and point to support@resumeai.app rather than guessing.`;

// // Basic in-memory rate limit: 5 requests per minute per IP.
// // NOTE: resets on server restart and does not work across multiple
// // serverless instances — fine for early testing, not for production
// // traffic. See the note below the code for a real fix.
// const requestLog = new Map<string, number[]>();
// const RATE_LIMIT = 5;
// const WINDOW_MS = 60_000;

// function isRateLimited(ip: string): boolean {
//   const now = Date.now();
//   const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
//   timestamps.push(now);
//   requestLog.set(ip, timestamps);
//   return timestamps.length > RATE_LIMIT;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const ip = req.headers.get('x-forwarded-for') || 'unknown';
//     if (isRateLimited(ip)) {
//       return NextResponse.json(
//         { error: 'Too many questions. Please wait a moment and try again.' },
//         { status: 429 }
//       );
//     }

//     const { question } = await req.json();

//     if (!question || typeof question !== 'string' || question.trim().length === 0) {
//       return NextResponse.json({ error: 'Please enter a question.' }, { status: 400 });
//     }
//     if (question.length > 500) {
//       return NextResponse.json({ error: 'Question is too long (max 500 characters).' }, { status: 400 });
//     }

//     const response = await anthropic.messages.create({
//       model: 'claude-sonnet-5',
//       max_tokens: 300,
//       system: SYSTEM_PROMPT,
//       messages: [{ role: 'user', content: question.trim() }],
//     });

//     const answer = response.content
//       .filter((block) => block.type === 'text')
//       .map((block) => ('text' in block ? block.text : ''))
//       .join('\n');

//     return NextResponse.json({ answer });
//   } catch (error) {
//     console.error('FAQ assistant error:', error);
//     return NextResponse.json(
//       { error: 'Something went wrong. Please try again or contact support.' },
//       { status: 500 }
//     );
//   }
// }