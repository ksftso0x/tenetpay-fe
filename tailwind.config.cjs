/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      xs: "600px",
      sm: "815px",
      xl: "1280px",
      lg: "1024px",
      "2xl": "1536px",
      md: "768px",
    }
  },
  plugins: [],
}