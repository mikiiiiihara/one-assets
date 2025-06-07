/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        line: "rgba(255,255,255,0.08)",
      },
      colors: {
        primary: {
          50: "#E6F9F4",
          100: "#B3EDE0",
          200: "#80E1CC",
          300: "#4DD5B8",
          400: "#33CEAB",
          500: "#1ECC9E",
          600: "#1BB88C",
          700: "#17A47A",
          800: "#149068",
          900: "#0F6B4E",
          DEFAULT: "#1ECC9E",
        },
        dark: {
          50: "#F5F5F5",
          100: "#E0E0E0",
          200: "#BDBDBD",
          300: "#9E9E9E",
          400: "#757575",
          500: "#616161",
          600: "#424242",
          700: "#303030",
          800: "#212121",
          900: "#121212",
          950: "#0A0A0A",
          DEFAULT: "#0A0A0A",
        },
        success: "#1ECC9E",
        danger: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #1ECC9E 0%, #17A47A 100%)',
        'gradient-dark': 'linear-gradient(135deg, #121212 0%, #0A0A0A 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(30, 204, 158, 0.15)',
        'glow-sm': '0 0 10px rgba(30, 204, 158, 0.1)',
        'glow-lg': '0 0 30px rgba(30, 204, 158, 0.2)',
        'dark': '0 4px 20px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
