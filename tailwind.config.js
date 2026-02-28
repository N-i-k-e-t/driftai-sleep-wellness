/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        drift: {
          bg: '#0f0a2e',
          card: '#1a1145',
          accent: '#7c3aed',
          glow: '#a78bfa',
          text: '#e2e8f0',
          muted: '#94a3b8'
        }
      }
    }
  },
  plugins: []
}
