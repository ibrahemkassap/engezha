import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F9F8FC",          // Light background: درجة أوف-وايت مائلة للبنفسجي الناعم
          card: "#FFFFFF",        // Clean card surface
          text: "#1E1B2E",        // الرمادي الداكن للنصوص
          muted: "#6E6B7B",       // الرمادي المتوسط للنصوص الفرعية
          primary: "#5B2C6F",     // البنفسجي الملكي (Primary Brand / Accent)
          primaryHover: "#4A154B",
          accent: "#FF6B00",      // البرتقالي المنطلق (Action Accent CTA)
          accentHover: "#E05E00",
          action: "#FF6B00",      // Alias for action CTA
          actionHover: "#E05E00",
          deep: "#1E1B2E",        // Deep brand dark
          subtle: "#F3EEFA",      // Subtle purple surface tint
          border: "#E5E0EE",      // Soft purple-tinted divider/border
          positive: "#15803D",
          attention: "#FF6B00",
          error: "#DC2626",
          dark: {
            bg: "#0F0C1B",        // Deep Navy Background
            surface: "#1A162B",   // Surface / Cards
            border: "#2D2744",    // Borders & Dividers
            primary: "#8A4FFF",   // Royal Purple Neon
            action: "#FF7A1A",    // Action Accent CTA
            text: "#F3F0F9",      // Text Main
            muted: "#A098B5",     // Text Muted
          },
        },
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "Cairo", "IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
