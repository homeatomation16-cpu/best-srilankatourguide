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
  plugins: [],
};

export default config;
