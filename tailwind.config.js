/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Proxima Nova"', "sans-serif"],
        brand: ["Optima", "sans-serif"],
      },
      colors: {
        black: "#000000",
        black50: "rgba(0, 0, 0, 0.5)",
        black80: "rgba(0, 0, 0, 0.8)",
        white: "#FFFFFF",
        f1: "#F1F1F1",
        f9: "#F9F9F9",
        light: "#F9F9F9",
        inactive: "#ccc",
        disabled: "#9B9B9B",
        danger: "#FF0000",
      },
      boxShadow: {
        header: "8px 6px 12px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
