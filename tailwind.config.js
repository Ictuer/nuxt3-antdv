// https://github.com/paolotiu/tailwind-intellisense-regex-list
/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./components/**/*.{js,vue}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/*.js'],
  corePlugins: {
    preflight: false, // https://unpkg.com/tailwindcss@3.3.2/src/css/preflight.css
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('highlight', `&[highlight=true]`)
      addVariant('-highlight', `&[highlight=false]`)
    },
  ],
  theme: {
    extend: {
      colors: {
        brand: '#fe406d',
      },
      animation: {
        text: 'text 5s ease infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      fontSize: {
        ss: '.7rem',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
}
