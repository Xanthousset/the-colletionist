/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  prefix: 'tw-',
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '769px',
      // => @media (min-width: 768px) { ... }

      'lg': '1025px',
      // => @media (min-width: 1025px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white : '#fff',
      black : {
        DEFAULT : '#04080F',
        true : '#000'
      },
      red : '#c32a2a',
      gold : '#C5A844',
    },
    extend: {},
  },
  variants: {
    margin: ['last' , 'responsive'],
    extend: {
    },
  },
  plugins: [],
}
