// import { createClient } from '../../lib/supabase/server';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const { to_email, from_name, message, resume_url, resume_name } = await request.json();

//     // Validate required fields
//     if (!to_email) {
//       return NextResponse.json(
//         { error: 'Email address is required' },
//         { status: 400 }
//       );
//     }

//     const supabase = await createClient();

//     // Option 1: Store in database
//     const { error: dbError } = await supabase.from('email_logs').insert({
//       to_email,
//       from_name: from_name || 'Anonymous',
//       message: message || `Check out my resume: ${resume_url}`,
//       resume_url,
//       resume_name,
//       sent_at: new Date().toISOString(),
//     });

//     if (dbError) throw dbError;

//     // Option 2: Send actual email using a service (Brevo, Resend, etc.)
//     // You can add email sending logic here
//     // For example, using Resend:
//     /*
//     const resend = new Resend(process.env.RESEND_API_KEY);
//     await resend.emails.send({
//       from: 'ResumeAI <noreply@resumeai.app>',
//       to: to_email,
//       subject: `${from_name || 'Someone'} shared a resume with you`,
//       html: `
//         <h1>Resume Shared</h1>
//         <p>${from_name || 'Someone'} has shared their resume with you.</p>
//         <p>${message || ''}</p>
//         <p>View the resume here: <a href="${resume_url}">${resume_name}</a></p>
//       `,
//     });
//     */

//     return NextResponse.json({
//       success: true,
//       message: 'Email sent successfully',
//     });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json(
//       { error: 'Failed to send email' },
//       { status: 500 }
//     );
//   }
// }