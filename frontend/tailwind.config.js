/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta oficial extraída da logo IScuTa
        brand: {
          blue: {
            DEFAULT: '#0099D8', // Azul Principal (Primary / Brand)
            light: '#E6F5FC',   // Fundo leve / hover suave
            dark: '#0073A3',    // Hover escuro / texto de contraste
          },
          orange: {
            DEFAULT: '#F39200', // Laranja / Âmbar (Secondary / Accent Warm)
            light: '#FFF4E5',   // Fundo de cards / badges
            dark: '#D67F00',    // Hover escuro
          },
          red: {
            DEFAULT: '#D92B27', // Vermelho / Coral (Emergency / Alert Accent)
            light: '#FDE8E8',   // Banners de alerta / PEP
            dark: '#B51F1C',    // Hover escuro
          },
          // Escala numérica mapeada para compatibilidade
          50: '#E6F5FC',
          100: '#C7EAFC',
          200: '#90D4F8',
          300: '#53BDF3',
          400: '#1EA7E5',
          500: '#0099D8',
          600: '#0073A3',
          700: '#00587E',
          800: '#003E59',
          900: '#002638',
        },
        // Superfícies e Neutros
        surface: {
          bg: '#F0F7FC',      // Fundo suave levemente azulado
          card: '#FFFFFF',    // Fundo de cartões e modais
          text: '#1E293B',    // Grafite / Slate escuro
          darkBg: '#0F172A',  // Modo escuro base
          darkCard: '#1E293B',// Modo escuro cartões
        },
        // Semântica de serviços de saúde alinhada à logo
        prep: {
          DEFAULT: '#0099D8', // Azul da logo
          light: '#E6F5FC',
          dark: '#0073A3',
        },
        pep: {
          DEFAULT: '#D92B27', // Vermelho vibrante de urgência (72h)
          light: '#FDE8E8',
          dark: '#B51F1C',
        },
        test: {
          DEFAULT: '#F39200', // Laranja quente de acolhimento e testagem
          light: '#FFF4E5',
          dark: '#D67F00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
