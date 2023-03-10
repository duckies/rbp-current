const TailwindForms = require("@tailwindcss/forms")
const TailwindTypography = require("@tailwindcss/typography")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "DM Mono", "monospace"],
      },
      colors: {
        class: {
          "death-knight": "#c41e3a", // Death Knight
          "demon-hunter": "#a330c9", // Demon Hunter
          "druid": "#ff7c0a", // Druid
          "evoker": "#33937f", // Evoker
          "hunter": "#aad372", // Hunter
          "mage": "#3fc7eb", // Mage
          "monk": "#00ff96", // Monk
          "paladin": "#f48cba", // Paladin
          "priest": "#fffff", // Priest
          "rogue": "#fff468", // Rogue
          "shaman": "#0070DD", // Shaman
          "warlock": "#8788EE", // Warlock
          "warrior": "#C69B6D", // Warrior
          "6": "#c41e3a", // Death Knight
          "12": "#a330c9", // Demon Hunter
          "11": "#ff7c0a", // Druid
          "13": "#33937f", // Evoker
          "3": "#aad372", // Hunter
          "8": "#3fc7eb", // Mage
          "10": "#00ff96", // Monk
          "2": "#f48cba", // Paladin
          "5": "#fffff", // Priest
          "4": "#fff468", // Rogue
          "7": "#0070DD", // Shaman
          "9": "#8788EE", // Warlock
          "1": "#C69B6D", // Warrior
        },
        surface: {
          DEFAULT: "#1D1921",
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "color": "#fff",
            "--tw-prose-invert-counters": theme("colors.yellow[300]"),
            "> ul li > *:first-child": {
              marginTop: 0,
            },
            "> ol li > *:first-child": {
              marginTop: 0,
            },
            "> ul li > *:last-child": {
              marginBottom: 0,
            },
            "> ol li > *:last-child": {
              marginBottom: 0,
            },
            // "code::before": null,
            // "code::after": null,
            // "code": {
            //   color: "var(--tw-prose-code)",
            //   backgroundColor: "rgb(144 144 144 / 25%)",
            //   borderRadius: "0.375rem",
            //   padding: "3px 6px",
            //   fontSize: "0.875rem",
            //   fontWeight: "inherit",
            // },
          },
        },
        lg: {
          css: {
            "> ul li > *:first-child": {
              marginTop: 0,
            },
            "> ol li > *:first-child": {
              marginTop: 0,
            },
            "> ul li > *:last-child": {
              marginBottom: 0,
            },
            "> ol li > *:last-child": {
              marginBottom: 0,
            },
            // "code::before": null,
            // "code::after": null,
            // "code": {
            //   color: "var(--tw-prose-code)",
            //   backgroundColor: "rgb(144 144 144 / 25%)",
            //   borderRadius: "0.375rem",
            //   padding: "3px 6px",
            //   fontSize: "0.875rem",
            //   fontWeight: "inherit",
            // },
          },
        },
      }),
      keyframes: {
        "enter-from-right": {
          "0%": { opacity: 0, transform: "translateX(200px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "enter-from-left": {
          "0%": { opacity: 0, transform: "translateX(-200px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "exit-to-right": {
          "0%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(200px)" },
        },
        "exit-to-left": {
          "0%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(-200px)" },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "rotateX(-30deg) scale(0.9)" },
          "100%": { opacity: 1, transform: "rotateX(0) scale(1)" },
        },
        "scale-out": {
          "0%": { opacity: 1, transform: "rotateX(0) scale(1)" },
          "100%": { opacity: 0, transform: "rotateX(-10deg) scale(0.95)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease",
        "fade-out": "fade-out 200ms ease",
        "enter-from-left": "enter-from-left 250ms ease",
        "enter-from-right": "enter-from-right 250ms ease",
        "exit-to-left": "exit-to-left 250ms ease",
        "exit-to-right": "exit-to-right 250ms ease",
      },
    },
  },
  safelist: [
    {
      pattern: /(text-color|bg)-class-(\d)/,
    },
  ],
  plugins: [TailwindForms()],
}
