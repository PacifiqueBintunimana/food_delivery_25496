/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme:{
  fontFamily: {
    poppins: ["Poppins", "sans-serif"],
    dancing: ["Dancing Script", "cursive"],
    raleway: ["Raleway", "sans-serif"],
    inter: ["Inter", "sans-serif"]
  },
  colors: {
    'gray': '#7C6A46',
    'customBlack': "#1C1C1C",
    'white': '#FFFFFF',
    'garyWhite': '#FAFAFA'
  },
  extend: {},
},
plugins: [],
}

