/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#000000",
        "on-primary": "#ffffff",
        ink: "#000000",
        body: "#999999",
        canvas: "#ffffff",
        "canvas-dark": "#010120",
        "surface-dark": "var(--cf-surface-dark)",
        "surface-dark-soft": "#313641",
        "on-dark": "#ffffff",
        "accent-orange": "#fc4c02",
        "accent-magenta": "#ef2cc1",
        "accent-periwinkle": "#bdbbff",
        "accent-mint": "#c8f6f9",
        hairline: "#ebebeb",
      },
      fontFamily: {
        display: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        xs: '3.25px',
        sm: '4px',
        md: '8px',
        full: '9999px',
      },
      spacing: {
        xxs: '2px',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '44px',
        '5xl': '48px',
        '6xl': '55.2px',
        section: '80px',
      },
    },
  },
  plugins: [],
}
