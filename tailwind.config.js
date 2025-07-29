/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // اگر پروژه Next.js هست
    "./app/**/*.{js,ts,jsx,tsx}", // اگر از app directory استفاده می‌کنی
    "./pages/**/*.{js,ts,jsx,tsx}", // اگر از pages استفاده می‌کنی
  ],
  theme: {
    extend: {
            colors: {
        primary:'#dcba92',
        accent:'#dbd0c0',
        bg:'#1d1d1d',
        textMain:'#dcba92',
        textMainMuted:'#dbd0c0',
        hover:'#6b8a97',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
}
