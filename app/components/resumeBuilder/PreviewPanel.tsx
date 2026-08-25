"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import type { ResumeContent, ResumeTheme } from "@/app/types/Content";
import TemplateRenderer from "../templates/Registry";
import { templates } from "../templates/templates";
import { Eye, Maximize2, Download, Share2, ZoomIn, ZoomOut } from "lucide-react";

interface PreviewPanelProps {
  templateId: string;
  theme: ResumeTheme;
  content: ResumeContent;
  onSwitchTemplate: (templateId: string) => void;
}

const PAPER_WIDTH = 794;
const MIN_PAPER_HEIGHT = 1123;

export default function PreviewPanel({ templateId, theme, content, onSwitchTemplate }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [paperHeight, setPaperHeight] = useState(MIN_PAPER_HEIGHT);
  const [zoom, setZoom] = useState(100);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [contentHeight, setContentHeight] = useState(MIN_PAPER_HEIGHT);

  const template = templates.find((t) => t.id === templateId);

  // Measure actual template height
  const measureHeight = useCallback(() => {
    if (isMeasuring || !templateRef.current) return;
    
    setIsMeasuring(true);
    
    requestAnimationFrame(() => {
      if (templateRef.current) {
        // Find the actual template element inside the paper
        const templateElement = templateRef.current.querySelector(
          '.modern-template, .minimal-template, .figmaResume'
        );
        
        if (templateElement) {
          // Get the actual content height
          const actualHeight = templateElement.scrollHeight;
          
          // Add small padding for safety
          const newContentHeight = Math.max(actualHeight + 20, MIN_PAPER_HEIGHT);
          
          // Only update if height changed significantly
          setContentHeight(prev => {
            const diff = Math.abs(prev - newContentHeight);
            if (diff > 5) {
              return newContentHeight;
            }
            return prev;
          });
        }
      }
      
      setIsMeasuring(false);
    });
  }, [isMeasuring]);

  // Update paper height based on content height, but only if content exceeds minimum
  useEffect(() => {
    // Use the content height, but never go below the minimum
    const newHeight = Math.max(contentHeight, MIN_PAPER_HEIGHT);
    setPaperHeight(newHeight);
  }, [contentHeight]);

  // Measure when content or template changes
  useEffect(() => {
    const timer = setTimeout(measureHeight, 200);
    return () => clearTimeout(timer);
  }, [content, templateId, measureHeight]);

  // Recalculate scale when paper height or container size changes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recalc = () => {
      const padding = 48;
      const availableWidth = el.clientWidth - padding;
      const availableHeight = el.clientHeight - padding;
      
      const scaleX = availableWidth / PAPER_WIDTH;
      const scaleY = availableHeight / paperHeight;
      
      // Allow scaling up slightly if content is smaller than available space
      const maxScale = 1.2;
      const nextScale = Math.min(scaleX, scaleY, maxScale);
      setScale(Math.max(nextScale, 0.3));
    };

    recalc();
    const observer = new ResizeObserver(recalc);
    observer.observe(el);
    return () => observer.disconnect();
  }, [paperHeight]);

  if (!template) {
    return <div className="pp-empty">Unknown template: {templateId}</div>;
  }

  const zoomLevel = zoom / 100;
  const finalScale = scale * zoomLevel;

  return (
    <div className="pp-root">
      {/* Toolbar */}
      <div className="pp-toolbar">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-[#64748B]" />
            <span className="text-sm font-medium text-[#0F172A] dark:text-white">Preview</span>
          </div>
          <select
            className="pp-switcher"
            value={templateId}
            onChange={(e) => onSwitchTemplate(e.target.value)}
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.category} — {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 mr-2">
            <button 
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
            >
              <ZoomOut className="h-4 w-4 text-[#64748B]" />
            </button>
            <span className="text-xs text-[#64748B] min-w-[40px] text-center">{zoom}%</span>
            <button 
              onClick={() => setZoom(Math.min(150, zoom + 10))}
              className="p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
            >
              <ZoomIn className="h-4 w-4 text-[#64748B]" />
            </button>
          </div>
          <div className="w-px h-6 bg-[#E2E8F0] dark:bg-[#334155]" />
          <button 
            onClick={() => setZoom(100)}
            className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
          >
            <Maximize2 className="h-4 w-4 text-[#64748B]" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors">
            <Download className="h-4 w-4 text-[#64748B]" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors">
            <Share2 className="h-4 w-4 text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="pp-viewport" ref={containerRef}>
        <div
          className="pp-paper"
          style={{
            width: PAPER_WIDTH,
            height: paperHeight,
            transform: `scale(${finalScale})`,
            transformOrigin: 'top center',
          }}
        >
          <div ref={templateRef}>
            <TemplateRenderer
              templateComponent={template.component}
              content={content}
              theme={theme}
            />
          </div>
        </div>
      </div>

      <style>{`
        .pp-root { 
          height: 100%; 
          display: flex; 
          flex-direction: column; 
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
        .pp-switcher { 
          font-size: 12px; 
          padding: 4px 8px; 
          border: 1px solid #e2e8f0;
          border-radius: 6px; 
          background: #fff;
          color: #0F172A;
          cursor: pointer;
        }
        .dark .pp-switcher {
          background: #1E293B;
          border: 1px solid #334155;
          color: #fff;
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
        .pp-paper {
          background: #fff; 
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          transform-origin: top center; 
          flex-shrink: 0;
          border-radius: 4px;
          overflow: visible;
          transition: height 0.2s ease;
        }
        .pp-empty { 
          padding: 40px; 
          color: #94A3B8; 
          text-align: center; 
        }
        .pp-viewport::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .pp-viewport::-webkit-scrollbar-track {
          background: transparent;
        }
        .pp-viewport::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .dark .pp-viewport::-webkit-scrollbar-thumb {
          background: #334155;
        }
        .pp-viewport::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .dark .pp-viewport::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}