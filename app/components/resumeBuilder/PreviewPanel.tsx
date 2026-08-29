"use client";

import React, { useEffect, useRef, useState } from "react";
import type { ResumeContent, ResumeTheme } from "@/app/types/Content";
import TemplateRenderer from "../templates/Registry";
import { templates } from "../templates/templates";

import {
  Eye,
  Maximize2,
  Download,
  Share2,
  Minimize2,
  FileImage,
  FileText,
  Mail,
  MessageCircle,
  Link as LinkIcon,
  Check,
  Files,
} from "lucide-react";

interface PreviewPanelProps {
  templateId: string;
  theme: ResumeTheme;
  content: ResumeContent;
  onSwitchTemplate: (templateId: string) => void;
}

const PAPER_WIDTH = 794;
const PAPER_HEIGHT = 1123;
const PAGE_GAP = 24;
const CAPTURE_SCALE = 2;

export default function PreviewPanel({ templateId, theme, content, onSwitchTemplate }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureOnlyRef = useRef<HTMLDivElement>(null);
  const fullContentRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [naturalHeight, setNaturalHeight] = useState(PAPER_HEIGHT);

  const template = templates.find((t) => t.id === templateId);

  const pageCount = Math.max(1, Math.ceil(naturalHeight / PAPER_HEIGHT));
  const paddedHeight = pageCount * PAPER_HEIGHT;

  // Measure the true, unclipped content height
  useEffect(() => {
    const el = measureOnlyRef.current;
    if (!el) return;

    const measure = () => {
      const h = el.scrollHeight || el.getBoundingClientRect().height;
      setNaturalHeight(Math.max(PAPER_HEIGHT, Math.ceil(h)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [templateId, theme, content]);

  // Fit-to-width scaling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recalc = () => {
      const padding = isFullscreen ? 24 : 48;
      const availableWidth = el.clientWidth - padding;
      const nextScale = Math.min(availableWidth / PAPER_WIDTH, 1);
      setScale(nextScale > 0 ? nextScale : 1);
    };

    recalc();
    const observer = new ResizeObserver(recalc);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isFullscreen]);

  if (!template) {
    return <div className="pp-empty">Unknown template: {templateId}</div>;
  }

  const zoomLevel = zoom / 100;
  const totalScale = scale * zoomLevel;

  // Capture full canvas for export
  const captureFullCanvas = async (): Promise<HTMLCanvasElement> => {
    const node = fullContentRef.current;
    if (!node) throw new Error("Resume content not ready to capture");

    if (typeof document !== "undefined" && "fonts" in document) {
      try {
        await (document as any).fonts.ready;
      } catch {
        /* no-op */
      }
    }
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));

    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(node, {
      scale: CAPTURE_SCALE,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: PAPER_WIDTH,
      height: node.scrollHeight,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: Math.max(document.documentElement.clientHeight, node.scrollHeight),
    });
    return canvas;
  };

  const sliceCanvasIntoPages = (fullCanvas: HTMLCanvasElement): HTMLCanvasElement[] => {
    const pageHeightPx = PAPER_HEIGHT * CAPTURE_SCALE;
    const pageWidthPx = PAPER_WIDTH * CAPTURE_SCALE;
    const totalPages = Math.max(1, Math.ceil(fullCanvas.height / pageHeightPx));

    const pages: HTMLCanvasElement[] = [];
    for (let i = 0; i < totalPages; i++) {
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = pageWidthPx;
      pageCanvas.height = pageHeightPx;
      const ctx = pageCanvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageWidthPx, pageHeightPx);

      const sourceY = i * pageHeightPx;
      const sourceHeight = Math.min(pageHeightPx, fullCanvas.height - sourceY);

      ctx.drawImage(
        fullCanvas,
        0,
        sourceY,
        pageWidthPx,
        sourceHeight,
        0,
        0,
        pageWidthPx,
        sourceHeight,
      );
      pages.push(pageCanvas);
    }
    return pages;
  };

  const generatePagedPDFBlob = async (): Promise<Blob> => {
    const fullCanvas = await captureFullCanvas();
    const pageCanvases = sliceCanvasIntoPages(fullCanvas);

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [PAPER_WIDTH, PAPER_HEIGHT],
    });

    pageCanvases.forEach((canvas, i) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      if (i > 0) pdf.addPage([PAPER_WIDTH, PAPER_HEIGHT], "portrait");
      pdf.addImage(imgData, "JPEG", 0, 0, PAPER_WIDTH, PAPER_HEIGHT);
    });

    return pdf.output("blob");
  };

  const generatePagedPNGBlobs = async (): Promise<Blob[]> => {
    const fullCanvas = await captureFullCanvas();
    const pageCanvases = sliceCanvasIntoPages(fullCanvas);

    return Promise.all(
      pageCanvases.map(
        (canvas) =>
          new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else reject(new Error("Failed to encode PNG"));
            }, "image/png");
          }),
      ),
    );
  };

  const handleDownloadPNG = async () => {
    setIsLoading(true);
    setShowDownloadMenu(false);
    try {
      const blobs = await generatePagedPNGBlobs();
      blobs.forEach((blob, i) => {
        const link = document.createElement("a");
        link.download =
          blobs.length > 1 ? `resume-${templateId}-page-${i + 1}.png` : `resume-${templateId}.png`;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 2000);
      });
    } catch (error) {
      console.error("Error downloading PNG:", error);
      alert("Failed to download resume as PNG. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    setShowDownloadMenu(false);
    try {
      const blob = await generatePagedPDFBlob();
      const link = document.createElement("a");
      link.download = `resume-${templateId}.pdf`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download resume as PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const shareViaWhatsApp = async () => {
    setShowShareMenu(false);
    try {
      const url = window.location.href;
      const message = `📄 Check out my resume!\n\n${url}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error sharing via WhatsApp:", error);
      alert("Failed to open WhatsApp. Please make sure WhatsApp is installed or try again.");
    }
  };

  const shareViaGmail = async () => {
    setShowShareMenu(false);
    try {
      const url = window.location.href;
      const fullName = content.personalInfo?.fullName || "My";
      const jobTitle = content.personalInfo?.title || "Resume";
      const subject = `${fullName}'s Resume - ${jobTitle}`;
      const body = `Hello,\n\nI wanted to share my resume with you. Please find it at the link below:\n\n${url}\n\nBest regards,\n${fullName}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error sharing via Gmail:", error);
      alert("Failed to open Gmail. Please try again.");
    }
  };

  const shareViaEmailFallback = async () => {
    setShowShareMenu(false);
    try {
      const url = window.location.href;
      const fullName = content.personalInfo?.fullName || "My";
      const jobTitle = content.personalInfo?.title || "Resume";
      const subject = `${fullName}'s Resume - ${jobTitle}`;
      const body = `Hello,\n\nI wanted to share my resume with you. Please find it at the link below:\n\n${url}\n\nBest regards,\n${fullName}`;
      const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(emailUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error sharing via Email:", error);
      alert("Failed to open email client. Please try again.");
    }
  };

  const shareViaLink = async () => {
    setShowShareMenu(false);
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Error copying link:", error);
      alert("Failed to copy link. Please try again.");
    }
  };

  const shareAsPDF = async () => {
    setShowShareMenu(false);
    setIsLoading(true);
    try {
      const blob = await generatePagedPDFBlob();
      const file = new File([blob], `resume-${templateId}.pdf`, { type: "application/pdf" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: "My Resume", files: [file] });
      } else {
        const link = document.createElement("a");
        link.download = `resume-${templateId}.pdf`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
        alert("PDF downloaded! You can now share it manually.");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error sharing PDF:", error);
        alert("Failed to share PDF. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
    setShowDownloadMenu(false);
  };

  const handleDownload = () => {
    setShowDownloadMenu(!showDownloadMenu);
    setShowShareMenu(false);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));
  const resetZoom = () => setZoom(100);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setShowShareMenu(false);
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const stackNaturalHeight = pageCount * PAPER_HEIGHT + (pageCount - 1) * PAGE_GAP;

  // Create a content key that changes when any section data changes
  const contentKey = JSON.stringify(content.sections);

  return (
    <div className={`pp-root ${isFullscreen ? "fullscreen" : ""}`}>
      {/* Toolbar */}
      <div className="pp-toolbar">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-[#64748B]" />
            <span className="text-sm font-medium text-[#0F172A] dark:text-white">Preview</span>
          </div>
          {pageCount > 1 && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EDE9FE] dark:bg-[#4C1D95] text-[#7C3AED] dark:text-[#C4B5FD] text-xs font-medium">
              <Files className="h-3.5 w-3.5" />
              {pageCount} pages
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
            <span>{zoom}%</span>
            <button onClick={zoomOut} className="p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors" title="Zoom Out">
              <span className="text-sm">−</span>
            </button>
            <button onClick={resetZoom} className="px-2 py-0.5 text-xs bg-[#F1F5F9] dark:bg-[#1E293B] rounded hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors" title="Reset Zoom">
              100%
            </button>
            <button onClick={zoomIn} className="p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors" title="Zoom In">
              <span className="text-sm">+</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 relative">
          {/* Download Button */}
          <div className="dropdown-container relative">
            <button
              onClick={handleDownload}
              disabled={isLoading}
              className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              title="Download Resume"
            >
              <Download className={`h-4 w-4 text-[#64748B] ${isLoading ? "animate-pulse" : ""}`} />
              <ChevronDown className="h-3 w-3 text-[#64748B]" />
            </button>

            {showDownloadMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#1E293B] rounded-lg shadow-lg border border-[#E2E8F0] dark:border-[#334155] overflow-hidden z-50">
                <button onClick={handleDownloadPNG} className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-2">
                  <FileImage className="h-4 w-4" />
                  <span>Download as PNG{pageCount > 1 ? ` (${pageCount} files)` : ""}</span>
                </button>
                <button onClick={handleDownloadPDF} className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-2 border-t border-[#E2E8F0] dark:border-[#334155]">
                  <FileText className="h-4 w-4" />
                  <span>Download as PDF{pageCount > 1 ? ` (${pageCount} pages)` : ""}</span>
                </button>
              </div>
            )}
          </div>

          {/* Share Button */}
          <div className="dropdown-container relative">
            <button onClick={handleShare} className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors flex items-center gap-1" title="Share Resume">
              <Share2 className="h-4 w-4 text-[#64748B]" />
              <ChevronDown className="h-3 w-3 text-[#64748B]" />
            </button>

            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1E293B] rounded-lg shadow-lg border border-[#E2E8F0] dark:border-[#334155] overflow-hidden z-50">
                <div className="py-1">
                  <button onClick={shareViaWhatsApp} className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3">
                    <MessageCircle className="h-4 w-4" style={{ color: "#25D366" }} />
                    <span>Share via WhatsApp</span>
                  </button>
                  <button onClick={shareViaGmail} className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3">
                    <Mail className="h-4 w-4" style={{ color: "#EA4335" }} />
                    <span>Share via Gmail</span>
                  </button>
                  <button onClick={shareViaEmailFallback} className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 border-t border-[#E2E8F0] dark:border-[#334155]">
                    <Mail className="h-4 w-4" style={{ color: "#64748B" }} />
                    <span>Email (Default)</span>
                  </button>
                  <button onClick={shareViaLink} className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 border-t border-[#E2E8F0] dark:border-[#334155]">
                    <LinkIcon className="h-4 w-4" style={{ color: "#64748B" }} />
                    <span>Copy Link</span>
                    {copied && <Check className="h-4 w-4 text-green-500 ml-auto" />}
                  </button>
                </div>

                <div className="border-t border-[#E2E8F0] dark:border-[#334155]"></div>

                <button
                  onClick={shareAsPDF}
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className="h-4 w-4 text-[#2563EB]" />
                  <span>Share as PDF{pageCount > 1 ? ` (${pageCount} pages)` : ""}</span>
                  {isLoading && <span className="ml-auto text-xs text-[#64748B]">Generating...</span>}
                </button>
              </div>
            )}
          </div>

          {/* Fullscreen Button */}
          <button onClick={handleFullscreen} className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors" title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            {isFullscreen ? <Minimize2 className="h-4 w-4 text-[#64748B]" /> : <Maximize2 className="h-4 w-4 text-[#64748B]" />}
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="pp-viewport" ref={containerRef}>
        <div
          className="pp-scaled-box"
          style={{
            width: PAPER_WIDTH * totalScale,
            height: stackNaturalHeight * totalScale,
          }}
        >
          <div
            className="pp-pages-stack"
            style={{
              width: PAPER_WIDTH,
              transform: `scale(${totalScale})`,
              transformOrigin: "top left",
              gap: PAGE_GAP,
            }}
          >
            {Array.from({ length: pageCount }).map((_, i) => (
              <div key={i} className="pp-page">
                <div className="pp-page-clip" style={{ width: PAPER_WIDTH, height: PAPER_HEIGHT }}>
                  <div
                    className="pp-page-window"
                    style={{
                      width: PAPER_WIDTH,
                      height: paddedHeight,
                      transform: `translateY(${-i * PAPER_HEIGHT}px)`,
                    }}
                  >
                    <TemplateRenderer
                      key={`${templateId}-${i}-${contentKey}`}
                      templateComponent={template.component}
                      content={content}
                      theme={theme}
                      layoutConfig={template.layoutConfig}
                    />
                  </div>
                </div>
                {pageCount > 1 && (
                  <div className="pp-page-badge">
                    Page {i + 1} of {pageCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden measure hosts */}
      <div className="pp-measure-host" aria-hidden="true">
        <div ref={measureOnlyRef} style={{ width: PAPER_WIDTH, background: "#ffffff" }}>
          <TemplateRenderer
            key={`measure-${templateId}-${contentKey}`}
            templateComponent={template.component}
            content={content}
            theme={theme}
            layoutConfig={template.layoutConfig}
          />
        </div>
      </div>

      <div className="pp-measure-host" aria-hidden="true">
        <div
          ref={fullContentRef}
          style={{ width: PAPER_WIDTH, height: paddedHeight, background: "#ffffff" }}
        >
          <TemplateRenderer
            key={`full-${templateId}-${contentKey}`}
            templateComponent={template.component}
            content={content}
            theme={theme}
            layoutConfig={template.layoutConfig}
          />
        </div>
      </div>

      <style>{`
        .pp-root {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #F1F5F9;
          position: relative;
        }
        .pp-root.fullscreen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #F1F5F9;
        }
        .dark .pp-root {
          background: #0F172A;
        }
        .pp-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          flex-shrink: 0;
          z-index: 10;
        }
        .dark .pp-toolbar {
          background: #1E293B;
          border-bottom: 1px solid #334155;
        }
        .pp-viewport {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          overflow: auto;
          padding: 24px;
          background: #F1F5F9;
        }
        .dark .pp-viewport {
          background: #0F172A;
        }
        .pp-scaled-box {
          position: relative;
          flex-shrink: 0;
        }
        .pp-pages-stack {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          left: 0;
        }
        .pp-page {
          flex-shrink: 0;
          position: relative;
        }
        .pp-page-clip {
          background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        .dark .pp-page-clip {
          background: #1E293B;
        }
        .pp-page-window {
          position: relative;
          overflow: visible;
        }
        .pp-page-badge {
          position: absolute;
          bottom: -22px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          color: #94A3B8;
          white-space: nowrap;
        }
        .pp-measure-host {
          position: fixed;
          top: 0;
          left: -99999px;
          pointer-events: none;
          z-index: -1;
        }
        .pp-empty {
          padding: 40px;
          color: #94A3B8;
          text-align: center;
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 768px) {
          .pp-viewport {
            padding: 12px;
          }
          .pp-toolbar {
            flex-wrap: wrap;
            gap: 8px;
            padding: 8px 12px;
          }
        }
      `}</style>
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}