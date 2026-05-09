/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        bg:            '#080C14',
        surface:       '#0E1520',
        card:          '#0D1422',
        'card-hover':  '#121A2E',
        border:        '#1E2D45',
        accent:        '#4F8EF7',
        cyan:          '#64FFDA',
        text:          '#E8EDF5',
        'text-secondary': '#8B97B0',
        'text-muted':  '#55647A',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        'cursor-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.2' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to:   { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        blink:          'blink 1s step-end infinite',
        'cursor-pulse': 'cursor-pulse 1.1s ease-in-out infinite',
        'fade-up':      'fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both',
        shimmer:        'shimmer 2.5s linear infinite',
      },
      backgroundImage: {
        'grid-subtle': `
          linear-gradient(rgba(79,142,247,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,142,247,0.04) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        grid: '64px 64px',
      },
      gridTemplateColumns: {
        hero: '1fr 1fr',
      },
    },
  },
  plugins: [],
};
