import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dusk: "#24343D",
        "dusk-raised": "#32485A",
        mountain: "#3B596A",
        paper: "#FFDAB9",
        ember: "#D97B4F",
        blush: "#E7C5C1",
        "blush-ink": "#A15A68",
        pebble: "#727F8A",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
