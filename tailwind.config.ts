// const { theme } = require('@sanity/demo/tailwind')
// const colors = require('tailwindcss/colors')

import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    extend: {
      padding: {
        header: '100px',
        mobileSpace: '20vh',
      },
      margin: {
        desktopSpace: '30vh',
        mobileSpace: '20vh',
      },
      height: {
        header: '100px',
        headerSmall: '88px',
      },
      screens: {
        '3xl': '1800px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
