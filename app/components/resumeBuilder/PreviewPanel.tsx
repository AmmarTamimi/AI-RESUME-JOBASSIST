"use client";

import React, { useEffect, useRef, useState } from "react";
import type { ResumeContent, ResumeTheme } from "@/app/types/Content";
import TemplateRenderer from "../templates/Registry";
import { templates } from "../templates/templates";
import { Eye, Maximize2, Download, Share2 } from "lucide-react";

interface PreviewPanelProps {
  templateId: string;
  theme: ResumeTheme;
  content: ResumeContent;
  onSwitchTemplate: (templateId: string) => void;
}

const PAPER_WIDTH = 794;
const PAPER_HEIGHT = 1123;

export default function PreviewPanel({ templateId, theme, content, onSwitchTemplate }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(100);

  const template = templates.find((t) => t.id === templateId);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recalc = () => {
      const padding = 48;
      const availableWidth = el.clientWidth - padding;
      const availableHeight = el.clientHeight - padding;
      const nextScale = Math.min(availableWidth / PAPER_WIDTH, availableHeight / PAPER_HEIGHT, 1);
      setScale(nextScale > 0 ? nextScale : 1);
    };

    recalc();
    const observer = new ResizeObserver(recalc);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!template) {
    return <div className="pp-empty">Unknown template: {templateId}</div>;
  }

  const zoomLevel = zoom / 100;

  return (
    <div className="pp-root">
      {/* Toolbar */}
      <div className="pp-toolbar">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-[#64748B]" />
            <span className="text-sm font-medium text-[#0F172A] dark:text-white">Preview</span>
          </div>
          {/* <select
            className="pp-switcher"
            value={templateId}
            onChange={(e) => onSwitchTemplate(e.target.value)}
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.category} — {t.name}
              </option>
            ))}
          </select> */}
        </div>

        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors">
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
            height: PAPER_HEIGHT,
            transform: `scale(${scale * zoomLevel})`,
          }}
        >
          <TemplateRenderer templateComponent={template.component} content={content} theme={theme} />
        </div>
      </div>

      <style>{`
        .pp-root { 
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          background: #F1F5F9;
          dark: background: #0F172A;
        }
        .pp-toolbar {
          display: flex; 
          align-items: center; 
          justify-content: space-between;
          padding: 10px 16px; 
          background: #fff; 
          dark: background: #1E293B;
          border-bottom: 1px solid #e2e8f0;
          dark: border-bottom: 1px solid #334155;
          flex-shrink: 0;
        }
        .pp-template-name { 
          font-size: 13px; 
          font-weight: 600; 
          color: #0F172A;
          dark: color: #fff;
        }
        .pp-switcher { 
          font-size: 12px; 
          padding: 4px 8px; 
          border: 1px solid #e2e8f0;
          dark: border: 1px solid #334155;
          border-radius: 6px; 
          background: #fff;
          dark: background: #1E293B;
          color: #0F172A;
          dark: color: #fff;
        }
        .pp-viewport {
          flex: 1; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          overflow: auto; 
          padding: 24px;
          background: #F1F5F9;
          dark: background: #0F172A;
        }
        .pp-paper {
          background: #fff; 
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          transform-origin: center center; 
          flex-shrink: 0;
          border-radius: 4px;
          overflow: hidden;
        }
        .pp-empty { 
          padding: 40px; 
          color: #94A3B8; 
          text-align: center; 
        }
      `}</style>
    </div>
  );
}