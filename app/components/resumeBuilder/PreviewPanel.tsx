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
  ChevronDown,
} from "lucide-react";

interface PreviewPanelProps {
  templateId: string;
  theme: ResumeTheme;
  content: ResumeContent;
  onSwitchTemplate: (templateId: string) => void;
}

const PAPER_WIDTH = 794;
const PAPER_HEIGHT = 1123;
const PAGE_GAP = 24; // visual gap between stacked pages in the preview
const CAPTURE_SCALE = 2; // resolution multiplier used for html2canvas exports

// Breathing room around a page break, applied ONLY to the readable text layer.
// The background/layout layer is never shrunk by these — it always fills the
// full page height regardless.
const PAGE_TEXT_TOP_PADDING = 40; // blank gap above text at the start of every page after the first
const PAGE_TEXT_BOTTOM_PADDING = 40; // minimum blank buffer kept above a break, so a line is never sliced in half

/**
 * Finds safe places to cut the resume into pages so a break never lands in
 * the middle of a line of text (or any other leaf element, like a divider
 * or icon). It walks every text node in the rendered content and reads its
 * actual on-screen line boxes via Range.getClientRects() — each rect is one
 * visual line — then, for every page, picks the last line-boundary at or
 * before the ideal cutoff (leaving `bottomPad` px of buffer) instead of
 * cutting at a raw pixel multiple.
 *
 * Returns an array of Y offsets (in the container's own content coordinates)
 * of length pageCount + 1: breakpoints[0] is always 0, breakpoints[N] is the
 * end of the content, and pageCount = breakpoints.length - 1.
 */
function computeSafeBreakpoints(
  container: HTMLElement,
  pageHeight: number,
  topPad: number,
  bottomPad: number,
  totalHeight: number,
): number[] {
  const containerTop = container.getBoundingClientRect().top;
  const safeBottoms: number[] = [];

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.textContent && node.textContent.trim().length > 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  });
  const range = document.createRange();
  let node: Node | null;
  // eslint-disable-next-line no-cond-assign
  while ((node = walker.nextNode())) {
    range.selectNodeContents(node);
    const rects = range.getClientRects();
    for (let r = 0; r < rects.length; r++) {
      const rect = rects[r];
      if (rect.height > 0) safeBottoms.push(rect.bottom - containerTop);
    }
  }

  // Leaf (childless) elements — icons, dividers, rating bars, images — are
  // also safe break candidates, so those aren't split either.
  container.querySelectorAll("*").forEach((el) => {
    if (el.children.length === 0) {
      const rect = el.getBoundingClientRect();
      if (rect.height > 0) safeBottoms.push(rect.bottom - containerTop);
    }
  });

  safeBottoms.sort((a, b) => a - b);

  const breakpoints: number[] = [0];
  let cursor = 0;
  let guard = 0;

  while (cursor < totalHeight - 1 && guard < 200) {
    guard++;
    const isFirstPage = breakpoints.length === 1;
    const availableThisPage = pageHeight - (isFirstPage ? 0 : topPad);
    const remaining = totalHeight - cursor;

    // If everything left already fits within this page, this IS the last
    // page — stop here instead of hunting for an interior break point.
    // Without this check, a resume that's only, say, half a page long would
    // still get a spurious near-empty "page 2" once a break candidate was
    // found anywhere in the (artificially generous) search window.
    if (remaining <= availableThisPage) {
      breakpoints.push(totalHeight);
      cursor = totalHeight;
      break;
    }

    const idealTarget = cursor + availableThisPage - bottomPad;

    let chosen = -1;
    for (let k = safeBottoms.length - 1; k >= 0; k--) {
      if (safeBottoms[k] <= idealTarget && safeBottoms[k] > cursor) {
        chosen = safeBottoms[k];
        break;
      }
    }
    // Fallback: nothing fit comfortably (e.g. a single block taller than a
    // page) — hard-cut at the raw boundary so pagination still terminates.
    if (chosen === -1 || chosen <= cursor) {
      chosen = Math.min(cursor + availableThisPage, totalHeight);
    }

    if (chosen >= totalHeight) {
      breakpoints.push(totalHeight);
      cursor = totalHeight;
      break;
    }
    breakpoints.push(chosen);
    cursor = chosen;
  }

  if (breakpoints[breakpoints.length - 1] < totalHeight) {
    breakpoints.push(totalHeight);
  }

  return breakpoints;
}

export default function PreviewPanel({ templateId, theme, content, onSwitchTemplate }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Pure measurement mount: renders the resume at its natural, unconstrained
  // height so we can find out exactly how tall the real content is, and where
  // the safe page-break points are. Never padded/stretched.
  const measureOnlyRef = useRef<HTMLDivElement>(null);
  // Foreground capture mount: the REAL, readable resume, stretched to a full
  // page-multiple height. Used to capture the text layer for PDF/PNG export.
  const fullContentRef = useRef<HTMLDivElement>(null);
  // Background capture mount: same resume, but with all text made invisible
  // via CSS. Used to capture a "layout only" layer for PDF/PNG export — this
  // is what lets a page's background/sidebar fill the whole page even when
  // the actual text stops early.
  const bgOnlyContentRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [naturalHeight, setNaturalHeight] = useState(PAPER_HEIGHT);
  const [pageBreaks, setPageBreaks] = useState<number[]>([0, PAPER_HEIGHT]);

  const template = templates.find((t) => t.id === templateId);

  // pageBreaks has length pageCount + 1: [0, breakY1, breakY2, ..., totalHeight]
  const pageCount = Math.max(1, pageBreaks.length - 1);
  // Every rendered/exported page's underlying content is stretched to a full
  // page-multiple height — this is what makes full-height template styling
  // (sidebars, background fills) work correctly on every page, including a
  // trailing partial one.
  const paddedHeight = pageCount * PAPER_HEIGHT;

  // Create a content key that changes when any section data changes, so the
  // hidden/visible render mounts refresh in lockstep with the editor.
  const contentKey = JSON.stringify(content.sections);

  // ---- Measure natural content height and compute safe page-break points ----
  useEffect(() => {
    const el = measureOnlyRef.current;
    if (!el) return;

    const recompute = () => {
      const h = el.scrollHeight || el.getBoundingClientRect().height;
      // Use the resume's TRUE height here — no artificial "at least one full
      // page" floor. Padding that up to PAPER_HEIGHT was what caused a
      // short, single-page resume to get a spurious, near-empty page 2 (the
      // break-search loop kept hunting for a split all the way up to that
      // padded minimum, even when there was no real content left to place).
      const totalHeight = Math.max(1, Math.ceil(h));
      setNaturalHeight(totalHeight);
      setPageBreaks(
        computeSafeBreakpoints(el, PAPER_HEIGHT, PAGE_TEXT_TOP_PADDING, PAGE_TEXT_BOTTOM_PADDING, totalHeight),
      );
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId, theme, content]);

  // ---- Fit-to-viewport scaling ----
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recalc = () => {
      const padding = isFullscreen ? 24 : 48;
      const availableWidth = el.clientWidth - padding;
      const availableHeight = el.clientHeight - padding;

      if (pageCount === 1) {
        const scaleX = availableWidth / PAPER_WIDTH;
        const scaleY = availableHeight / PAPER_HEIGHT;
        const nextScale = Math.min(scaleX, scaleY, 1);
        setScale(nextScale > 0 ? nextScale : 1);
      } else {
        const scaleX = availableWidth / PAPER_WIDTH;
        const scaleY = availableHeight / PAPER_HEIGHT;
        const nextScale = Math.min(scaleX, scaleY, 1.2);
        setScale(nextScale > 0 ? nextScale : 1);
      }
    };

    recalc();
    const observer = new ResizeObserver(recalc);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isFullscreen, pageCount]);

  if (!template) {
    return <div className="pp-empty">Unknown template: {templateId}</div>;
  }

  const zoomLevel = zoom / 100;
  const totalScale = scale * zoomLevel;

  // ---------------------------------------------------------------------------
  // CAPTURE: render the full (unclipped) resume once as a single tall canvas —
  // once for the real text (fullContentRef) and once with text hidden
  // (bgOnlyContentRef) — then slice both into page-height chunks and composite
  // them together per page. This guarantees PDF / PNG pages line up exactly
  // with what's shown in the preview.
  // ---------------------------------------------------------------------------
  const captureNode = async (node: HTMLElement): Promise<HTMLCanvasElement> => {
    if (typeof document !== "undefined" && "fonts" in document) {
      try {
        await (document as any).fonts.ready;
      } catch {
        /* no-op: not all browsers implement this fully */
      }
    }
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));

    const html2canvas = (await import("html2canvas")).default;
    return html2canvas(node, {
      scale: CAPTURE_SCALE,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: PAPER_WIDTH,
      height: node.scrollHeight,
      // Use the real browser viewport size (not PAPER_WIDTH) so responsive
      // CSS/media queries resolve exactly as they do in the live preview.
      windowWidth: document.documentElement.clientWidth,
      windowHeight: Math.max(document.documentElement.clientHeight, node.scrollHeight),
    });
  };

  const captureFullCanvas = (): Promise<HTMLCanvasElement> => {
    const node = fullContentRef.current;
    if (!node) throw new Error("Resume content not ready to capture");
    return captureNode(node);
  };

  const captureBgOnlyCanvas = (): Promise<HTMLCanvasElement> => {
    const node = bgOnlyContentRef.current;
    if (!node) throw new Error("Resume background layer not ready to capture");
    return captureNode(node);
  };

  // Composite the two captured canvases into one canvas per page: the
  // background (text-hidden) layer fills the ENTIRE remaining page height,
  // and the real text is drawn on top of it, clipped to exactly this page's
  // slice — mirroring the two-layer structure used in the live preview.
  const sliceCanvasIntoPages = (fgCanvas: HTMLCanvasElement, bgCanvas: HTMLCanvasElement): HTMLCanvasElement[] => {
    const pageWidthPx = PAPER_WIDTH * CAPTURE_SCALE;
    const pageHeightPx = PAPER_HEIGHT * CAPTURE_SCALE;
    const topPadPx = PAGE_TEXT_TOP_PADDING * CAPTURE_SCALE;
    const breaksPx = pageBreaks.map((b) => b * CAPTURE_SCALE);
    const totalPages = Math.max(1, breaksPx.length - 1);

    const pages: HTMLCanvasElement[] = [];
    for (let i = 0; i < totalPages; i++) {
      const topPad = i > 0 ? topPadPx : 0;
      const availableBoxPx = pageHeightPx - topPad;

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = pageWidthPx;
      pageCanvas.height = pageHeightPx;
      const ctx = pageCanvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageWidthPx, pageHeightPx);

      const sourceY = breaksPx[i];

      // 1) Background/layout layer — fills the whole remaining page height.
      const bgSourceHeight = Math.max(0, Math.min(availableBoxPx, bgCanvas.height - sourceY));
      if (bgSourceHeight > 0) {
        ctx.drawImage(bgCanvas, 0, sourceY, pageWidthPx, bgSourceHeight, 0, topPad, pageWidthPx, bgSourceHeight);
      }

      // 2) Real text layer — drawn on top, clipped to exactly this page's slice.
      const fgSourceHeight = Math.max(0, Math.min(breaksPx[i + 1] - breaksPx[i], fgCanvas.height - sourceY));
      if (fgSourceHeight > 0) {
        ctx.drawImage(fgCanvas, 0, sourceY, pageWidthPx, fgSourceHeight, 0, topPad, pageWidthPx, fgSourceHeight);
      }

      pages.push(pageCanvas);
    }
    return pages;
  };

  const generatePagedPDFBlob = async (): Promise<Blob> => {
    const [fgCanvas, bgCanvas] = await Promise.all([captureFullCanvas(), captureBgOnlyCanvas()]);
    const pageCanvases = sliceCanvasIntoPages(fgCanvas, bgCanvas);

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
    const [fgCanvas, bgCanvas] = await Promise.all([captureFullCanvas(), captureBgOnlyCanvas()]);
    const pageCanvases = sliceCanvasIntoPages(fgCanvas, bgCanvas);

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
        link.download = blobs.length > 1 ? `resume-${templateId}-page-${i + 1}.png` : `resume-${templateId}.png`;
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
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all duration-200 shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed group"
              title="Download Resume"
            >
              <Download className={`h-4 w-4 ${isLoading ? "animate-pulse" : "group-hover:scale-110 transition-transform"}`} />
              <span>Download</span>
              <ChevronDown className="h-3.5 w-3.5 ml-0.5 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            {showDownloadMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#1E293B] rounded-lg shadow-lg border border-[#E2E8F0] dark:border-[#334155] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={handleDownloadPNG}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                    <FileImage className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] dark:text-white">PNG Image</p>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{pageCount > 1 ? `${pageCount} files` : "Single image"}</p>
                  </div>
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 group border-t border-[#E2E8F0] dark:border-[#334155]"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                    <FileText className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] dark:text-white">PDF Document</p>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{pageCount > 1 ? `${pageCount} pages` : "Single page"}</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Share Button */}
          <div className="dropdown-container relative">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0F172A] dark:text-white bg-[#F1F5F9] dark:bg-[#1E293B] hover:bg-[#E2E8F0] dark:hover:bg-[#334155] rounded-lg transition-all duration-200 border border-[#E2E8F0] dark:border-[#334155] group"
              title="Share Resume"
            >
              <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Share</span>
              <ChevronDown className="h-3.5 w-3.5 ml-0.5 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1E293B] rounded-lg shadow-lg border border-[#E2E8F0] dark:border-[#334155] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-1">
                  <button
                    onClick={shareViaWhatsApp}
                    className="w-full px-3 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 rounded-lg group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#0F172A] dark:text-white">WhatsApp</p>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Share via WhatsApp</p>
                    </div>
                  </button>

                  <button
                    onClick={shareViaGmail}
                    className="w-full px-3 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 rounded-lg group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EA4335]/10 flex items-center justify-center group-hover:bg-[#EA4335]/20 transition-colors">
                      <Mail className="h-4 w-4 text-[#EA4335]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#0F172A] dark:text-white">Gmail</p>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Share via Gmail</p>
                    </div>
                  </button>

                  <button
                    onClick={shareViaEmailFallback}
                    className="w-full px-3 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 rounded-lg group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#64748B]/10 flex items-center justify-center group-hover:bg-[#64748B]/20 transition-colors">
                      <Mail className="h-4 w-4 text-[#64748B]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#0F172A] dark:text-white">Email</p>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Default email client</p>
                    </div>
                  </button>

                  <button
                    onClick={shareViaLink}
                    className="w-full px-3 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 rounded-lg group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                      <LinkIcon className="h-4 w-4 text-[#8B5CF6]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#0F172A] dark:text-white">Copy Link</p>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Copy resume link</p>
                    </div>
                    {copied && <Check className="h-4 w-4 text-green-500" />}
                  </button>
                </div>

                <div className="border-t border-[#E2E8F0] dark:border-[#334155] p-1">
                  <button
                    onClick={shareAsPDF}
                    disabled={isLoading}
                    className="w-full px-3 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 rounded-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center group-hover:bg-[#2563EB]/20 transition-colors">
                      <FileText className="h-4 w-4 text-[#2563EB]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#0F172A] dark:text-white">Share as PDF</p>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{pageCount > 1 ? `${pageCount} pages` : "Single page"}</p>
                    </div>
                    {isLoading && <div className="w-4 h-4 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            className="inline-flex items-center justify-center p-2 text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] rounded-lg transition-all duration-200 border border-[#E2E8F0] dark:border-[#334155] hover:border-[#8B5CF6] dark:hover:border-[#8B5CF6] group"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
            ) : (
              <Maximize2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className={`pp-viewport ${pageCount > 1 ? "pp-viewport-multi" : ""}`} ref={containerRef}>
        <div
          className="pp-scaled-box"
          style={{
            width: PAPER_WIDTH * totalScale,
            height: pageCount === 1 ? PAPER_HEIGHT * totalScale : stackNaturalHeight * totalScale,
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
            {Array.from({ length: pageCount }).map((_, i) => {
              const sliceTop = pageBreaks[i];
              const sliceBottom = pageBreaks[i + 1] ?? naturalHeight;
              const topPad = i > 0 ? PAGE_TEXT_TOP_PADDING : 0;
              // Full remaining height for this page, after the top padding gap.
              // The BACKGROUND layer uses this — it always fills the whole page.
              const availableBox = PAPER_HEIGHT - topPad;
              // Exact amount of real text that belongs on this page — the
              // TEXT layer is clipped to this, and nothing more, so it never
              // repeats the next page's content.
              const sliceHeight = Math.max(0, Math.min(sliceBottom - sliceTop, availableBox));

              return (
                <div key={i} className="pp-page">
                  <div className="pp-page-clip" style={{ width: PAPER_WIDTH, height: PAPER_HEIGHT }}>
                    {/* Layer 1 — background/layout only (text invisible). Fills
                        the entire remaining page height so sidebars, colored
                        panels, etc. always look like a complete, full page. */}
                    <div
                      className="pp-page-window-mask"
                      style={{ top: topPad, width: PAPER_WIDTH, height: availableBox }}
                    >
                      <div
                        className="pp-text-hidden"
                        style={{
                          width: PAPER_WIDTH,
                          height: paddedHeight,
                          transform: `translateY(-${sliceTop}px)`,
                        }}
                      >
                        <TemplateRenderer
                          key={`bg-${templateId}-${i}-${contentKey}`}
                          templateComponent={template.component}
                          content={content}
                          theme={theme}
                          layoutConfig={template.layoutConfig}
                        />
                      </div>
                    </div>

                    {/* Layer 2 — the real, readable text. Clipped to exactly
                        this page's slice (with padding already reserved by
                        the safe-break calculation), drawn on top of Layer 1. */}
                    <div
                      className="pp-page-window-mask"
                      style={{ top: topPad, width: PAPER_WIDTH, height: sliceHeight }}
                    >
                      <div
                        className="pp-page-window"
                        style={{
                          width: PAPER_WIDTH,
                          height: paddedHeight,
                          transform: `translateY(-${sliceTop}px)`,
                        }}
                      >
                        <TemplateRenderer
                          key={`fg-${templateId}-${i}-${contentKey}`}
                          templateComponent={template.component}
                          content={content}
                          theme={theme}
                          layoutConfig={template.layoutConfig}
                        />
                      </div>
                    </div>
                  </div>
                  {pageCount > 1 && (
                    <div className="pp-page-badge">
                      Page {i + 1} of {pageCount}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hidden, unconstrained render used ONLY to measure the resume's true
          natural content height and safe break points. Never padded/stretched. */}
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

      {/* Hidden render used for the real-text (foreground) PDF/PNG capture. */}
      <div className="pp-measure-host" aria-hidden="true">
        <div ref={fullContentRef} style={{ width: PAPER_WIDTH, height: paddedHeight, background: "#ffffff" }}>
          <TemplateRenderer
            key={`full-${templateId}-${contentKey}`}
            templateComponent={template.component}
            content={content}
            theme={theme}
            layoutConfig={template.layoutConfig}
          />
        </div>
      </div>

      {/* Hidden render used for the background-only (text-hidden) PDF/PNG capture. */}
      <div className="pp-measure-host" aria-hidden="true">
        <div
          ref={bgOnlyContentRef}
          className="pp-text-hidden"
          style={{ width: PAPER_WIDTH, height: paddedHeight, background: "#ffffff" }}
        >
          <TemplateRenderer
            key={`bgcapture-${templateId}-${contentKey}`}
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
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 24px;
          background: #F1F5F9;
        }
        .pp-viewport.pp-viewport-multi {
          align-items: flex-start;
          overflow-y: auto;
          padding: 24px;
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
        .pp-page-window-mask {
          position: absolute;
          left: 0;
          overflow: hidden;
        }
        .pp-page-window {
          position: relative;
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
        /* Makes all text invisible while leaving backgrounds, borders, and
           images intact — used for the "layout only" background layer so it
           can safely be shown at full page height without duplicating any
           readable text. */
        .pp-text-hidden,
        .pp-text-hidden * {
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
          text-shadow: none !important;
          caret-color: transparent !important;
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

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeIn 0.2s ease-out forwards;
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
          .pp-toolbar .dropdown-container .inline-flex {
            padding: 6px 12px;
            font-size: 12px;
          }
          .pp-toolbar .dropdown-container .inline-flex span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
