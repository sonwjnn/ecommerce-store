/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        primary: '#fb5533',
        bg_page: '#f5f5f5',
        bg_header_t: '#ff6533',
        bg_header_b: '#f53f2d'
      },
      screens: {
        auth: '1175px',
        product_md: '1200px'
      },

      gridTemplateColumns: {
        15: 'repeat(15, minmax(0, 1fr))'
      },
      gridColumn: {
        'span-15': 'span 15 / span 15'
      }
    }
  },
  plugins: []
}
