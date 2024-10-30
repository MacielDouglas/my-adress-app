/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        clara: "#EEF0F2",
        escura_light: "#1c2129",
        escura_dark: "#363636",
        verde: "#cfff92",
        laranja: "#FF3500",
        text_dark_secundary: "#696969",
      },
    },
  },
  plugins: [],
};
