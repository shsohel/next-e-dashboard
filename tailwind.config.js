/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        poppins: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#2684FF',
        secondary: '#0F172A',
        danger: '#FF0000',
        success: '#5cb85c',
        info: '#5bc0de',
        warning: '#f0ad4e',
        'secondary-light': '#63245D',
        'gradient-one': '#32003B',
        'gradient-two': '#3E002F',
        'gradient-white': '#FFFFFF',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
