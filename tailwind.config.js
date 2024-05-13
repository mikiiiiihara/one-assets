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
        line: "rgba(0,0,0,0.08)",
      },
      colors: {
        primary: {
          50: "#E1FFF6", // 最も明るいバリエーション
          100: "#C4FFED", // より明るいバリエーション
          200: "#A6FFE4", // 明るいバリエーション
          300: "#88FFDB", // より中間の明るさ
          400: "#6AFFD2", // 中間のバリエーション
          500: "#4CFFC9", // デフォルトより少し暗め
          600: "#2EFFC0", // デフォルトのプライマリカラー
          700: "#1ECC9E", // 暗めのバリエーション
          800: "#0E997C", // より暗いバリエーション
          900: "#00665A", // 最も暗いバリエーション
          DEFAULT: "#7AFFCA", // プライマリカラーのデフォルト値
        },
        plus: {
          DEFAULT: "#3CB371",
        },
        minus: {
          DEFAULT: "#FF3333",
        },
      },
    },
  },
  plugins: [],
};
