// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Esta línea es la más importante
  ],
  theme: {
    extend: {
      colors: {
        'azul-electrico': '#00BFFF',
        'rojo-potente': '#FF4500',
        'dark-translucent': 'rgba(25, 25, 30, 0.7)',
        'blue-glow': 'rgba(0, 191, 255, 0.2)',
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(0, 191, 255, 0.6)',
        'neon-red': '0 0 15px rgba(255, 69, 0, 0.6)',
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config