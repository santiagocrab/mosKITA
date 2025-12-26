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
        // New Brand Colors
        green: {
          DEFAULT: '#34A853',
          50: '#e8f5eb',
          100: '#c4e4cd',
          200: '#9dd3ab',
          300: '#76c289',
          400: '#4fb167',
          500: '#34A853',
          600: '#2a8642',
          700: '#206432',
          800: '#164221',
          900: '#0c2011',
        },
        navy: {
          DEFAULT: '#1E3A8A',
          50: '#e8edf5',
          100: '#c4d2e6',
          200: '#9fb7d7',
          300: '#7a9cc8',
          400: '#5581b9',
          500: '#1E3A8A',
          600: '#182e6e',
          700: '#122252',
          800: '#0c1636',
          900: '#060a1a',
        },
        light: {
          DEFAULT: '#F8FAFC',
        },
        dark: {
          DEFAULT: '#1F2937',
        },
        accent: {
          DEFAULT: '#F97316',
          orange: '#F97316',
          yellow: '#FFB703',
        },
        // Legacy support
        primary: {
          DEFAULT: '#1E3A8A',
        },
        support: {
          lime: '#34A853',
          gray: '#F8FAFC',
        },
        'risk-low': '#34A853',
        'risk-moderate': '#FFB703',
        'risk-high': '#F97316',
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
