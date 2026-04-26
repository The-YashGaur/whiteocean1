import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#E6F7FF',
          100: '#BAE7FF',
          200: '#91D5FF',
          300: '#69C0FF',
          400: '#40A9FF',
          500: '#1890FF',
          600: '#096DD9',
          700: '#0050B3',
          800: '#003A8C',
          900: '#002766',
        },
        sunset: {
          50: '#FFF7E6',
          100: '#FFE7BA',
          200: '#FFD591',
          300: '#FFC53D',
          400: '#FFA940',
          500: '#FF7A00',
          600: '#D46B08',
          700: '#AD5800',
          800: '#874D00',
          900: '#613400',
        },
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #FF7A00 0%, #FFA500 50%, #00B4D8 100%)',
        'gradient-ocean': 'linear-gradient(180deg, #00B4D8 0%, #0077B6 100%)',
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'wave': 'wave 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
