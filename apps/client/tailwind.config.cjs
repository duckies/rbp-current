const TailwindForms = require("@tailwindcss/forms");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-wotfard)", "system-ui", "sans-serif"],
      },
      colors: {
        class: {
          6: "#c41e3a", // Death Knight
          12: "#a330c9", // Demon Hunter
          11: "#ff7c0a", // Druid
          13: "#33937f", // Evoker
          3: "#aad372", // Hunter
          8: "#3fc7eb", // Mage
          10: "#00ff96", // Monk
          2: "#f48cba", // Paladin
          5: "#fffff", // Priest
          4: "#fff468", // Rogue
          7: "#8788ee", // Shaman
          9: "#c69b6d", // Warlock
        },
        surface: {
          50: "#E8E5EB",
          100: "#D1CBD7",
          200: "#A699B2",
          300: "#786788",
          400: "#4A4054",
          500: "#1D1921",
          600: "#17141A",
          700: "#120F14",
          800: "#0D0B0F",
          900: "#050406",
        },
        gray: {
          50: "#fafafa",
          100: "#ebebeb",
          200: "#e1e1e1",
          300: "#c1c1c1",
          400: "#a1a1a1",
          500: "#818181",
          600: "#616161",
          700: "#414141",
          800: "#2b2b2b",
          850: "#1a1a1a",
          900: "#111",
        },
        yellow: {
          DEFAULT: "#f9cb58",
          50: "#fefaf0",
          100: "#fef4dd",
          200: "#fdeaba",
          300: "#fbe19d",
          400: "#fad67a",
          500: "#f9cb58",
          600: "#f7b818",
          700: "#c58f07",
          800: "#805d05",
          900: "#402f02",
        },
      },
    },
  },
  plugins: [TailwindForms()],
};
