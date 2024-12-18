// tailwind.config.js
module.exports = {
  content: [
    "./public/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"], // Exemplo de temas
  },
};