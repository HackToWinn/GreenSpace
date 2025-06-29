/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Sans: ["JakartaSans", "sans-serif"],
        Bold: ["JakartaSans-Bold", "sans-serif"],
        BoldItalic: ["JakartaSans-BoldItalic", "sans-serif"],
        ExtraBold: ["JakartaSans-ExtraBold"],
        ExtraBoldItalic: ["JakartaSans-ExtraBoldItalic", "sans-serif"],
        ExtraLight: ["JakartaSans-ExtraLight", "sans-serif"],
        ExtraLightItalic: ["JakartaSans-ExtraLightItalic", "sans-serif"],
        Italic: ["JakartaSans-Italic", "sans-serif"],
        Light: ["JakartaSans-Light", "sans-serif"],
        LightItalic: ["JakartaSans-LightItalic", "sans-serif"],
        Medium: ["JakartaSans-Medium", "sans-serif"],
        MediumItalic: ["JakartaSans-MediumItalic", "sans-serif"],
        Regular: ["JakartaSans-Regular", "sans-serif"],
        SemiBold: ["JakartaSans-SemiBold", "sans-serif"],
        SemiBoldItalic: ["JakartaSans-SemiBoldItalic", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#FBFDFC",
          100: "#E6F4EC",
          200: "#C3E5D1",
          300: "#9FD6B5",
          400: "#74C490",
          500: "#4CAF50",
          600: "#3E9E45",
          700: "#2E7A37",
          800: "#225D2A",
          900: "#193F1E",
          950: "#0F2612",
        },
      },
    },
  },
  plugins: [],
};
