/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          primary: '#1E3A5F',
          navy: '#1E3A5F',
          accent: '#2563EB',
          'accent-hover': '#1D4ED8',
        },
        surface: {
          base: '#F5F0EB',
          card: '#FAF7F4',
          muted: '#EDE8E3',
          dark: '#111827',
        },
        'text-brand': {
          primary: '#111827',
          secondary: '#374151',
          muted: '#6B7280',
          inverse: '#FFFFFF',
        },
        status: {
          available: '#059669',
          reserved: '#D97706',
          sold: '#DC2626',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#128C7E',
        },
        "black-100": "#2B2C35",
        "primary-blue": {
          DEFAULT: "#2563EB",
          100: "#F5F8FF",
        },
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
      },
      backgroundImage: {
        'pattern': "url('/pattern.png')",
        'hero-bg': "url('/hero-bg.png')",
      },
    },
  },
  plugins: [],
};
