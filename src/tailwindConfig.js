// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // This tells Tailwind to look for class names in 
    // all files ending in .js, .jsx, .ts, or .tsx inside the 'src' folder.
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}