/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "heavy-metal": "#252525",
        "dark-grey": "#353535",
        "blue-lotus": "#6C5CE7",
        "iris": "#6256B9",
        "success": "#55EFC4",
        "fail": "#FF7675",
        "faint": "#C4C4C4"
      }
    },
  },
  plugins: [],
};
