/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      width: {
        '128': '32rem',
        '256': '64rem',
      },
      colors: {
        "apple": "#020617",
        "google": "#991b1b",
        "line": "#22c55e",
        "twitter": "#0ea5e9",
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
      themes: ["bumblebee",],
  },
}
