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
        primary: '#06B6D4',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        dark: '#0F172A',
        light: '#F1F5F9',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
        'gradient-accent': 'linear-gradient(135deg, #8B5CF6, #EC4899)',
        'gradient-full': 'linear-gradient(135deg, #06B6D4, #8B5CF6, #EC4899)',
      },
    },
  },
  plugins: [],
}


