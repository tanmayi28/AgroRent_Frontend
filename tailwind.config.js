/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./*.jsx",
    "./*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          green: '#22c55e',
          'green-dark': '#16a34a',
        },
        accent: {
          orange: '#f97316',
          'orange-dark': '#ea580c',
        },
      },
    },
  },
  plugins: [],
}

