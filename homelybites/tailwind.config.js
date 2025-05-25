/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#FC7D7D",
      },
      fontFamily: {
        amaranth: ['Amaranth', 'sans-serif'],
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },    },
  },
  plugins: [],
}


