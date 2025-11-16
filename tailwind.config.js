/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',     // Ninja Orange
        secondary: '#004E89',   // Deep Blue
        accent: '#F7931E',      // Gold
        success: '#00D9FF',     // Cyan
        dark: '#1A1A2E',        // Dark background
        light: '#F8F9FA',       // Light background
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
