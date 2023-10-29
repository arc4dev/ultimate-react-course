/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // overwrote default font family
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },
    extend: {
      // just for demonstration purposes
      colors: {
        pizza: '#ff0000',
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
