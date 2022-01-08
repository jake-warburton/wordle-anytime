import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
      },
      'html, body': {
        lineHeight: 'tall',
        fontFamily: 'body',
        fontSize: '14px',
        lineHeightStep: '17px',
      },
      h2: {
        fontSize: '1.4rem !important',
      },
      h3: {
        fontSize: '1.2rem !important',
      },
      '.p-padding>p': {
        paddingTop: '6px',
      },
    },
  },
  colors: {
    gold: {
      400: '#b09060',
    },
    navy: {
      400: '#062b3f',
    },
    grey: {
      400: '#4d555c',
    },
    red: {
      400: '#9c1134',
    },
    green: {
      400: '#49a684',
    },
    yellow: {
      400: '#e87f33',
    },
    blue: {
      400: '#0d7ff7',
    },
    orange: {
      400: '#ff722e',
    },
    purple: {
      400: '#8541e8',
    },
    lightBlue: {
      400: '#8294aa',
    },
    darkGrey: {
      400: '#141924',
    },
    lightGrey: {
      400: '#f9f9f9',
    },
  },
  fonts: {
    heading: '"Oswald", sans-serif',
    body: '"Poppins", sans-serif',
  },
  shadows: {
    default: '0 0 2px 2px #4d555c',
    inside: 'inset 0 0 8px #999;',
    up: '0px -2px 4px 0px rgba(0,0,0,0.75)',
    light: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    dark: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },

  components: {
    Text: {
      variants: {
        subheading: {
          letterSpacing: 0,
          textTransform: 'uppercase',
          color: 'lightBlue.400',
          fontFamily: 'heading',
        },
        secondary: {
          color: 'lightBlue.400',
          fontFamily: 'body',
        },
      },
    },
  },
})

export default theme
