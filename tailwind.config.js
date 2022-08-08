/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pale-cream": "#FFF9CA",
        "pale-orange": "#FFDEB4",
        "pale-red": "#FFB4B4",
        "pale-purple": "#B2A4FF",
        "pale-dark-blue": "#3C4262"
      }
    },
  },
  plugins: [],
  darkMode: "class"
}
