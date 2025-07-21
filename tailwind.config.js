/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // اگر پروژه Next.js هست
    "./app/**/*.{js,ts,jsx,tsx}", // اگر از app directory استفاده می‌کنی
    "./pages/**/*.{js,ts,jsx,tsx}", // اگر از pages استفاده می‌کنی
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
