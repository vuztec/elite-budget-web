/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#27708B",
        startcolor: "#27708B",
        endcolor: "#1A4A5E",

        viewcolor: "#ffe99b",
        editcolor: "#1A4A5E",
        deletecolor: "#1A4A5E",
      },
    },
  },
  plugins: [],
};
