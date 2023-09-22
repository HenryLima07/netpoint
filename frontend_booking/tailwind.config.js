/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "rounded-button-yellow": "7px 7px 0px 0px #FFDE59",
        "rounded-button-sky": "5px 5px 0px 0px #229CFF",
        "rounded-courts-location": "17px 17px 0px -3px #000000",
      }
    },
    colors: {
      "lime-yellow": "#CBF51A",
      "mustard-yellow": "#FFDE59",
      "usafa-blue": "#004398",
      "lapis-lazuli": "#26649B",
      "neon-sky": "#229CFF",
      "pure-white": "#FFFFFF",
      "dark-gray": "#2E3646",
      "light-gray": "#5F6D7E",
      "black": "#000000",
      "neutral": "#E6E9EC"

    },
    fontFamily: {
      "nunito": "Nunito, sans-serif",
      "bebas": "Bebas Neue, cursive",
      "inter":  "Inter, sans-serif", 
    }
  },
  plugins: [],
}