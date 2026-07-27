import { cn } from '../lib/utils';

interface ResumePreviewProps {
  template: 'modern' | 'classic' | 'minimal' | 'creative' | 'executive' | 'tech';
  className?: string;
}

export function ResumePreview({ template, className }: ResumePreviewProps) {
  const previews = {
    modern: (
      <svg viewBox="0 0 200 280" className="w-full h-full">
        <rect width="200" height="280" fill="white" rx="8"/>
        {/* Header */}
        <rect x="16" y="16" width="80" height="6" fill="#2563EB" rx="3"/>
        <rect x="16" y="28" width="120" height="4" fill="#94A3B8" rx="2"/>
        <rect x="140" y="16" width="44" height="4" fill="#E2E8F0" rx="2"/>
        <rect x="140" y="24" width="40" height="4" fill="#E2E8F0" rx="2"/>
        {/* Divider */}
        <line x1="16" y1="40" x2="184" y2="40" stroke="#2563EB" strokeWidth="1.5"/>
        {/* Experience */}
        <rect x="16" y="48" width="50" height="4" fill="#2563EB" rx="2"/>
        <rect x="16" y="58" width="160" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="66" width="120" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="74" width="100" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="86" width="160" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="94" width="120" height="3" fill="#F1F5F9" rx="1.5"/>
        {/* Education */}
        <rect x="16" y="108" width="50" height="4" fill="#2563EB" rx="2"/>
        <rect x="16" y="118" width="140" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="126" width="100" height="3" fill="#F1F5F9" rx="1.5"/>
        {/* Skills */}
        <rect x="16" y="140" width="40" height="4" fill="#2563EB" rx="2"/>
        <rect x="16" y="150" width="50" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="72" y="150" width="60" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="138" y="150" width="40" height="3" fill="#F1F5F9" rx="1.5"/>
      </svg>
    ),
    classic: (
      <svg viewBox="0 0 200 280" className="w-full h-full">
        <rect width="200" height="280" fill="white" rx="8"/>
        {/* Header */}
        <rect x="16" y="16" width="100" height="6" fill="#1E293B" rx="3"/>
        <rect x="16" y="28" width="80" height="4" fill="#64748B" rx="2"/>
        <rect x="16" y="38" width="60" height="4" fill="#94A3B8" rx="2"/>
        <line x1="16" y1="50" x2="184" y2="50" stroke="#E2E8F0" strokeWidth="1"/>
        {/* Content */}
        <rect x="16" y="60" width="50" height="4" fill="#1E293B" rx="2"/>
        <rect x="16" y="70" width="160" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="78" width="120" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="92" width="50" height="4" fill="#1E293B" rx="2"/>
        <rect x="16" y="102" width="140" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="110" width="100" height="3" fill="#F1F5F9" rx="1.5"/>
      </svg>
    ),
    minimal: (
      <svg viewBox="0 0 200 280" className="w-full h-full">
        <rect width="200" height="280" fill="white" rx="8"/>
        <rect x="20" y="20" width="80" height="5" fill="#0F172A" rx="2.5"/>
        <rect x="20" y="32" width="60" height="3" fill="#94A3B8" rx="1.5"/>
        <rect x="20" y="44" width="120" height="2" fill="#E2E8F0" rx="1"/>
        <rect x="20" y="56" width="40" height="3" fill="#0F172A" rx="1.5"/>
        <rect x="20" y="64" width="140" height="2" fill="#E2E8F0" rx="1"/>
        <rect x="20" y="70" width="100" height="2" fill="#E2E8F0" rx="1"/>
        <rect x="20" y="80" width="40" height="3" fill="#0F172A" rx="1.5"/>
        <rect x="20" y="88" width="120" height="2" fill="#E2E8F0" rx="1"/>
        <rect x="20" y="94" width="80" height="2" fill="#E2E8F0" rx="1"/>
      </svg>
    ),
    creative: (
      <svg viewBox="0 0 200 280" className="w-full h-full">
        <rect width="200" height="280" fill="#F43F5E" rx="8"/>
        <rect x="0" y="0" width="80" height="280" fill="white" rx="8" clipPath="url(#leftClip)"/>
        <clipPath id="leftClip">
          <rect x="0" y="0" width="80" height="280" rx="8"/>
        </clipPath>
        <rect x="16" y="20" width="48" height="5" fill="#F43F5E" rx="2.5"/>
        <rect x="16" y="32" width="40" height="3" fill="#FDA4AF" rx="1.5"/>
        <rect x="16" y="44" width="48" height="3" fill="#FDA4AF" rx="1.5"/>
        <rect x="16" y="56" width="40" height="3" fill="#FDA4AF" rx="1.5"/>
        <rect x="96" y="20" width="60" height="4" fill="#1E293B" rx="2"/>
        <rect x="96" y="30" width="80" height="2" fill="#E2E8F0" rx="1"/>
        <rect x="96" y="36" width="60" height="2" fill="#E2E8F0" rx="1"/>
        <rect x="96" y="50" width="60" height="4" fill="#1E293B" rx="2"/>
        <rect x="96" y="60" width="80" height="2" fill="#E2E8F0" rx="1"/>
        <rect x="96" y="66" width="60" height="2" fill="#E2E8F0" rx="1"/>
      </svg>
    ),
    executive: (
      <svg viewBox="0 0 200 280" className="w-full h-full">
        <rect width="200" height="280" fill="#1E1B4B" rx="8"/>
        {/* Gold accent */}
        <rect x="0" y="0" width="200" height="4" fill="#F59E0B"/>
        <rect x="16" y="16" width="80" height="5" fill="#FDE68A" rx="2.5"/>
        <rect x="16" y="28" width="60" height="3" fill="#94A3B8" rx="1.5"/>
        <rect x="16" y="38" width="40" height="3" fill="#94A3B8" rx="1.5"/>
        <rect x="16" y="52" width="50" height="4" fill="#FDE68A" rx="2"/>
        <rect x="16" y="62" width="160" height="3" fill="#334155" rx="1.5"/>
        <rect x="16" y="70" width="120" height="3" fill="#334155" rx="1.5"/>
        <rect x="16" y="84" width="50" height="4" fill="#FDE68A" rx="2"/>
        <rect x="16" y="94" width="140" height="3" fill="#334155" rx="1.5"/>
        <rect x="16" y="102" width="100" height="3" fill="#334155" rx="1.5"/>
        <rect x="16" y="116" width="40" height="4" fill="#FDE68A" rx="2"/>
        <rect x="16" y="126" width="50" height="3" fill="#334155" rx="1.5"/>
        <rect x="72" y="126" width="60" height="3" fill="#334155" rx="1.5"/>
      </svg>
    ),
    tech: (
      <svg viewBox="0 0 200 280" className="w-full h-full">
        <rect width="200" height="280" fill="white" rx="8"/>
        {/* Tech header */}
        <rect x="16" y="16" width="40" height="5" fill="#06B6D4" rx="2.5"/>
        <rect x="16" y="28" width="80" height="4" fill="#0F172A" rx="2"/>
        <rect x="16" y="38" width="60" height="3" fill="#64748B" rx="1.5"/>
        {/* Tech tags */}
        <rect x="16" y="50" width="30" height="3" fill="#06B6D4" rx="1.5"/>
        <rect x="52" y="50" width="40" height="3" fill="#06B6D4" rx="1.5"/>
        <rect x="98" y="50" width="35" height="3" fill="#06B6D4" rx="1.5"/>
        {/* Experience */}
        <rect x="16" y="64" width="50" height="4" fill="#0F172A" rx="2"/>
        <rect x="16" y="74" width="160" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="82" width="120" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="96" width="50" height="4" fill="#0F172A" rx="2"/>
        <rect x="16" y="106" width="140" height="3" fill="#F1F5F9" rx="1.5"/>
        <rect x="16" y="114" width="100" height="3" fill="#F1F5F9" rx="1.5"/>
        {/* Skills progress bars */}
        <rect x="16" y="128" width="40" height="4" fill="#0F172A" rx="2"/>
        <rect x="16" y="138" width="120" height="3" fill="#06B6D4" rx="1.5"/>
        <rect x="16" y="146" width="100" height="3" fill="#06B6D4" rx="1.5"/>
        <rect x="16" y="154" width="80" height="3" fill="#06B6D4" rx="1.5"/>
      </svg>
    )
  };

  return (
    <div className={cn("w-full h-full", className)}>
      {previews[template] || previews.modern}
    </div>
  );
}