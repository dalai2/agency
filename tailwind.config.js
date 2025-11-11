/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E4354',
        secondary: '#F0F7F7',
        accent: '#000000',
        dark: '#2E4354',
        light: '#F0F7F7',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2E4354, #000000)',
        'gradient-accent': 'linear-gradient(135deg, #000000, #2E4354)',
        'gradient-full': 'linear-gradient(135deg, #2E4354, #000000, #F0F7F7)',
      },
      fontFamily: {
        'exo2': ['var(--font-exo2)', 'sans-serif'],
        'poppins': ['var(--font-poppins)', 'sans-serif'],
        'sans': ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}






