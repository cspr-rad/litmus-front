import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "info-block": "#2e3b49",
        "info-item": "#92a4c9",
        "info-link": "#eba639",
        "actions-bar-button": "#3e5c6c",
        "actions-bar-button-hover": "#4c6877",
        "panel": "#3a4c67",
        "tab-inactive": "#8e9eb8",
        "footer": "#1f2937",
      }
    },
  },
  plugins: [],
};
export default config;
