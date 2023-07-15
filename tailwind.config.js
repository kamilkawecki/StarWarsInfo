/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main': "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 1)), url('/src/assets/stars.jpg')"
      }
    },
  },
  plugins: [],
}

