module.exports = {
  content: ['www/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        brand: ['Space Grotesk']
      },
      colors: {
        'violet': {
          DEFAULT: '#7272A1',
          '50': '#E0E0EA',
          '100': '#D4D4E2',
          '200': '#BBBBD2',
          '300': '#A3A3C2',
          '400': '#8A8AB1',
          '500': '#7272A1',
          '600': '#585883',
          '700': '#414162',
          '800': '#2B2B40',
          '900': '#14141E'
        },
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
