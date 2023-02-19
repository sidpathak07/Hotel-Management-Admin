/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "electric-blue": "#373e98",
        "hot-pink": "#f16775",
        "shocking-yellow": "#fee36e",
        "chrome-yellow": "#ceb92c",
        "darkest-gray": "#2a2a2a",
      },
    },
  },
  plugins: [
    require("@shrutibalasa/tailwind-grid-auto-fit"),
    require("@tailwindcss/forms"),
  ],
};
