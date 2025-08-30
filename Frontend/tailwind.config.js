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
        'montserrat': ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: "#b71e09",
        secondary: "#f5f5f5",
        background: "#000203",
        secondaryText: "#666666",
        'civic-blue': '#CAF0F8',
        primary: {
          DEFAULT: '#b71e09',
          dark: '#a01a08',
          light: '#d12410'
        },
        secondary: {
          DEFAULT: '#000203',
          light: '#1a1a1a'
        },
        accent: {
          DEFAULT: '#f5f5f5',
          dark: '#e5e5e5'
        },
        supporting: {
          DEFAULT: '#666666',
          light: '#888888',
          dark: '#444444'
        },
        'civic-blue': '#CAF0F8'
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()]
}