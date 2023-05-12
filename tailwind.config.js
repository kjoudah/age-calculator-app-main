/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      poppins400: ['var(--font-400)'],
      poppins400i: ['var(--font-400i)'],
      poppins700: ['var(--font-700)'],
      poppins700i: ['var(--font-700i)'],
      poppins800: ['var(--font-800)'],
      poppings800i: ['var(--font-800i)'],
    },
    extend: {
      colors: {
        white: colors.white,
        purple: 'hsl(var(--purple))',
        lightRed: 'hsl(var(--light-red))',
        offWhite: 'hsl(var(--off-white))',
        lightGrey: 'hsl(var(--light-grey))',
        smokeyGrey: 'hsl(var(--smokey-grey))',
        offBlack: 'hsl(var(--off-black))',
      },
      fontSize: {
        xxs: '0.5rem',
      },
    },
  },
  plugins: [],
};
