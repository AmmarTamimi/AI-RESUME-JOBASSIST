import React from "react";
import type { TemplateProps } from "../../types/Content";

const Icon = {
  phone: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export default function TechTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const aboutText = personalInfo.summary;

  const contactItems = contactSection?.items || [];

  const initials = personalInfo.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // bucket skill level into a tier tag rather than a percent bar
  const tierFor = (level: number) => {
    if (level >= 85) return "expert";
    if (level >= 60) return "proficient";
    return "familiar";
  };

  return (
    <div className="tech-template">
      {/* ================= TOP BAR ================= */}
      <div className="topBar">
        <div className="promptLine">
          <span className="promptSymbol">&gt;</span> whoami
        </div>
        <div className="headerRow">
          {personalInfo.photoUrl ? (
            <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          ) : (
            <div className="photoFallback">{initials || "U"}</div>
          )}
          <div>
            <div className="name">{personalInfo.fullName}</div>
            <div className="title">// {personalInfo.title || "SOFTWARE ENGINEER"}</div>
          </div>
        </div>

        <div className="contactRow">
          {contactItems.length > 0
            ? contactItems.map((item, i) => {
                if (typeof item === "object" && item !== null && "label" in item && "description" in item) {
                  let icon = Icon.pin;
                  if (item.label === "phone") icon = Icon.phone;
                  else if (item.label === "email") icon = Icon.mail;
                  else if (item.label === "web") icon = Icon.globe;
                  return (
                    <span className="contactChip" key={i}>
                      <span className="ic">{icon}</span>{item.description}
                    </span>
                  );
                }
                return null;
              })
            : (
              <>
                {personalInfo.phone && <span className="contactChip"><span className="ic">{Icon.phone}</span>{personalInfo.phone}</span>}
                {personalInfo.email && <span className="contactChip"><span className="ic">{Icon.mail}</span>{personalInfo.email}</span>}
                {personalInfo.location && <span className="contactChip"><span className="ic">{Icon.pin}</span>{personalInfo.location}</span>}
                {personalInfo.website && <span className="contactChip"><span className="ic">{Icon.globe}</span>{personalInfo.website}</span>}
              </>
            )}
        </div>
      </div>

      {/* ================= BODY GRID ================= */}
      <div className="grid">
        <div className="mainCol">
          {aboutText && (
            <div className="block">
              <div className="blockHeader"><span className="hash">#</span> about</div>
              <p className="aboutText">{aboutText}</p>
            </div>
          )}

          {experienceSection && experienceSection.items.length > 0 && (
            <div className="block">
              <div className="blockHeader"><span className="hash">#</span> experience</div>
              {experienceSection.items.map((job, i) => (
                <div className="job" key={i}>
                  <div className="jobTop">
                    <span className="jobTitle">{job.role || "Position"}</span>
                    <span className="jobDate">{job.start} – {job.end || "current"}</span>
                  </div>
                  <div className="jobSub">{job.company}{job.location ? ` · ${job.location}` : ""}</div>
                  {job.bullets && job.bullets.length > 0 && (
                    <div className="jobDesc">{job.bullets[0]}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {referencesSection && referencesSection.items.length > 0 && (
            <div className="block">
              <div className="blockHeader"><span className="hash">#</span> references</div>
              {referencesSection.items.map((ref, i) => (
                <div className="refItem" key={i}>
                  <span className="refName">{ref.name}</span>
                  {ref.phone && <span className="refLine">{ref.phone}</span>}
                  {ref.email && <span className="refLine">{ref.email}</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sideCol">
          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <div className="block">
              <div className="blockHeader"><span className="hash">#</span> stack</div>
              <div className="tagCloud">
                {ratedSkillsSection.items.map((skill, i) => (
                  <span className={`tag tag-${tierFor(skill.level)}`} key={i}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {educationSection && educationSection.items.length > 0 && (
            <div className="block">
              <div className="blockHeader"><span className="hash">#</span> education</div>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem" key={i}>
                  <span className="eduSchool">{edu.school}</span>
                  <span className="eduDegree">{edu.degree}</span>
                  <span className="eduDate">{edu.start} – {edu.end}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .tech-template {
          width: 100%;
          min-height: 100%;
          background: ${t.primaryColor || "#0D0F14"};
          color: #d7dbe0;
          font-family: ${t.bodyFont || "Inter"}, sans-serif;
          padding: 40px 46px 48px;
          box-sizing: border-box;
        }

        .promptLine {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 12px;
          color: ${t.accentColor || "#39E6C5"};
          margin-bottom: 18px;
        }

        .promptSymbol {
          color: #5b6675;
          margin-right: 6px;
        }

        .headerRow {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .photo, .photoFallback {
          width: 58px;
          height: 58px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid ${t.accentColor || "#39E6C5"};
        }

        .photoFallback {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 20px;
          color: ${t.accentColor || "#39E6C5"};
          background: #151821;
        }

        .name {
          font-family: ${t.headingFont || "Space Grotesk"}, sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #f2f4f7;
          letter-spacing: -0.3px;
        }

        .title {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 12px;
          color: ${t.accentColor || "#39E6C5"};
          margin-top: 4px;
        }

        .contactRow {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .contactChip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10.5px;
          color: #aab2bf;
          background: #151821;
          border: 1px solid #232833;
          border-radius: 5px;
          padding: 5px 10px;
        }

        .contactChip .ic {
          color: ${t.accentColor || "#39E6C5"};
          display: flex;
        }

        .grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 36px;
          margin-top: 34px;
        }

        .block {
          margin-bottom: 30px;
        }

        .blockHeader {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 12px;
          letter-spacing: 1px;
          color: #f2f4f7;
          text-transform: lowercase;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid #232833;
        }

        .hash {
          color: ${t.accentColor || "#39E6C5"};
          margin-right: 6px;
        }

        .aboutText {
          font-size: 12.5px;
          line-height: 1.85;
          color: #aab2bf;
          margin: 0;
        }

        .job {
          margin-bottom: 20px;
          padding-left: 14px;
          border-left: 2px solid #232833;
        }

        .jobTop {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
        }

        .jobTitle {
          font-size: 13.5px;
          font-weight: 700;
          color: #f2f4f7;
        }

        .jobDate {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10.5px;
          color: #6b7484;
        }

        .jobSub {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 11px;
          color: ${t.accentColor || "#39E6C5"};
          margin: 3px 0 7px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.7;
          color: #aab2bf;
        }

        .refItem {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
          font-size: 11.5px;
        }

        .refName {
          color: #f2f4f7;
          font-weight: 700;
        }

        .refLine {
          color: #6b7484;
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10.5px;
        }

        .tagCloud {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10.5px;
          padding: 6px 10px;
          border-radius: 5px;
          background: #151821;
          border: 1px solid #232833;
          color: #aab2bf;
        }

        .tag-expert {
          border-color: ${t.accentColor || "#39E6C5"};
          color: ${t.accentColor || "#39E6C5"};
        }

        .eduItem {
          display: flex;
          flex-direction: column;
          margin-bottom: 14px;
          font-size: 11.5px;
        }

        .eduSchool {
          color: #f2f4f7;
          font-weight: 700;
        }

        .eduDegree {
          color: #aab2bf;
          margin-top: 2px;
        }

        .eduDate {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10px;
          color: #6b7484;
          margin-top: 2px;
        }

        @media (max-width: 800px) {
          .grid { grid-template-columns: 1fr; }
          .tech-template { padding: 28px 22px; }
        }

        @media print {
          .tech-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
