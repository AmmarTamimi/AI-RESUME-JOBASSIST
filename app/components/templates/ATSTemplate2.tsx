import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function ATSModernTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const aboutText = personalInfo.summary;

  const contactItems = contactSection?.items || [];
  const contactStrings: string[] = contactItems.length > 0
    ? contactItems
        .map((item) => (typeof item === "object" && item !== null && "description" in item ? String(item.description) : ""))
        .filter(Boolean)
    : [personalInfo.phone, personalInfo.email, personalInfo.location, personalInfo.website].filter(Boolean) as string[];

  return (
    <div className="atsm-template data-resume-root">
      <div className="name data-resume-root">{personalInfo.fullName}</div>
      <div className="title data-resume-root">{personalInfo.title || "Professional"}</div>
      <div className="contactLine data-resume-root">{contactStrings.join("   â€¢   ")}</div>

      {aboutText && (
        <div className="section data-resume-root">
          <div className="sectionTitle data-resume-root">Summary</div>
          <p className="bodyText">{aboutText}</p>
        </div>
      )}

      {experienceSection && experienceSection.items.length > 0 && (
        <div className="section data-resume-root">
          <div className="sectionTitle data-resume-root">{experienceSection.title || 'Experience'}</div>
          {experienceSection.items.map((job, i) => (
            <div className="entry data-resume-root" key={i}>
              <div className="entryRow data-resume-root">
                <span className="entryRole">{job.role || "Position"}</span>
                <span className="entryDate">{job.start} â€“ {job.end || "Present"}</span>
              </div>
              <div className="entryCompany data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
              {job.bullets && job.bullets.length > 0 && (
                <div className="bullets data-resume-root">
                  {job.bullets.map((b, bi) => (
                    <div className="bulletLine data-resume-root" key={bi}>- {b}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {educationSection && educationSection.items.length > 0 && (
        <div className="section data-resume-root">
          <div className="sectionTitle data-resume-root">{educationSection.title || 'Education'}</div>
          {educationSection.items.map((edu, i) => (
            <div className="entry data-resume-root" key={i}>
              <div className="entryRow data-resume-root">
                <span className="entryRole">{edu.school}</span>
                <span className="entryDate">{edu.start} â€“ {edu.end}</span>
              </div>
              <div className="entryCompany data-resume-root">{edu.degree}</div>
            </div>
          ))}
        </div>
      )}

      {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
        <div className="section data-resume-root">
          <div className="sectionTitle data-resume-root">{ratedSkillsSection.title || 'Skills'}</div>
          <p className="bodyText">{ratedSkillsSection.items.map((s) => s.name).join(", ")}</p>
        </div>
      )}

      {referencesSection && referencesSection.items.length > 0 && (
        <div className="section data-resume-root">
          <div className="sectionTitle data-resume-root">{referencesSection.title || 'References'}</div>
          {referencesSection.items.map((ref, i) => (
            <div className="entry data-resume-root" key={i}>
              <div className="entryRole data-resume-root">{ref.name}</div>
              <div className="entryCompany data-resume-root">
                {[ref.phone, ref.email].filter(Boolean).join("  Â·  ")}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .atsm-template {
          width: 100%;
          min-height: 100%;
          background: #ffffff;
          color: #101010;
          font-family: ${t.bodyFont || "Arial"}, Helvetica, sans-serif;
          padding: 40px 52px 46px;
          box-sizing: border-box;
        }

        .name {
          font-size: 24px;
          font-weight: 700;
          color: #101010;
        }

        .title {
          font-size: 12.5px;
          color: #444444;
          margin-top: 3px;
        }

        .contactLine {
          font-size: 11px;
          color: #444444;
          margin-top: 10px;
          padding-bottom: 14px;
          border-bottom: 2px solid ${t.accentColor || "#0E7C7B"};
        }

        .section {
          margin-top: 20px;
        }

        .sectionTitle {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: ${t.accentColor || "#0E7C7B"};
          border-left: 3px solid ${t.accentColor || "#0E7C7B"};
          padding-left: 8px;
          margin-bottom: 10px;
        }

        .bodyText {
          font-size: 12.5px;
          line-height: 1.7;
          color: #1a1a1a;
          margin: 0;
        }

        .entry {
          margin-bottom: 14px;
        }

        .entryRow {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
        }

        .entryRole {
          font-size: 12.5px;
          font-weight: 700;
          color: #101010;
        }

        .entryDate {
          font-size: 11px;
          color: #555555;
        }

        .entryCompany {
          font-size: 11.5px;
          color: #444444;
          margin-top: 2px;
        }

        .bullets {
          margin-top: 6px;
        }

        .bulletLine {
          font-size: 12px;
          line-height: 1.6;
          color: #1a1a1a;
          margin-bottom: 3px;
        }

        @media print {
          .atsm-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}


