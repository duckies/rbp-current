/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Wotfard', 'system-ui', '--apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'hero': 'linear-gradient(107.67deg, #3220FF 0%, rgba(17, 31, 0, 0.47) 99.5%);',
        'hero-overlay': 'linear-gradient(to top, rgb(0 0 0 / 100%), rgb(0 0 0 / 15%) 75%);',
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [],
};
