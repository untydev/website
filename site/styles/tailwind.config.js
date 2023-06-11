module.exports = {
  content: ['www/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Arvo']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
