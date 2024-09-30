/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/bird-3202212_1280.jpg')",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}