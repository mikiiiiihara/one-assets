/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        line: "rgba(0,0,0,0.08)",
      },
      colors: {
        primary: {
          50: "#F5F0DA", // 最も明るいバリエーション
          100: "#EBE0B1", // より明るいバリエーション
          200: "#E0D089", // 明るいバリエーション
          300: "#C6B159", // より中間の明るさ
          400: "#AD9A4E", // 中間のバリエーション
          500: "#A08E48", // デフォルトより少し暗め
          600: "#938342", // デフォルトのプライマリカラー
          700: "#87783C", // 暗めのバリエーション
          800: "#7A6C37", // より暗いバリエーション
          900: "#6D6131", // 最も暗いバリエーション
          DEFAULT: "#D6C060", // プライマリカラーのデフォルト値
        },
      },
    },
  },
  plugins: [],
};
