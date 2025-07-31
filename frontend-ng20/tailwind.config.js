/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        "custom-shamrock-green":"#269669",
        "custom-rosy": "#c8546c",         // rojo-frambuesa fuerte (mejor contraste sobre lilas y turquesa)
        "custom-pink": "#ae3f61",         // rosa oscuro tirando a burdeos
        "custom-dark-pink": "#5f464f",

        "custom-blue-night": "#27104e",
        "custom-violet": "#64379f",
        "custom-tulip": "#9854cb",
        "custom-bright-lilac": "#ddacf5",
        "custom-turquoise": "#75e8e7"
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