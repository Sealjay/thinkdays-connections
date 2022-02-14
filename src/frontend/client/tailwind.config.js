const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {rose: colors.rose,},
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}
