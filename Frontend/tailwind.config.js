/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        "Poppins": ["Poppins", "serif"],
        "Rubik": ["Rubik Mono One", "serif"],
        "Inconsolata": ['Inconsolata', "serif"],
        'montserrat': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: []
}