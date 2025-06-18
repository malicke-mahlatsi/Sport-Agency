/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'electric-gold': '#FFD700',
        'neon-yellow': '#FFFF00',
        'cyber-purple': '#9D00FF',
        'plasma-blue': '#00D4FF',
        'carbon-black': '#0A0A0A',
        'matrix-green': '#00FF41',
        gold: {
          400: '#FFD700',
          500: '#FFC107',
          600: '#FFB300',
        }
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'shine': 'shine 3s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'shine': {
          '0%': { 'background-position': '0% center' },
          '100%': { 'background-position': '200% center' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#FFD700' },
        },
      },
    },
  },
  plugins: [],
};