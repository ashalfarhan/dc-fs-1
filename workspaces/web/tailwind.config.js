module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        noto: [`'Noto Sans JP', sans-serif`],
        poppins: [`'Poppins', sans-serif`],
      },
      keyframes: {
        'marque-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'marque-right': 'marque-right 1s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
