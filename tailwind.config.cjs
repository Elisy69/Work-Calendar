/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      todo: ["Indie Flower", "cursive"],
    },
    extend: {},
  },
  plugins: [],
};
