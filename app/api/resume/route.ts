// import { createClient } from "@/app/lib/supabase/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { userId, template_id, title, theme, content, thumbnail_url } = body;
//     if (!userId || !content) {
//       return NextResponse.json({ error: "data not provided" }, { status: 400 });
//     }
//     const db = await createClient();
//     const { data, error } = await db.from("resumes").insert({
//       user_Id: userId,
//       template_id: template_id,
//       title: title,
//       theme: theme,
//       content: content,
//       thumbnail_url: thumbnail_url,
//     });

//     console.log("resume inserted, ", data);
//     return NextResponse.json(
//       { data, success: true, message: "resume inserted" },
//       { status: 200 },
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "internal error: " + error },
//       { status: 500 },
//     );
//   }
// }

// // export async function GET(req: NextRequest) {
// //   try {
// //     const url = req.url
// //     const user_id = url
// //   } catch (error) {
// //     return NextResponse.json(
// //       { error: "internal error: " + error },
// //       { status: 500 },
// //     );
// //   }
// // }
