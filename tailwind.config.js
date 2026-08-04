/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueprint: {
          bg: 'var(--blueprint-bg, #081220)',
          accent: 'var(--blueprint-accent, #00f0ff)',
          warn: 'var(--blueprint-warn, #ffad00)',
          text: 'var(--blueprint-text, #ededed)',
          textDim: 'var(--blueprint-text-dim, #888888)',
          border: 'var(--blueprint-border, #1f1f1f)',
        }
      },
      fontFamily: {
        blueprint: ['var(--blueprint-font)', 'monospace'],
      }
    },
  },
  plugins: [],
}
