// app/api/export-resume/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      html: string;
      format: "pdf" | "png";
      templateId: string;
    };
    
    const { html, format, templateId } = body;

    const puppeteer = await import("puppeteer");
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      await page.setViewport({ 
        width: 794, 
        height: 1123,
        deviceScaleFactor: 2,
      });
      
      await page.setContent(html, { 
        waitUntil: 'networkidle0'
      } as any);
      
      await page.evaluate(() => document.fonts?.ready);
      
      // Wait a bit more for layout to settle
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const height = await page.evaluate(() => {
        const root = document.querySelector('[data-resume-root]') || 
                     document.querySelector('.modern-template') ||
                     document.querySelector('.minimal-template') ||
                     document.querySelector('.prof-tpl') ||
                     document.querySelector('.digital-marketing-template') ||
                     document.querySelector('.modern3') ||
                     document.getElementById('root');
        return root ? root.scrollHeight : 1123;
      });

      const finalHeight = Math.max(height + 40, 1123);

      if (format === "png") {
        const buffer = await page.screenshot({ 
          type: "png", 
          fullPage: true,
          omitBackground: false,
        });
        
        return new NextResponse(Buffer.from(buffer), {
          headers: {
            "Content-Type": "image/png",
            "Content-Disposition": `attachment; filename="resume-${templateId}.png"`,
          },
        });
      }

      const pdfBuffer = await page.pdf({
        printBackground: true,
        width: '794px',
        height: `${finalHeight}px`,
        pageRanges: '1',
      });

      return new NextResponse(Buffer.from(pdfBuffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="resume-${templateId}.pdf"`,
        },
      });
      
    } finally {
      await browser.close();
    }
    
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Export failed" },
      { status: 500 }
    );
  }
}