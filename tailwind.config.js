/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        be: ['Be Vietnam Pro', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'heart-out': {
          '0%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
        heart: {
          '0%': { transform: 'scale(0.2)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        circle: {
          '40%': { transform: 'scale(10)', opacity: '1', fill: '#dd4688' },
          '55%': { transform: 'scale(11)', opacity: '1', fill: '#d46abf' },
          '65%': { transform: 'scale(12)', opacity: '1', fill: '#cc8ef5' },
          '75%': {
            transform: 'scale(13)',
            opacity: '1',
            fill: 'transparent',
            stroke: '#cc8ef5',
            strokeWidth: '0.5',
          },
          '85%': {
            transform: 'scale(17)',
            opacity: '1',
            fill: 'transparent',
            stroke: '#cc8ef5',
            strokeWidth: '0.2',
          },
          '95%': {
            transform: 'scale(18)',
            opacity: '1',
            fill: 'transparent',
            stroke: '#cc8ef5',
            strokeWidth: '0.1',
          },
          '100%': {
            transform: 'scale(19)',
            opacity: '1',
            fill: 'transparent',
            stroke: '#cc8ef5',
            strokeWidth: '0',
          },
        },
        blur: {
          '0%': { filter: 'blur(0px)' },
          '100%': { filter: 'blur(5px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'heart-out': 'heart-out 0.3s linear forwards',
        heart: 'heart 0.3s linear forwards 0.25s',
        circle: 'circle 0.3s linear forwards',
        blur: 'blur 0.2s linear ',
      },
      screens: {
        auth: '1175px',
        product_md: '1200px',
      },
      gridTemplateColumns: {
        15: 'repeat(15, minmax(0, 1fr))',
        'list-2': 'minmax(200px, 4fr) 50px !important',
        'list-3':
          ' [first] 6fr [second] minmax(80px,1fr) [last] minmax(120px,1fr)',
        'list-3-2':
          ' [first] 6fr [second] minmax(80px,1fr) minmax(80px,1fr) [last] minmax(120px,1fr)',
        'favorite-3':
          '[first] 6fr [second] minmax(120px,1fr) [last] minmax(120px,1fr)',
        'list-4':
          '[index] 16px [first] 4fr [var1] 2fr [last] minmax(120px,1fr)',
        'list-5':
          '[index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr)',
        'list-6':
          '[check] 24px [first] 6fr [var1] 3fr [var2] 2fr [var3] 3fr [last] minmax(120px,1fr)',
        'cart-5':
          '[first] minmax(120px, 1fr) [second] minmax(120px, 1fr) [var1] minmax(120px, 1fr) [var2] 4fr [last] minmax(130px,1fr)',
        'order-2-2': '[first] 120px [last] 1fr',
        'order-4':
          ' [first] 6fr [val1] minmax(120px,1fr)  [second] minmax(80px,1fr) [last] minmax(120px,1fr)',
        'order-3':
          ' [first] 6fr  [second] minmax(80px,1fr) [last] minmax(120px,1fr)',
        'order-2': ' [first] 6fr  [last] minmax(120px,1fr)',
        'order-1': ' [first] 6fr',
      },
      gridColumn: {
        'span-15': 'span 15 / span 15',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
