/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        "custom-shamrock-green":"#269669",
        "custom-mint":"#69B58E",
        "custom-sage":"#B6B88C",
        "custom-rosy": "#D39C9B",
        "custom-pink":"#DBB0BF",
        "custom-dark-pink": "#5f464f"
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
        audiowide: ['"Audiowide"', 'sans-serif'],
        pressstart: ['"Press Start 2P"', 'sans-serif'],
        tomorrow: ['"Tomorrow"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

