/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors (AgentVoice-inspired)
        primary: {
          dark: '#32373c',
          gray: '#1e293b',
          light: '#f8fafc',
        },
        // Accent Colors
        accent: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          purple: '#8b5cf6',
          orange: '#f97316',
        },
        // Semantic Colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        // Text Colors
        text: {
          primary: '#0f172a',
          secondary: '#64748b',
          tertiary: '#94a3b8',
          inverse: '#f8fafc',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',      // 12px
        'sm': '0.875rem',     // 14px
        'base': '1rem',       // 16px
        'lg': '1.125rem',     // 18px
        'xl': '1.25rem',      // 20px
        '2xl': '1.5rem',      // 24px
        '3xl': '1.875rem',    // 30px
        '4xl': '2.25rem',     // 36px
        '5xl': '3rem',        // 48px
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(102, 126, 234, 0.4)',
        'glow-lg': '0 0 60px rgba(102, 126, 234, 0.6)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
