/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F282F",
        secondary: "#F2ECEC",
        Background: "#F7F6F2",
        error: "#BD3c3c",
      },
      fontFamily: {
        Figtree: ["Figtree", "sans-serif"],
      },
    },
  },
  plugins: [],
}