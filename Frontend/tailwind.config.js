/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "Poppins": ["Poppins", "serif"],
        "Rubik": ["Rubik Mono One", "serif"],
        "Inconsolata": ['Inconsolata', "serif"],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      colors: {
        "primary": "black",
         'civic-blue': '#CAF0F8',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()]
}