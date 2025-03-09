// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { config } from "process";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--sidebar-border) / <alpha-value>)", // Fix for dynamic colors
        background: "rgb(var(--sidebar) / <alpha-value>)",
        foreground: "rgb(var(--sidebar-foreground) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;