/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#000080",
        "custom-black": "#1a1a1a",
      },
    },
  },
  plugins: [],
};
