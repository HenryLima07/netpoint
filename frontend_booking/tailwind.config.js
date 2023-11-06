/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "rounded-button-yellow":
          "7px 7px 0px 0px #FFDE59, 7px 7px 0px 1px #000000",
        "rounded-button-yellow-no-border":
          "7px 7px 0px 0px #FFDE59, 7px 7px 0px 1px #000000",
        "rounded-button-sky":
          "7px 7px 0px 0px #229CFF, 7px 7px 0px 1px #000000",
        "rounded-button-sky-no-border": "7px 7px 0px 0px #229CFF",
        "rounded-button-lime":
          "7px 7px 0px 0px #CBF51A, 7px 7px 0px 1px #000000",
        "rounded-button-lime-no-border": "7px 7px 0px 0px #CBF51A",
        "rounded-button-azure":
          "7px 7px 0px 0px #638FF5, 7px 7px 0px 1px #000000",
        "rounded-courts-location": "17px 17px 0px -3px #000000",
        cards: "0px 5px 10px 1px #c8c8c8",
      },
    },
    colors: {
      "lime-yellow": "#CBF51A",
      "mustard-yellow": "#FFDE59",
      "usafa-blue": "#004398",
      "lapis-lazuli": "#26649B",
      "neon-sky": "#229CFF",
      azure: "#638FF5",
      "pure-white": "#FFFFFF",
      "dark-gray": "#2E3646",
      "light-gray": "#5F6D7E",
      black: "#000000",
      neutral: "#E6E9EC",
    },
    fontFamily: {
      nunito: "Nunito, sans-serif",
      bebas: "Bebas Neue, cursive",
      inter: "Inter, sans-serif",
    },
  },
  plugins: [],
};
