const { fontFamily } = require('tailwindcss/defaultTheme');

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
          500: '#00c4fd',
        },
        portfolio: {
          1: '#7c1427',
          2: '#6a0f1d',
          3: '#580a14',
          4: '#45050a',
          5: '#330000',
        },
        dark: '#333333',
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
