module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'blue-600': '#1E40AF',
        'blue-700': '#1E3A8A',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
