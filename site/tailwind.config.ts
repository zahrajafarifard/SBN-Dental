import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yourfont: ["IRANSANS", "sans-serif"], // 'YourFont' is the name used in @font-face
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        screen1800: { max: "1800px" },
        screen1700: { max: "1700px" },
        screen1550: { max: "1550px" },
        screen1500: { max: "1500px" },
        screen1450: { max: "1450px" },
        screen1400: { max: "1400px" },
        screen1350: { max: "1350px" },
        screen1300: { max: "1300px" },
        screen1230: { max: "1230px" },
        screen1150: { max: "1150px" },
        screen1100: { max: "1100px" },
        screen1050: { max: "1050px" },
        screen1000: { max: "1000px" },
        screen950: { max: "950px" },
        screen900: { max: "900px" },
        screen850: { max: "850px" },
        screen800: { max: "800px" },
        screen750: { max: "750px" },
        screen700: { max: "700px" },
        screen650: { max: "650px" },
        screen630: { max: "630px" },
        screen600: { max: "600px" },
        screen550: { max: "550px" },
        screen500: { max: "500px" },
        screen450: { max: "450px" },
        screen400: { max: "400px" },
        screen380: { max: "380px" },
      },
    },
  },
  plugins: [],
};
export default config;
