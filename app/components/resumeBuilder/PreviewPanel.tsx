"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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
  X,
  Printer,
  Send,
  User,
  AtSign,
  Loader2,
} from "lucide-react";
import {
  FaWhatsapp,
  FaLinkedinIn,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

interface PreviewPanelProps {
  templateId: string;
  theme: ResumeTheme;
  content: ResumeContent;
  onSwitchTemplate: (templateId: string) => void;
}

const PAPER_WIDTH = 794;
const MIN_PAPER_HEIGHT = 1123;

// Share options with icons
const SHARE_OPTIONS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: FaWhatsapp,
    color: "#25D366",
    bgColor: "#25D36610",
  },
  {
    id: "gmail",
    label: "Gmail",
    icon: SiGmail,
    color: "#EA4335",
    bgColor: "#EA433510",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedinIn,
    color: "#0A66C2",
    bgColor: "#0A66C210",
  },
  {
    id: "twitter",
    label: "Twitter",
    icon: FaTwitter,
    color: "#1DA1F2",
    bgColor: "#1DA1F210",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: FaFacebook,
    color: "#1877F2",
    bgColor: "#1877F210",
  },
  {
    id: "link",
    label: "Copy Link",
    icon: LinkIcon,
    color: "#64748B",
    bgColor: "#64748B10",
  },
];

export default function PreviewPanel({
  templateId,
  theme,
  content,
  onSwitchTemplate,
}: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [paperHeight, setPaperHeight] = useState(MIN_PAPER_HEIGHT);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareName, setShareName] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isMeasuring, setIsMeasuring] = useState(false);

  const template = templates.find((t) => t.id === templateId);

  // Measure actual template height
  const measureHeight = useCallback(() => {
    if (isMeasuring || !paperRef.current) return;

    setIsMeasuring(true);

    requestAnimationFrame(() => {
      if (paperRef.current) {
        // Find the actual template element inside the paper
        const templateElement =
          paperRef.current.querySelector("[data-resume-root]");

        if (templateElement) {
          // Get the actual content height
          const actualHeight = templateElement.scrollHeight;

          // Add small padding for safety (20px top + 20px bottom)
          const newHeight = Math.max(actualHeight + 40, MIN_PAPER_HEIGHT);

          // Only update if height changed significantly
          setPaperHeight((prev) => {
            const diff = Math.abs(prev - newHeight);
            if (diff > 5) {
              return newHeight;
            }
            return prev;
          });
        }
      }

      setIsMeasuring(false);
    });
  }, [isMeasuring]);

  // Measure when content or template changes
  useEffect(() => {
    const timer = setTimeout(measureHeight, 200);
    return () => clearTimeout(timer);
  }, [content, templateId, measureHeight]);

  // Calculate scale - centered alignment
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recalc = () => {
      const padding = isFullscreen ? 24 : 48;
      const availableWidth = el.clientWidth - padding;
      const availableHeight = el.clientHeight - padding;

      const scaleX = availableWidth / PAPER_WIDTH;
      const scaleY = availableHeight / paperHeight;

      const maxScale = 1.2;
      const nextScale = Math.min(scaleX, scaleY, maxScale);
      setScale(Math.max(nextScale, 0.3));
    };

    recalc();
    const observer = new ResizeObserver(recalc);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isFullscreen, paperHeight]);

  // Re-measure when zoom changes (to ensure height stays correct)
  useEffect(() => {
    const timer = setTimeout(measureHeight, 100);
    return () => clearTimeout(timer);
  }, [zoom, measureHeight]);

  if (!template) {
    return <div className="pp-empty">Unknown template: {templateId}</div>;
  }

  const zoomLevel = zoom / 100;
  const totalScale = scale * zoomLevel;

  // Generate PDF with proper alignment
  const generatePDF = async (): Promise<Blob> => {
    const paperElement = paperRef.current;
    if (!paperElement) throw new Error("Paper element not found");

    // Get the actual rendered height
    const templateElement = paperElement.querySelector(
      ".modern-template, .minimal-template, .figmaResume",
    );

    const actualHeight = templateElement
      ? templateElement.scrollHeight
      : MIN_PAPER_HEIGHT;
    const pageHeight = Math.max(actualHeight + 40, MIN_PAPER_HEIGHT);

    // Create a temporary container
    const captureContainer = document.createElement("div");
    captureContainer.style.position = "fixed";
    captureContainer.style.left = "-9999px";
    captureContainer.style.top = "0";
    captureContainer.style.width = PAPER_WIDTH + "px";
    captureContainer.style.height = pageHeight + "px";
    captureContainer.style.background = "#ffffff";
    captureContainer.style.zIndex = "-9999";
    captureContainer.style.overflow = "visible";
    document.body.appendChild(captureContainer);

    const clone = paperElement.cloneNode(true) as HTMLElement;
    clone.style.transform = "none";
    clone.style.width = PAPER_WIDTH + "px";
    clone.style.height = pageHeight + "px";
    clone.style.position = "relative";
    clone.style.left = "0";
    clone.style.top = "0";
    clone.style.margin = "0";
    clone.style.transformOrigin = "top left";
    clone.style.overflow = "visible";

    captureContainer.appendChild(clone);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(captureContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: PAPER_WIDTH,
      height: pageHeight,
    });

    document.body.removeChild(captureContainer);

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const { jsPDF } = await import("jspdf");

    const pdfHeight = 1123;
    const totalPages = Math.ceil(pageHeight / pdfHeight);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }

      const yOffset = page * pdfHeight;
      const pageImageData = canvas.toDataURL("image/jpeg", 1.0);

      if (totalPages === 1) {
        pdf.addImage(
          pageImageData,
          "JPEG",
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight(),
        );
      } else {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = PAPER_WIDTH;
        tempCanvas.height = Math.min(pdfHeight, pageHeight - yOffset);
        const ctx = tempCanvas.getContext("2d");
        ctx?.drawImage(
          canvas,
          0,
          yOffset,
          PAPER_WIDTH,
          tempCanvas.height,
          0,
          0,
          PAPER_WIDTH,
          tempCanvas.height,
        );

        const croppedData = tempCanvas.toDataURL("image/jpeg", 1.0);
        pdf.addImage(
          croppedData,
          "JPEG",
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight(),
        );
      }
    }

    return pdf.output("blob");
  };

  // Generate PNG
  const generatePNG = async (): Promise<Blob> => {
    const paperElement = paperRef.current;
    if (!paperElement) throw new Error("Paper element not found");

    const templateElement = paperElement.querySelector(
      ".modern-template, .minimal-template, .figmaResume",
    );

    const actualHeight = templateElement
      ? templateElement.scrollHeight
      : MIN_PAPER_HEIGHT;
    const pageHeight = Math.max(actualHeight + 40, MIN_PAPER_HEIGHT);

    const captureContainer = document.createElement("div");
    captureContainer.style.position = "fixed";
    captureContainer.style.left = "-9999px";
    captureContainer.style.top = "0";
    captureContainer.style.width = PAPER_WIDTH + "px";
    captureContainer.style.height = pageHeight + "px";
    captureContainer.style.background = "#ffffff";
    captureContainer.style.zIndex = "-9999";
    document.body.appendChild(captureContainer);

    const clone = paperElement.cloneNode(true) as HTMLElement;
    clone.style.transform = "none";
    clone.style.width = PAPER_WIDTH + "px";
    clone.style.height = pageHeight + "px";
    clone.style.position = "relative";
    clone.style.left = "0";
    clone.style.top = "0";
    clone.style.margin = "0";
    clone.style.transformOrigin = "top left";
    clone.style.overflow = "visible";

    captureContainer.appendChild(clone);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(captureContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: PAPER_WIDTH,
      height: pageHeight,
    });

    document.body.removeChild(captureContainer);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, "image/png");
    });
  };

  // Handle Print
  const handlePrint = () => {
    setShowDownloadMenu(false);
    setShowPrintModal(true);
  };

  // Perform Print
  const performPrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const paperElement = paperRef.current;
    if (!paperElement) return;

    const clone = paperElement.cloneNode(true) as HTMLElement;

    const templateElement = clone.querySelector(
      ".modern-template, .minimal-template, .figmaResume",
    );
    const actualHeight = templateElement
      ? templateElement.scrollHeight
      : MIN_PAPER_HEIGHT;
    const pageHeight = Math.max(actualHeight + 40, MIN_PAPER_HEIGHT);

    const allStyles = document.querySelectorAll("style");
    let allStylesText = "";
    allStyles.forEach((style) => {
      allStylesText += style.innerHTML;
    });

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume</title>
          <style>
            body { margin: 0; padding: 0; background: white; }
            .print-container { 
              width: ${PAPER_WIDTH}px; 
              min-height: ${pageHeight}px;
              margin: 0 auto;
              background: white;
              position: relative;
              overflow: visible;
            }
            * { box-sizing: border-box; }
            ${allStylesText}
            .dark { display: none; }
            .modern-template { background: white !important; }
            .sidebar { background: ${theme.primaryColor || "#2b2b2b"} !important; }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${clone.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Download as PNG
  const handleDownloadPNG = async () => {
    setIsLoading(true);
    setShowDownloadMenu(false);
    try {
      const blob = await generatePNG();
      const link = document.createElement("a");
      link.download = `resume-${templateId}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading PNG:", error);
      alert("Failed to download resume as PNG. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Download as PDF
  const handleDownloadPDF = async () => {
    setIsLoading(true);
    setShowDownloadMenu(false);
    try {
      const blob = await generatePDF();
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

  // Share functions
  const shareViaWhatsApp = () => {
    const url = window.location.href;
    const message = `📄 Check out my resume!\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    setShowShareModal(false);
  };

  const shareViaGmail = () => {
    const url = window.location.href;
    const fullName = content.personalInfo?.fullName || "My";
    const jobTitle = content.personalInfo?.title || "Resume";
    const subject = `${fullName}'s Resume - ${jobTitle}`;
    const body = `Hello,\n\nI wanted to share my resume with you. Please find it at the link below:\n\n${url}\n\nBest regards,\n${fullName}`;
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank",
    );
    setShowShareModal(false);
  };

  const shareViaLinkedIn = () => {
    const url = window.location.href;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
    );
    setShowShareModal(false);
  };

  const shareViaTwitter = () => {
    const url = window.location.href;
    const text = "Check out my resume!";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
    );
    setShowShareModal(false);
  };

  const shareViaFacebook = () => {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
    );
    setShowShareModal(false);
  };

  const shareViaLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    setShowShareModal(false);
  };

  // Share as PDF
  const shareAsPDF = async () => {
    setIsLoading(true);
    setShowShareModal(false);
    try {
      const blob = await generatePDF();
      const file = new File([blob], `resume-${templateId}.pdf`, {
        type: "application/pdf",
      });

      if (navigator.share) {
        await navigator.share({
          title: "My Resume",
          files: [file],
        });
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

  // Send Email via API
  const handleSendEmail = async () => {
    if (!shareEmail) {
      alert("Please enter an email address");
      return;
    }

    setIsSendingEmail(true);
    setEmailSent(false);

    try {
      const url = window.location.href;
      const fullName = content.personalInfo?.fullName || "Someone";
      const jobTitle = content.personalInfo?.title || "Resume";

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to_email: shareEmail,
          from_name: shareName || "Anonymous",
          message: shareMessage || `Check out my resume: ${url}`,
          resume_url: url,
          resume_name: `${fullName}'s Resume - ${jobTitle}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setEmailSent(true);
      setTimeout(() => {
        setShowShareModal(false);
        setShareEmail("");
        setShareName("");
        setShareMessage("");
        setEmailSent(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Open Share Modal
  const openShareModal = () => {
    setShowShareModal(true);
  };

  // Handle Share button click
  const handleShare = () => {
    setShowShareModal(true);
  };

  // Handle Download
  const handleDownload = () => {
    setShowDownloadMenu(!showDownloadMenu);
  };

  // Handle Fullscreen
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
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));
  const resetZoom = () => setZoom(100);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={`pp-root ${isFullscreen ? "fullscreen" : ""}`}>
      {/* Toolbar */}
      <div className="pp-toolbar">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-[#64748B]" />
            <span className="text-sm font-medium text-[#0F172A] dark:text-white">
              Preview
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
            <span>{zoom}%</span>
            <button
              onClick={zoomOut}
              className="p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
              title="Zoom Out"
            >
              <span className="text-sm">−</span>
            </button>
            <button
              onClick={resetZoom}
              className="px-2 py-0.5 text-xs bg-[#F1F5F9] dark:bg-[#1E293B] rounded hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors"
              title="Reset Zoom"
            >
              100%
            </button>
            <button
              onClick={zoomIn}
              className="p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
              title="Zoom In"
            >
              <span className="text-sm">+</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Download Button with Dropdown */}
          <div className="dropdown-container relative">
            <button
              onClick={handleDownload}
              disabled={isLoading}
              className={`p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1`}
              title="Download Resume"
            >
              <Download
                className={`h-4 w-4 text-[#64748B] ${isLoading ? "animate-pulse" : ""}`}
              />
              <ChevronDown className="h-3 w-3 text-[#64748B]" />
            </button>

            {showDownloadMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1E293B] rounded-lg shadow-lg border border-[#E2E8F0] dark:border-[#334155] overflow-hidden z-50">
                <button
                  onClick={handleDownloadPNG}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-2"
                >
                  <FileImage className="h-4 w-4" />
                  <span>Download as PNG</span>
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-2 border-t border-[#E2E8F0] dark:border-[#334155]"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download as PDF</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-2 border-t border-[#E2E8F0] dark:border-[#334155]"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Resume</span>
                </button>
              </div>
            )}
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
            title="Share Resume"
          >
            <Share2 className="h-4 w-4 text-[#64748B]" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4 text-[#64748B]" />
            ) : (
              <Maximize2 className="h-4 w-4 text-[#64748B]" />
            )}
          </button>
        </div>
      </div>

      {/* Viewport - Centered */}
      <div className="pp-viewport" ref={containerRef}>
        <div
          ref={paperRef}
          className="pp-paper"
          style={{
            width: PAPER_WIDTH,
            height: paperHeight,
            transform: `scale(${totalScale})`,
            transformOrigin: "center center",
          }}
        >
          <TemplateRenderer
            templateComponent={template.component}
            content={content}
            theme={theme}
            layoutConfig={template.layoutConfig}
          />
        </div>
      </div>

      {/* Print Modal */}
      {showPrintModal && (
        <div className="modal-overlay" onClick={() => setShowPrintModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Print Resume</h3>
              <button
                className="modal-close"
                onClick={() => setShowPrintModal(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="modal-body">
              <div className="print-preview">
                <div className="print-preview-icon">
                  <Printer className="h-12 w-12 text-[#2563EB]" />
                </div>
                <p className="print-preview-text">
                  Your resume is ready to print. This will open a print dialog
                  where you can choose your printer and settings.
                </p>
              </div>
              <div className="print-options">
                <div className="print-option">
                  <input
                    type="checkbox"
                    id="include-margins"
                    checked
                    readOnly
                  />
                  <label htmlFor="include-margins">
                    Include margins for printing
                  </label>
                </div>
                <div className="print-option">
                  <input
                    type="checkbox"
                    id="include-colors"
                    defaultChecked
                    readOnly
                  />
                  <label htmlFor="include-colors">Print in color</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowPrintModal(false)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={performPrint}>
                <Printer className="h-4 w-4" />
                Print Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div
            className="modal-content share-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">Share Resume</h3>
              <button
                className="modal-close"
                onClick={() => setShowShareModal(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="modal-body">
              {/* Share Options Grid */}
              <div className="share-options-grid">
                {SHARE_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        switch (option.id) {
                          case "whatsapp":
                            shareViaWhatsApp();
                            break;
                          case "gmail":
                            shareViaGmail();
                            break;
                          case "linkedin":
                            shareViaLinkedIn();
                            break;
                          case "twitter":
                            shareViaTwitter();
                            break;
                          case "facebook":
                            shareViaFacebook();
                            break;
                          case "link":
                            shareViaLink();
                            break;
                        }
                      }}
                      className="share-option-btn"
                      style={{
                        backgroundColor: option.bgColor,
                        borderColor: `${option.color}30`,
                      }}
                    >
                      <div
                        className="share-option-icon"
                        style={{ color: option.color }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="share-option-label">{option.label}</span>
                      {option.id === "link" && copied && (
                        <span className="share-option-badge">
                          <Check className="h-3 w-3" />
                          Copied!
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="share-divider">
                <span>or send via email</span>
              </div>

              {/* Email Form */}
              {emailSent ? (
                <div className="email-success">
                  <Check className="h-12 w-12 text-green-500 mx-auto" />
                  <p className="text-lg font-medium text-green-600">
                    Email Sent!
                  </p>
                  <p className="text-sm text-[#64748B]">
                    Your resume has been shared with {shareEmail}
                  </p>
                </div>
              ) : (
                <form
                  className="share-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendEmail();
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="share-name" className="form-label">
                      Your Name{" "}
                      <span className="text-[#94A3B8] text-xs">(optional)</span>
                    </label>
                    <div className="form-input-wrapper">
                      <User className="form-input-icon" />
                      <input
                        id="share-name"
                        type="text"
                        value={shareName}
                        onChange={(e) => setShareName(e.target.value)}
                        placeholder="Your name"
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="share-email" className="form-label">
                      Recipient's Email <span className="text-red-500">*</span>
                    </label>
                    <div className="form-input-wrapper">
                      <AtSign className="form-input-icon" />
                      <input
                        id="share-email"
                        type="email"
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                        placeholder="recipient@email.com"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="share-message" className="form-label">
                      Personal Message{" "}
                      <span className="text-[#94A3B8] text-xs">(optional)</span>
                    </label>
                    <textarea
                      id="share-message"
                      value={shareMessage}
                      onChange={(e) => setShareMessage(e.target.value)}
                      placeholder="I wanted to share my resume with you..."
                      rows={3}
                      className="form-textarea"
                    />
                  </div>
                  <div className="form-note">
                    <p className="text-xs text-[#94A3B8]">
                      The recipient will receive a link to view your resume
                      online.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center"
                    disabled={!shareEmail || isSendingEmail}
                  >
                    {isSendingEmail ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Email
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

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
          overflow: auto; 
          padding: 24px;
          background: #F1F5F9;
        }
        .dark .pp-viewport {
          background: #0F172A;
        }
        .pp-paper {
          background: #fff; 
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          flex-shrink: 0;
          border-radius: 4px;
          overflow: visible;
          transform-origin: center center;
          transition: height 0.2s ease;
        }
        .dark .pp-paper {
          background: #1E293B;
        }
        .pp-empty { 
          padding: 40px; 
          color: #94A3B8; 
          text-align: center; 
        }

        /* Share Modal Styles */
        .share-modal .modal-content {
          max-width: 520px;
        }
        .share-options-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .share-option-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 12px;
          border: 1px solid;
          border-radius: 12px;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        .share-option-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .dark .share-option-btn:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .share-option-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .share-option-label {
          font-size: 12px;
          font-weight: 500;
          color: #0F172A;
        }
        .dark .share-option-label {
          color: #E2E8F0;
        }
        .share-option-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #22C55E;
          color: white;
          border-radius: 12px;
          padding: 2px 8px;
          font-size: 10px;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .share-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 16px 0;
          color: #94A3B8;
          font-size: 12px;
        }
        .share-divider::before,
        .share-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #E2E8F0;
        }
        .dark .share-divider::before,
        .dark .share-divider::after {
          background: #334155;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
        }
        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 480px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 24px 48px rgba(0,0,0,0.25);
          animation: modalIn 0.3s ease;
        }
        .dark .modal-content {
          background: #1E293B;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #E2E8F0;
        }
        .dark .modal-header {
          border-bottom: 1px solid #334155;
        }
        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #0F172A;
        }
        .dark .modal-title {
          color: #FFFFFF;
        }
        .modal-close {
          padding: 4px;
          border-radius: 8px;
          color: #64748B;
          transition: background 0.2s;
          background: none;
          border: none;
          cursor: pointer;
        }
        .modal-close:hover {
          background: #F1F5F9;
        }
        .dark .modal-close:hover {
          background: #334155;
        }
        .modal-body {
          padding: 24px;
        }
        .modal-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding: 16px 24px;
          border-top: 1px solid #E2E8F0;
        }
        .dark .modal-footer {
          border-top: 1px solid #334155;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #2563EB;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: #1D4ED8;
        }
        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: transparent;
          color: #0F172A;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dark .btn-secondary {
          color: #FFFFFF;
          border-color: #334155;
        }
        .btn-secondary:hover {
          background: #F1F5F9;
        }
        .dark .btn-secondary:hover {
          background: #334155;
        }

        /* Print Preview */
        .print-preview {
          text-align: center;
          padding: 20px 0;
        }
        .print-preview-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }
        .print-preview-text {
          color: #0F172A;
          font-size: 15px;
          line-height: 1.6;
        }
        .dark .print-preview-text {
          color: #E2E8F0;
        }
        .print-options {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .print-option {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .print-option input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #2563EB;
        }
        .print-option label {
          font-size: 14px;
          color: #0F172A;
        }
        .dark .print-option label {
          color: #E2E8F0;
        }

        /* Share Form */
        .share-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #0F172A;
        }
        .dark .form-label {
          color: #E2E8F0;
        }
        .form-input-wrapper {
          position: relative;
        }
        .form-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: #94A3B8;
        }
        .form-input {
          width: 100%;
          padding: 10px 12px 10px 40px;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          color: #0F172A;
          transition: border-color 0.2s;
        }
        .dark .form-input {
          background: #0F172A;
          border-color: #334155;
          color: #FFFFFF;
        }
        .form-input:focus {
          outline: none;
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .form-textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          color: #0F172A;
          resize: vertical;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .dark .form-textarea {
          background: #0F172A;
          border-color: #334155;
          color: #FFFFFF;
        }
        .form-textarea:focus {
          outline: none;
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .email-success {
          text-align: center;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
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
          .modal-content {
            margin: 10px;
          }
          .share-options-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          .share-option-btn {
            padding: 12px 8px;
          }
        }
      `}</style>
    </div>
  );
}

// ChevronDown component for the dropdowns
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
