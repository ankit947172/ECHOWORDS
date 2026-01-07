import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // If you use a 'src' folder
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // If you use App Router at root
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // If you use Pages Router at root
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // If you have root components
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
