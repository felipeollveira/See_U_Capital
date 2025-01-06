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
    themes: ["dark"], // Exemplo de temas
  },
};