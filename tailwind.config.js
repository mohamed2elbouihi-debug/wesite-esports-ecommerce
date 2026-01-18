/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(222 47% 7%)",
        foreground: "hsl(210 40% 98%)",
        card: "hsl(222 47% 11%)",
        border: "hsl(217 33% 20%)",
        primary: "hsl(158 77% 45%)",
        accent: "hsl(280 70% 55%)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(56, 189, 248, 0.25)",
      },
    },
  },
  plugins: [],
};
