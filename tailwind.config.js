/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        // sm,md,lg...
      },
    },
    extend: {
      gridTemplateRows: {
        // Complex site-specific row configuration
        layout: "min-content 1fr",
      },
    },
  },
  plugins: [],
};
