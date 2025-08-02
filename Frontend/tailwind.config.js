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
        "Inconsolata": ['Inconsolata', "serif"]
      },
      colors: {
        "primary": "black",
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()]
}