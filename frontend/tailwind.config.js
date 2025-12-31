/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-rethink-sans)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        slate: {
          850: '#0f172a',
          900: '#020617',
          925: '#0B1221',
        },
        primary: { 500: '#3b82f6', 600: '#2563eb' },
        accent: { 500: '#a855f7' }
      },
    },
  },
  plugins: [],
};
