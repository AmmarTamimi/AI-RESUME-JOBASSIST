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
} from "lucide-react";

interface PreviewPanelProps {
  templateId: string;
  theme: ResumeTheme;
  content: ResumeContent;
  onSwitchTemplate: (templateId: string) => void;
}

const PAPER_WIDTH = 794;
const PAPER_HEIGHT = 1123;

// Share options
const SHARE_OPTIONS = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: '#25D366' },
  { id: 'gmail', label: 'Gmail', icon: Mail, color: '#EA4335' },
  { id: 'link', label: 'Copy Link', icon: LinkIcon, color: '#64748B' },
];

export default function PreviewPanel({ templateId, theme, content, onSwitchTemplate }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const template = templates.find((t) => t.id === templateId);

  // Calculate scale
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recalc = () => {
      const padding = isFullscreen ? 24 : 48;
      const availableWidth = el.clientWidth - padding;
      const availableHeight = el.clientHeight - padding;
      const nextScale = Math.min(availableWidth / PAPER_WIDTH, availableHeight / PAPER_HEIGHT, 1);
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

  // Generate PDF using html2canvas + jsPDF
  const generatePDF = async (): Promise<Blob> => {
    // Create a temporary container for capture at 100% scale
    const captureContainer = document.createElement('div');
    captureContainer.style.position = 'fixed';
    captureContainer.style.left = '-9999px';
    captureContainer.style.top = '0';
    captureContainer.style.width = PAPER_WIDTH + 'px';
    captureContainer.style.height = PAPER_HEIGHT + 'px';
    captureContainer.style.background = '#ffffff';
    captureContainer.style.zIndex = '-9999';
    document.body.appendChild(captureContainer);

    // Get the paper element
    const paperElement = paperRef.current;
    if (!paperElement) throw new Error('Paper element not found');

    // Clone the paper content without transforms
    const clone = paperElement.cloneNode(true) as HTMLElement;
    // Remove any transforms from the clone
    clone.style.transform = 'none';
    clone.style.width = PAPER_WIDTH + 'px';
    clone.style.height = PAPER_HEIGHT + 'px';
    clone.style.position = 'relative';
    clone.style.left = '0';
    clone.style.top = '0';
    clone.style.margin = '0';
    clone.style.transformOrigin = 'top left';
    
    // Clear the capture container and append the clone
    captureContainer.innerHTML = '';
    captureContainer.appendChild(clone);

    // Wait for the clone to render
    await new Promise(resolve => setTimeout(resolve, 100));

    // Capture the clone
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(captureContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: PAPER_WIDTH,
      height: PAPER_HEIGHT,
    });

    // Clean up
    document.body.removeChild(captureContainer);

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Create PDF with A4 proportions
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [PAPER_WIDTH, PAPER_HEIGHT],
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, PAPER_WIDTH, PAPER_HEIGHT);
    
    return pdf.output('blob');
  };

  // Generate PNG
  const generatePNG = async (): Promise<Blob> => {
    // Create a temporary container for capture at 100% scale
    const captureContainer = document.createElement('div');
    captureContainer.style.position = 'fixed';
    captureContainer.style.left = '-9999px';
    captureContainer.style.top = '0';
    captureContainer.style.width = PAPER_WIDTH + 'px';
    captureContainer.style.height = PAPER_HEIGHT + 'px';
    captureContainer.style.background = '#ffffff';
    captureContainer.style.zIndex = '-9999';
    document.body.appendChild(captureContainer);

    // Get the paper element
    const paperElement = paperRef.current;
    if (!paperElement) throw new Error('Paper element not found');

    // Clone the paper content without transforms
    const clone = paperElement.cloneNode(true) as HTMLElement;
    // Remove any transforms from the clone
    clone.style.transform = 'none';
    clone.style.width = PAPER_WIDTH + 'px';
    clone.style.height = PAPER_HEIGHT + 'px';
    clone.style.position = 'relative';
    clone.style.left = '0';
    clone.style.top = '0';
    clone.style.margin = '0';
    clone.style.transformOrigin = 'top left';
    
    // Clear the capture container and append the clone
    captureContainer.innerHTML = '';
    captureContainer.appendChild(clone);

    // Wait for the clone to render
    await new Promise(resolve => setTimeout(resolve, 100));

    // Capture the clone
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(captureContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: PAPER_WIDTH,
      height: PAPER_HEIGHT,
    });

    // Clean up
    document.body.removeChild(captureContainer);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png');
    });
  };

  // Handle Download as PNG
  const handleDownloadPNG = async () => {
    setIsLoading(true);
    setShowDownloadMenu(false);
    try {
      const blob = await generatePNG();
      const link = document.createElement('a');
      link.download = `resume-${templateId}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading PNG:', error);
      alert('Failed to download resume as PNG. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Download as PDF
  const handleDownloadPDF = async () => {
    setIsLoading(true);
    setShowDownloadMenu(false);
    try {
      const blob = await generatePDF();
      const link = document.createElement('a');
      link.download = `resume-${templateId}.pdf`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download resume as PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Share via WhatsApp - Opens WhatsApp Web/App
  const shareViaWhatsApp = async () => {
    setShowShareMenu(false);
    try {
      // Get the current URL
      const url = window.location.href;
      
      // Create a message with the resume link
      const message = `📄 Check out my resume!\n\n${url}`;
      
      // Open WhatsApp with the message
      // Using wa.me for better compatibility across devices
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
      
      // Open in new tab/window
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error);
      alert('Failed to open WhatsApp. Please make sure WhatsApp is installed or try again.');
    }
  };

  // Share via Gmail - Opens Gmail compose
  const shareViaGmail = async () => {
    setShowShareMenu(false);
    try {
      // Get the current URL
      const url = window.location.href;
      
      // Get resume details for email subject
      const fullName = content.personalInfo?.fullName || 'My';
      const jobTitle = content.personalInfo?.title || 'Resume';
      
      // Create email content
      const subject = `${fullName}'s Resume - ${jobTitle}`;
      const body = `Hello,\n\nI wanted to share my resume with you. Please find it at the link below:\n\n${url}\n\nBest regards,\n${fullName}`;
      
      // Open Gmail compose
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open in new tab/window
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error sharing via Gmail:', error);
      alert('Failed to open Gmail. Please try again.');
    }
  };

  // Share via Email (Fallback - opens default email client)
  const shareViaEmailFallback = async () => {
    setShowShareMenu(false);
    try {
      const url = window.location.href;
      const fullName = content.personalInfo?.fullName || 'My';
      const jobTitle = content.personalInfo?.title || 'Resume';
      
      const subject = `${fullName}'s Resume - ${jobTitle}`;
      const body = `Hello,\n\nI wanted to share my resume with you. Please find it at the link below:\n\n${url}\n\nBest regards,\n${fullName}`;
      
      const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(emailUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error sharing via Email:', error);
      alert('Failed to open email client. Please try again.');
    }
  };

  // Share via Link (Copy to clipboard)
  const shareViaLink = async () => {
    setShowShareMenu(false);
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Error copying link:', error);
      alert('Failed to copy link. Please try again.');
    }
  };

  // Share as PDF
  const shareAsPDF = async () => {
    setShowShareMenu(false);
    setIsLoading(true);
    try {
      const blob = await generatePDF();
      const file = new File([blob], `resume-${templateId}.pdf`, { type: 'application/pdf' });
      
      // Try using Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'My Resume',
          files: [file],
        });
      } else {
        // Fallback: Download the PDF
        const link = document.createElement('a');
        link.download = `resume-${templateId}.pdf`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
        alert('PDF downloaded! You can now share it manually.');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sharing PDF:', error);
        alert('Failed to share PDF. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Share (opens share menu)
  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
    setShowDownloadMenu(false);
  };

  // Handle Download (opens download menu)
  const handleDownload = () => {
    setShowDownloadMenu(!showDownloadMenu);
    setShowShareMenu(false);
  };

  // Handle Fullscreen
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Error entering fullscreen:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const zoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const zoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
  const resetZoom = () => setZoom(100);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setShowShareMenu(false);
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Calculate the transform for centering
  const totalScale = scale * zoomLevel;
  const translateX = (PAPER_WIDTH * (1 - totalScale)) / 2;
  const translateY = (PAPER_HEIGHT * (1 - totalScale)) / 2;

  return (
    <div className={`pp-root ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Toolbar */}
      <div className="pp-toolbar">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-[#64748B]" />
            <span className="text-sm font-medium text-[#0F172A] dark:text-white">Preview</span>
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

        <div className="flex items-center gap-2 relative">
          {/* Download Button with Dropdown */}
          <div className="dropdown-container relative">
            <button 
              onClick={handleDownload}
              disabled={isLoading}
              className={`p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1`}
              title="Download Resume"
            >
              <Download className={`h-4 w-4 text-[#64748B] ${isLoading ? 'animate-pulse' : ''}`} />
              <ChevronDown className="h-3 w-3 text-[#64748B]" />
            </button>
            
            {showDownloadMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1E293B] rounded-lg shadow-lg border border-[#E2E8F0] dark:border-[#334155] overflow-hidden z-50">
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
              </div>
            )}
          </div>

          {/* Share Button with Dropdown */}
          <div className="dropdown-container relative">
            <button 
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors flex items-center gap-1"
              title="Share Resume"
            >
              <Share2 className="h-4 w-4 text-[#64748B]" />
              <ChevronDown className="h-3 w-3 text-[#64748B]" />
            </button>
            
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1E293B] rounded-lg shadow-lg border border-[#E2E8F0] dark:border-[#334155] overflow-hidden z-50">
                {/* Share Options */}
                <div className="py-1">
                  {/* WhatsApp */}
                  <button
                    onClick={shareViaWhatsApp}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3"
                  >
                    <MessageCircle className="h-4 w-4" style={{ color: '#25D366' }} />
                    <span>Share via WhatsApp</span>
                  </button>
                  
                  {/* Gmail */}
                  <button
                    onClick={shareViaGmail}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3"
                  >
                    <Mail className="h-4 w-4" style={{ color: '#EA4335' }} />
                    <span>Share via Gmail</span>
                  </button>
                  
                  {/* Email Fallback (Optional - shows if user wants default email client) */}
                  <button
                    onClick={shareViaEmailFallback}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 border-t border-[#E2E8F0] dark:border-[#334155]"
                  >
                    <Mail className="h-4 w-4" style={{ color: '#64748B' }} />
                    <span>Email (Default)</span>
                  </button>
                  
                  {/* Copy Link */}
                  <button
                    onClick={shareViaLink}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 border-t border-[#E2E8F0] dark:border-[#334155]"
                  >
                    <LinkIcon className="h-4 w-4" style={{ color: '#64748B' }} />
                    <span>Copy Link</span>
                    {copied && (
                      <Check className="h-4 w-4 text-green-500 ml-auto" />
                    )}
                  </button>
                </div>
                
                {/* Divider */}
                <div className="border-t border-[#E2E8F0] dark:border-[#334155]"></div>
                
                {/* Share as PDF */}
                <button
                  onClick={shareAsPDF}
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className="h-4 w-4 text-[#2563EB]" />
                  <span>Share as PDF</span>
                  {isLoading && <span className="ml-auto text-xs text-[#64748B]">Generating...</span>}
                </button>
              </div>
            )}
          </div>

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

      {/* Viewport */}
      <div className="pp-viewport" ref={containerRef}>
        <div
          ref={paperRef}
          className="pp-paper"
          style={{
            width: PAPER_WIDTH,
            height: PAPER_HEIGHT,
            transform: `scale(${totalScale}) translate(${translateX / totalScale}px, ${translateY / totalScale}px)`,
            transformOrigin: 'top left',
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
          overflow: hidden;
        }
        .dark .pp-paper {
          background: #1E293B;
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