/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#0866FF",
        lightBlue: "#00CCFF",
        dark: "#141414",
        goldenPurple50: "#F9F0FF",
        purple: "#722ED1",
        darkNight50: "#F6F6F6",
        darkNight100: "#E8E8E8",
        darkNight200: "#D0D0D0",
        darkNight300: "#B9B9B9",
        darkNight400: "#A1A1A1",
        darkNight500: "#8A8A8A",
        darkNight600: "#727272",
        darkNight700: "#5B5B5B",
        darkNight800: "#373737",
        darkNight900: "#141414",
        dustRed50: "#FFF1F0",
        dustRed500: "#F5222D",
        dustRed900: "#5C0011",
        violet: "#4318FF",
        polaGreen500: "#52C41A",
        dayBreakBlue50: "#E6F4FF",
        dayBreakBlue500: "#0866FF",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
