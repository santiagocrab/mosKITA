/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#00575B',
          50: '#e6f0f1',
          100: '#b3d1d4',
          200: '#80b2b7',
          300: '#4d939a',
          400: '#1a747d',
          500: '#00575B',
          600: '#00464a',
          700: '#003539',
          800: '#002428',
          900: '#001317',
        },
        accent: {
          DEFAULT: '#F96D5A',
          50: '#fef5f4',
          100: '#fde0dc',
          200: '#fbcbc4',
          300: '#f9b6ac',
          400: '#f7a194',
          500: '#F96D5A',
          600: '#c75748',
          700: '#954136',
          800: '#632b24',
          900: '#311512',
        },
        support: {
          lime: '#A6D608',
          gray: '#FAFAFA',
        },
        'risk-low': '#10b981',
        'risk-moderate': '#f59e0b',
        'risk-high': '#ef4444',
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
