/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Indigo 500
        secondary: "#10b981", // Emerald 500
        accent: "#f43f5e", // Rose 500
        darkBase: "#09090b", // Zinc 950
        darkSurface: "#18181b", // Zinc 900
      }
    },
  },
  plugins: [],
}
