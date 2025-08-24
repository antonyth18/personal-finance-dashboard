/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-custom-green': 'rgb(12, 159, 100)',
        'my-blue': 'rgb(15,137,155)',
        'big-black': 'rgb(19,19,19)',
        'card-color': 'rgb(27,26,31)'
      }
    },
  },
  plugins: [],
};