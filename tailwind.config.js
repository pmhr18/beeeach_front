/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'lower-roman',
      alpha: 'lower-alpha',
      greek: 'lower-greek',
    },
    container: {
      center: true,
    },
    extend: {
      width: {
        '128': '32rem',
        '256': '64rem',
      },
      colors: {
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
