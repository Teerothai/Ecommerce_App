/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pink': {
          300: '#ff8ab7',
          400: '#ff8ab7',
          500: '#ff8ab7',
        },
        'peach': {
          200: '#f7c77c',
          300: '#f7c77c',
        },
        'purple': {
          400: '#b2a5f2',
        },
        'teal': {
          400: '#5ddbba',
          500: '#5ddbba',
        },
        'amber': {
          800: '#6c4200',
          900: '#6c4200',
        }
      },
      backgroundImage: {
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};