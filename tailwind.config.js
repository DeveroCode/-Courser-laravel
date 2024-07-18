/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      // Set colors
      colors: {
        'primary': '#EDEBF6',
        'text': '#6056A1',
        'title': "#24303f",
        'para': "#3c4858",
      },
      // Set fonts
      fontFamily: {
        'roboto': 'Roboto, sans-serif'
      },
    },
  },
  plugins: [],
}

