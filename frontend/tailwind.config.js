/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',      // Fresh blue color for buttons, links
        secondary: '#ff4c00',    // Vibrant orange for accents
        background: 'black',   // Light background color for the site
        dark: '#333',            // Dark text color for readability
        lightGray: '#e0e0e0',    // For borders, shadows, etc.
      },
      fontFamily: {
        kantumruy: ['Kantumruy Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}