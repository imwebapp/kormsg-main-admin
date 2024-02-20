/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#0866FF',
        dark: '#141414',
        purple: '#722ED1',
      },
    },
  },
	plugins: [require('@tailwindcss/line-clamp')],
}