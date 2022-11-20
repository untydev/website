module.exports = {
  content: ['www/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        brand: ['Space Grotesk']
      },
      colors: {
        'orange': {
          DEFAULT: '#F37734',
          '50': '#FDEBE1',
          '100': '#FCDECE',
          '200': '#FAC4A8',
          '300': '#F8AB81',
          '400': '#F5915B',
          '500': '#F37734',
          '600': '#E2580D',
          '700': '#AD430A',
          '800': '#782F07',
          '900': '#431A04'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
