/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#00C853",
          dark: "#00A344",
          light: "#E6F9EE",
        },
        ink: "#0F172A",
        surface: "#F8FAF9",
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};
