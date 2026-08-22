import type { TemplateMeta } from "../../types/Content";

// If you'd rather keep this as DB rows fetched at runtime, use templates.json
// with this file's shape (TemplateMeta) as the row type instead of importing
// this array directly.
export const templates: TemplateMeta[] = [
  {
    id: "modern-01",
    name: "Modern",
    category: "Modern",
    thumbnail: "/thumbnails/modern.svg",
    component: "ModernTemplate",
    layout: "sidebar-left",
    defaultTheme: {
      primaryColor: "#1F2A44",
      accentColor: "#C08A3E",
      backgroundColor: "#FFFFFF",
      textColor: "#1E1E1E",
      mutedColor: "#6B7280",
      headingFont: "Poppins",
      bodyFont: "Inter",
      fontScale: "md",
      radius: "md",
    },
    allowedFonts: ["Inter", "Poppins", "Roboto", "Merriweather"],
  },
 {
  id: "modern-02",
  name: "Modern Professional",
  category: "Modern",
  thumbnail: "/thumbnails/modern-02.jpg",
  component: "ModernTemplate2",
  layout: "sidebar-left",

  defaultTheme: {
    primaryColor: "#2E687D",
    accentColor: "#2E687D",
    backgroundColor: "#FFFFFF",
    textColor: "#3F3F3F",
    mutedColor: "#777777",

    headingFont: "Roboto Slab",
    bodyFont: "Roboto",

    fontScale: "md",
    radius: "none",
  },

  allowedFonts: [
    "Roboto",
    "Roboto Slab",
    "Poppins",
    "Inter",
  ],
},

{
  id: "modern-03",
  name: "Modern Timeline",
  category: "Modern",
  thumbnail: "/thumbnails/modern-03.jpg",
  component: "ModernTemplate3",
  layout: "sidebar-left",

  defaultTheme: {
    primaryColor: "#777674",
    accentColor: "#7B2CFF",
    backgroundColor: "#FFFFFF",
    textColor: "#4A4A4A",
    mutedColor: "#777777",

    headingFont: "Arial",
    bodyFont: "Arial",

    fontScale: "md",
    radius: "none",
  },

  allowedFonts: [
    "Arial",
    "Roboto",
    "Poppins",
    "Inter",
  ],
},
  {
    id: "minimal-02",
    name: "Minimal",
    category: "Minimal",
    thumbnail: "/thumbnails/minimal.svg",
    component: "MinimalTemplate",
    layout: "single-column",
    defaultTheme: {
      primaryColor: "#111111",
      accentColor: "#111111",
      backgroundColor: "#FFFFFF",
      textColor: "#1A1A1A",
      mutedColor: "#8A8A8A",
      headingFont: "Playfair Display",
      bodyFont: "Inter",
      fontScale: "md",
      radius: "none",
    },
    allowedFonts: ["Inter", "Playfair Display", "Roboto"],
  },
  {
    id: "professional-03",
    name: "Professional",
    category: "Professional",
    thumbnail: "/thumbnails/professional.svg",
    component: "ProfessionalTemplate",
    layout: "two-column",
    defaultTheme: {
      primaryColor: "#0B3B5C",
      accentColor: "#A98A3E",
      backgroundColor: "#FDFCFA",
      textColor: "#20242A",
      mutedColor: "#5B6470",
      headingFont: "Merriweather",
      bodyFont: "Roboto",
      fontScale: "md",
      radius: "sm",
    },
    allowedFonts: ["Merriweather", "Roboto", "Inter"],
  },
 {
  id: "minimal-03",
  name: "Figma Minimal",
  category: "Minimal",
  thumbnail: "/thumbnails/figma-01.svg",
  component: "MinimalTemplate3",

  layout: "single-column",

  defaultTheme: {
      primaryColor: "#212121",
      accentColor: "#212121",
      backgroundColor: "#FFFFFF",
      textColor: "#212121",
      mutedColor: "#212121",
      headingFont: "IBM Plex Sans",
      bodyFont: "Hind",
      fontScale: "md",
      radius: "none",
    },

  allowedFonts: [
    "IBM Plex Sans",
    "Hind",
    "Inter",
    "Roboto",
    "Poppins",
  ],

  layoutConfig: {
    pageWidth: 595,
    pageHeight: 842,

    sectionLabelWidth: 140,
    contentWidth: 375,
    contentStartX: 180,

    sectionGap: 28,

    headingFont: "IBM Plex Sans",
    bodyFont: "Hind",

    headingSize: 13,
    bodySize: 11,
  },
},
  {
    id: "business-04",
    name: "Business",
    category: "Business",
    thumbnail: "/thumbnails/business.svg",
    component: "BusinessTemplate",
    layout: "header-band",
    defaultTheme: {
      primaryColor: "#7A1F2B",
      accentColor: "#7A1F2B",
      backgroundColor: "#FFFFFF",
      textColor: "#1E1E1E",
      mutedColor: "#6B7280",
      headingFont: "Roboto Condensed",
      bodyFont: "Inter",
      fontScale: "md",
      radius: "none",
    },
    allowedFonts: ["Roboto Condensed", "Inter", "Poppins"],
  },
];