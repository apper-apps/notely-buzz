/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#5B4B8A',
        secondary: '#7C6BA0',
        accent: '#E67E50',
        surface: '#FFFFFF',
        background: '#F8F7F4',
        success: '#4CAF50',
        warning: '#FFA726',
        error: '#EF5350',
        info: '#42A5F5',
      },
      animation: {
        'pulse-save': 'pulse 0.5s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}