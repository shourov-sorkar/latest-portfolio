/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          100: '#1a1a1a',
          200: '#151515',
          300: '#111111',
          400: '#0a0a0a',
          500: '#050505',
        },
        neon: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          purple: '#8b5cf6',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'scan-line': 'scanLine 3s ease-in-out infinite',
        'neon-pulse': 'neonPulse 2s infinite alternate',
        'tech-float': 'techFloat 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px rgba(34, 211, 238, 0.2)' },
          '100%': { textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 30px rgba(34, 211, 238, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        scanLine: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        neonPulse: {
          '0%': { boxShadow: '0 0 5px rgba(34, 211, 238, 0.5), 0 0 10px rgba(34, 211, 238, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(34, 211, 238, 0.5), 0 0 30px rgba(34, 211, 238, 0.3)' },
        },
        techFloat: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) translateX(5px) rotate(1deg)' },
          '50%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '75%': { transform: 'translateY(5px) translateX(-5px) rotate(-1deg)' },
          '100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-cyan': '0 0 5px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3)',
        'neon-blue': '0 0 5px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
      },
    },
  },
  plugins: [],
} 