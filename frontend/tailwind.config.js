/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Satoshi', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Satoshi', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Design System Colors (Strict)
        primary: {
          DEFAULT: '#1F5E63', // Deep Teal / Forest Green
          50: '#E8F0F1',
          100: '#C4D9DC',
          200: '#9FC2C7',
          300: '#7AABB2',
          400: '#55949D',
          500: '#1F5E63',
          600: '#194B4F',
          700: '#13383B',
          800: '#0D2527',
          900: '#071213',
        },
        secondary: {
          DEFAULT: '#EAF4F8', // Soft Sky Blue
          50: '#F5FAFC',
          100: '#EAF4F8',
          200: '#D5E9F1',
          300: '#C0DEEA',
          400: '#ABD3E3',
        },
        accent: {
          DEFAULT: '#F4B740', // Warm Amber / Warning Yellow
          yellow: '#F4B740',
          amber: '#F4B740',
        },
        danger: {
          DEFAULT: '#D64545', // Muted Red
          50: '#F9E8E8',
          100: '#F3D1D1',
          200: '#EDBABA',
          300: '#E7A3A3',
          400: '#E18C8C',
          500: '#D64545',
          600: '#AB3737',
          700: '#802929',
          800: '#551B1B',
          900: '#2A0D0D',
        },
        background: {
          DEFAULT: '#F7FAFC', // Off-white / foggy gradient
        },
        text: {
          DEFAULT: '#1F2937', // Charcoal
        },
        // Legacy support
        green: {
          DEFAULT: '#10B981',
          500: '#10B981',
        },
        navy: {
          DEFAULT: '#1E3A8A',
        },
        light: {
          DEFAULT: '#F7FAFC',
        },
        dark: {
          DEFAULT: '#1F2937',
        },
        support: {
          lime: '#10B981',
          gray: '#F7FAFC',
        },
        'risk-low': '#10B981',
        'risk-moderate': '#F4B740',
        'risk-high': '#D64545',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          'from': { 
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3)'
          },
          'to': { 
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5)'
          },
        },
        slideUp: {
          'from': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
