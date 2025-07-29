import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#dcba92',
        accent:'#dbd0c0',
        bg:'#1d1d1d',
        textMain:'#dcba92',
        textMainMuted:'#dbd0c0',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode:'class',
  plugins: [],
  // plugins: [require('daisyui')],
} satisfies Config;
