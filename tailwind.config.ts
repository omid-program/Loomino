import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#4C1D95',
        accent:'#FACC15',
        bg:'#F9FAFB',
        textMain:'#111827',
        textMainMuted:'#6B7280',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode:'class',
  plugins: [],
  // plugins: [require('daisyui')],
} satisfies Config;
