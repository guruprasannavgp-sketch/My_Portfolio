/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'rebirth-bg': '#000000',
        'rebirth-fg': '#F5F5F5',
        'rebirth-accent': '#FFD1DC',
      }
    },
  },
  plugins: [],
}
