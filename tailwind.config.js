/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#27708B',
        startcolor: '#27708B',
        endcolor: '#1A4A5E',
        tryBg: '#00AE5B',
        tryText: '#FFFFFF',

        viewcolor: 'whitesmoke',
        editcolor: '#1A4A5E',
        deletecolor: '#1A4A5E',
      },
      zIndex: {
        9: '9',
      },
    },
  },
  plugins: [],
};
