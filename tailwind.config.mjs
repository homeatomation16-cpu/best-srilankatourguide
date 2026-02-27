/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-poppins)"],
        heading: ["var(--font-playfair)"],
        sinhala: ["var(--font-sinhala)"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

export default config;