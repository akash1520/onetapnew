/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    "./src/app/**/*.{html,js,ts,tsx}",
    "./src/app/screens/**/*.{html,js,ts,tsx}",
    "./src/app/screens/components/**/*.{html,js,ts,tsx}",
    "./src/app/screens/components/*.{html,js,ts,tsx}",
    "./pages/**/*.{html,js,ts,tsx}",
    "./components/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      'display': ['Fira Sans', 'sans-serif'],
      'Ranchers':['Ranchers', 'sans-serif'],
      'Impact':['Anton', 'sans-serif'],
      'Poppins':['Poppins', 'sans-serif'],
    },
    extend: {
      "backgroundImage":{
        "games_banner":"url(/public/banners/games_banner.png)"
      },
      "gridTemplateRows":{
        '9':'repeat(9,minmax(0,5vh))'
      }
    },
  },
  plugins: [],
};
