
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTA: No Expo/NativeWind, você deve apontar para seus arquivos de componentes
  content: ["./App.tsx", "./views/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#8D7B68',
          secondary: '#C8B6A6',
          accent: '#A4907C',
          cream: '#FDFBF7',
          surface: '#F1E9E0',
        },
        android: {
          navigation: '#F7F2EA',
          indicator: '#EADACD',
        }
      },
    },
  },
  plugins: [],
}
