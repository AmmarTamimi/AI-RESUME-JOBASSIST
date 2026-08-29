// app/api/export-resume/route.ts
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import TemplateRenderer from "@/app/components/templates/Registry";
import type { ResumeContent, ResumeTheme } from "@/app/types/Content";

export const runtime = "nodejs";
export const maxDuration = 30;

const PAPER_WIDTH = 794;
const MIN_HEIGHT = 1123;

function buildGoogleFontsHref(theme: ResumeTheme): string | null {
  const families = Array.from(
    new Set([theme.headingFont, theme.bodyFont].filter(Boolean))
  ) as string[];
  if (families.length === 0) return null;
  const query = families
    .map(
      (f) =>
        `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@300;400;500;600;700;800`
    )
    .join("&");
  return `https://fonts.googleapis.com/css2?${query}&display=swap`;
}

async function launchBrowser() {
  const puppeteer = await import("puppeteer");
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

export async function POST(req: NextRequest) {
  let browser: Awaited<ReturnType<typeof launchBrowser>> | null = null;

  try {
    const { templateComponent, theme, content, format } = (await req.json()) as {
      templateComponent: string;
      theme: ResumeTheme;
      content: ResumeContent;
      format: "pdf" | "png";
    };

    if (!templateComponent || !theme || !content || !format) {
      return NextResponse.json(
        { error: "Missing templateComponent, theme, content, or format" },
        { status: 400 }
      );
    }

    // Render the EXACT same component tree the live preview uses.
    // No DOM scraping, no guessed CSS overrides — this is the real thing.
    const { renderToStaticMarkup } = await import("react-dom/server");
    const markup = renderToStaticMarkup(
      React.createElement(TemplateRenderer, {
        templateComponent,
        content,
        theme,
      })
    );

    const origin = req.nextUrl.origin;
    const fontsHref = buildGoogleFontsHref(theme);

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<base href="${origin}/" />
${fontsHref ? `<link rel="stylesheet" href="${fontsHref}" />` : ""}
<style>
  html, body { margin:0; padding:0; background:#ffffff; }
  * { box-sizing: border-box; }
</style>
</head>
<body>
${markup}
</body>
</html>`;

   browser = await launchBrowser();
const page = await browser.newPage();

await page.setViewport({ width: PAPER_WIDTH, height: MIN_HEIGHT, deviceScaleFactor: 2 });

await page.setContent(html, { waitUntil: "load" });

await page.evaluate(() => document.fonts.ready);

await page.evaluate(async () => {
  const images = Array.from(document.images);
  await Promise.all(
    images
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve());
            img.addEventListener("error", () => resolve());
          })
      )
  );
});

await page
  .waitForNetworkIdle({ idleTime: 300, timeout: 5000 })
  .catch(() => {});

await page.emulateMediaType("screen");

    const height = await page.evaluate(() => {
      const root = document.querySelector("[data-resume-root]");
      return root ? Math.ceil(root.getBoundingClientRect().height) : document.body.scrollHeight;
    });
    const finalHeight = Math.max(height, MIN_HEIGHT);

    if (format === "png") {
      // Resize to the real content height first so nothing below the fold
      // gets clipped — this fixes the "skips the bottom of longer resumes" bug.
      await page.setViewport({ width: PAPER_WIDTH, height: finalHeight, deviceScaleFactor: 2 });
      const buffer = await page.screenshot({ type: "png", fullPage: true });
      return new NextResponse(Buffer.from(buffer), {
        headers: {
          "Content-Type": "image/png",
          "Content-Disposition": `attachment; filename="resume.png"`,
        },
      });
    }

    const pdfBuffer = await page.pdf({
      printBackground: true,
      width: `${PAPER_WIDTH}px`,
      height: `${finalHeight}px`, // one continuous page sized to real content
    });

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume.pdf"`,
      },
    });
  } catch (err) {
    console.error("Export error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Export failed" },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}