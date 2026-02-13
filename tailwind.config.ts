import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0066FF", // Biru Teknologi ala Hexanusa
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        }
      },
      animation: {
        'float-random': 'float 6s ease-in-out infinite',
        'float-random-slow': 'float 8s ease-in-out infinite',
        'float-random-fast': 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
