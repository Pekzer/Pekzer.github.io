const { fontFamily } = require('tailwindcss/defaultTheme');

//Paleta principal '#7c1427', '#6a0f1d', '#580a14', '#45050a', '#374151', '#1F2937', '#111827', '#030712', '#000000', '#ffffff'
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          400: '#00E0F3',
        },
        portfolio: {
          1: '#7c1427',
          2: '#6a0f1d',
          3: '#580a14',
          4: '#45050a',
        },
        // Paleta clara: grises realmente usados (escala gray de Tailwind v2)
        light: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Paleta oscura: grises usados con la variante `dark:`
        dark: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        // Blanco y negro (fondos y overlays)
        white: '#ffffff',
        black: '#000000',
      },
      animation: {
        'gradient-x': 'gradient-x 8s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%': {
            'background-position': '200% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
