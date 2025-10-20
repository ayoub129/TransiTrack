/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FF6B00',
          'primary-600': '#E55F00',
          'primary-200': '#FFD3B8',
        },
        ink: {
          900: '#0F172A',
          600: '#475569',
        },
        bg: {
          0: '#0B0B0C',
          100: '#0F1115',
          white: '#FFFFFF',
        },
        accent: {
          teal: '#00C2A8',
        },
        danger: '#EF4444',
        warning: '#F59E0B',
        success: '#10B981',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
      },
      spacing: {
        'xs': '6px',
        's': '10px',
        'm': '16px',
        'l': '24px',
        'xl': '32px',
      },
      fontSize: {
        'display-1': '34px',
        'display-2': '28px',
        'display-3': '24px',
        'body': '16px',
        'caption': '13px',
      },
    },
  },
  plugins: [],
}
