import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  data: Record<string, unknown>;
  action_url: string | null;
  email_sent: boolean;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Notification;
  schema: "public";
  old_record?: Notification;
}

function emailHtml(n: Notification): string {
  const appUrl = Deno.env.get("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000";
  const actionButton = n.action_url
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;">
        <tr>
          <td style="background:#2563EB;border-radius:8px;">
            <a href="${appUrl}${n.action_url}"
               style="display:inline-block;padding:12px 24px;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;">
              View details
            </a>
          </td>
        </tr>
      </table>`
    : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:40px 20px;">
          <tr>
            <td align="center">
              <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                <tr>
                  <td style="padding:32px;">
                    <h2 style="margin:0 0 12px;color:#0F172A;font-size:20px;font-weight:700;">
                      ${n.title}
                    </h2>
                    <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
                      ${n.body}
                    </p>
                    ${actionButton}
                    <hr style="border:none;border-top:1px solid #E2E8F0;margin:28px 0 16px;">
                    <p style="margin:0;color:#94A3B8;font-size:12px;line-height:1.5;">
                      You're receiving this because you have an account with our Resume Builder.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

Deno.serve(async (req) => {
  // Only accept POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload: WebhookPayload = await req.json();

    // Only act on INSERTs into the notifications table
    if (payload.type !== "INSERT" || payload.table !== "notifications") {
      return new Response(JSON.stringify({ skipped: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    const n = payload.record;

    // Skip if we somehow already sent it
    if (n.email_sent) {
      return new Response(JSON.stringify({ skipped: "already-sent" }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Look up the user's email via the auth admin API
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userRes = await fetch(
      `${supabaseUrl}/auth/v1/admin/users/${n.user_id}`,
      {
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
      },
    );

    if (!userRes.ok) {
      const text = await userRes.text();
      console.error("Failed to fetch user:", text);
      return new Response(JSON.stringify({ error: "user-not-found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    const user = await userRes.json();
    const userEmail: string | undefined = user?.email;

    if (!userEmail) {
      console.error("User has no email", n.user_id);
      return new Response(JSON.stringify({ error: "no-email" }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Send the email
    const { error: sendError } = await resend.emails.send({
      from: "Resume Builder <onboarding@resend.dev>",
      to: [userEmail],
      subject: n.title,
      html: emailHtml(n),
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return new Response(JSON.stringify({ error: sendError }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Mark email_sent = true
    await fetch(
      `${supabaseUrl}/rest/v1/notifications?id=eq.${n.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
        body: JSON.stringify({ email_sent: true }),
      },
    );

    return new Response(
      JSON.stringify({ success: true, to: userEmail }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});