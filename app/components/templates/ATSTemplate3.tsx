import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function ATSCompactTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const contactSection = sections.find(
    (s) => s.type === "custom" && s.id === "contact",
  );
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const aboutText = personalInfo.summary;

  const contactItems = contactSection?.items || [];
  const contactStrings: string[] =
    contactItems.length > 0
      ? contactItems
          .map((item) =>
            typeof item === "object" &&
            item !== null &&
            "description" in item
              ? String(item.description)
              : "",
          )
          .filter(Boolean)
      : ([
          personalInfo.phone,
          personalInfo.email,
          personalInfo.location,
          personalInfo.website,
        ].filter(Boolean) as string[]);

  return (
    <div className="atsx-template data-resume-root">
      <div className="headerBlock data-resume-root">
        <div className="name data-resume-root">{personalInfo.fullName}</div>
        <div className="title data-resume-root">
          {personalInfo.title || "Professional"}
        </div>
        <div className="contactLine data-resume-root">
          {contactStrings.join("   |   ")}
        </div>
      </div>

      {aboutText && (
        <div className="section data-resume-root">
          <div className="sectionTitle data-resume-root">Summary</div>
          <p className="bodyText">{aboutText}</p>
        </div>
      )}

      {experienceSection && experienceSection.items.length > 0 && (
        <div className="section data-resume-root">
          <div className="sectionTitle data-resume-root">
            {experienceSection.title || "Experience"}
          </div>
          {experienceSection.items.map((job, i) => (
            <div className="entry data-resume-root" key={i}>
              <div className="entryHead data-resume-root">
                <span className="entryRole">
                  {job.role || "Position"}
                  {job.company ? `, ${job.company}` : ""}
                </span>
                <span className="entryDate">
                  {job.start} – {job.end || "Present"}
                </span>
              </div>
              {job.location && (
                <div className="entrySub data-resume-root">{job.location}</div>
              )}
              {job.bullets && job.bullets.length > 0 && (
                <ul className="bullets data-resume-root">
                  {job.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {educationSection && educationSection.items.length > 0 && (
        <div className="section data-resume-root">
          <div className="sectionTitle data-resume-root">
            {educationSection.title || "Education"}
          </div>
          {educationSection.items.map((edu, i) => (
            <div className="entry data-resume-root" key={i}>
              <div className="entryHead data-resume-root">
                <span className="entryRole">
                  {edu.degree}
                  {edu.school ? `, ${edu.school}` : ""}
                </span>
                <span className="entryDate">
                  {edu.start} – {edu.end}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
        <div className="section data-resume-root">
          <div className="sectionTitle data-resume-root">
            {ratedSkillsSection.title || "Skills"}
          </div>
          <p className="bodyText">
            {ratedSkillsSection.items.map((s) => s.name).join(", ")}
          </p>
        </div>
      )}

      {referencesSection && referencesSection.items.length > 0 && (
        <div className="section data-resume-root">
          <div className="sectionTitle data-resume-root">
            {referencesSection.title || "References"}
          </div>
          {referencesSection.items.map((ref, i) => (
            <div className="entry data-resume-root" key={i}>
              <div className="entryHead data-resume-root">
                <span className="entryRole">{ref.name}</span>
                <span className="entryDate">
                  {[ref.phone, ref.email].filter(Boolean).join(" · ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .atsx-template {
          width: 100%;
          min-height: 100%;
          background: #ffffff;
          color: #141414;
          font-family: ${t.bodyFont || "Arial"}, Helvetica, sans-serif;
          padding: 44px 56px 52px;
          box-sizing: border-box;
          font-size: 12.5px;
          line-height: 1.6;
        }

        .headerBlock {
          padding-bottom: 16px;
          border-bottom: 2px solid ${t.accentColor || "#7A1E1E"};
        }

        .name {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: 0.3px;
          color: ${t.accentColor || "#7A1E1E"};
        }

        .title {
          font-size: 13px;
          color: #444444;
          margin-top: 4px;
        }

        .contactLine {
          font-size: 11.5px;
          color: #444444;
          margin-top: 10px;
        }

        .section {
          margin-top: 22px;
        }

        .sectionTitle {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: ${t.accentColor || "#7A1E1E"};
          margin-bottom: 10px;
          padding-bottom: 4px;
          border-bottom: 1px solid #e5e5e5;
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

        .entryHead {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 8px;
        }

        .entryRole {
          font-weight: 700;
          font-size: 13px;
          color: #141414;
        }

        .entryDate {
          font-size: 11.5px;
          color: #666666;
          white-space: nowrap;
        }

        .entrySub {
          font-size: 11.5px;
          font-style: italic;
          color: #666666;
          margin-top: 2px;
        }

        .bullets {
          margin: 6px 0 0;
          padding-left: 18px;
          list-style: none;
        }

        .bullets li {
          font-size: 12.5px;
          line-height: 1.65;
          color: #1a1a1a;
          margin-bottom: 3px;
          position: relative;
          padding-left: 14px;
        }

        .bullets li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${t.accentColor || "#7A1E1E"};
        }

        @media print {
          .atsx-template {
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}