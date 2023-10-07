module.exports = {
  content: ['www/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.teal.500'),
              display: 'inline-block',
              paddingLeft: theme('space.1'),
              paddingRight: theme('space.1'),
              marginLeft: '-4px',
              marginRight: '-4px',
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.zinc.100'),
                backgroundColor: theme('colors.teal.500')
              }
            },
            p: {
              color: theme('colors.zinc.600')
            },
            h1: {
              fontSize: '1rem',
              marginBottom: theme('space.8'),
              color: theme('colors.zinc.900')
            },
            h2: {
              fontSize: '1rem',
              marginBottom: theme('space.8'),
              color: theme('colors.zinc.900')
            },
            h3: {
              fontSize: '1rem',
              marginBottom: theme('space.8'),
              color: theme('colors.zinc.900')
            },
            h4: {
              fontSize: '1rem',
              marginBottom: theme('space.8'),
              color: theme('colors.zinc.900')
            },
            h5: {
              fontSize: '1rem',
              marginBottom: theme('space.8'),
              color: theme('colors.zinc.900')
            },
            h6: {
              fontSize: '1rem',
              marginBottom: theme('space.8'),
              color: theme('colors.zinc.900')
            },
            pre: {
              backgroundColor: 'rgb(24, 24, 27)',
              borderRadius: '0',
              padding: theme('space.6'),
              marginTop: theme('space.8'),
              marginBottom: theme('space.8')
            }
          }
        },
        invert: {
          css: {
            h1: {
              color: theme('colors.zinc.100')
            },
            h2: {
              color: theme('colors.zinc.100')
            },
            h3: {
              color: theme('colors.zinc.100')
            },
            h4: {
              color: theme('colors.zinc.100')
            },
            h5: {
              color: theme('colors.zinc.100')
            },
            h6: {
              color: theme('colors.zinc.100')
            },
            a: {
              '&:hover': {
                color: theme('colors.zinc.900'),
                backgroundColor: theme('colors.teal.500')
              }
            },
            p: {
              color: theme('colors.zinc.300')
            },
            pre: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
