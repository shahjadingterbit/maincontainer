/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#25316D",
        secondary: "#FEF5AC",
      },
      gridTemplateColumns: {
        process: "50px 1fr",
        blog: "230px 1fr",
      },
    },
  },
};
