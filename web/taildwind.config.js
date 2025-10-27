import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: '0.625rem',  // 10px
        sm: '0.75rem',   // 12px
        base: '0.875rem', // 14px
        lg: '1rem',      // 16px
        xl: '1.125rem',  // 18px
        '2xl': '1.25rem' // 20px
      },
      fontFamily: {
        opensans: ['"Open Sans"', 'sans-serif'], // define fallback
      },
    },
  },
  plugins: [],
};