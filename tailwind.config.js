// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"], // Exemplo de temas
  },
};