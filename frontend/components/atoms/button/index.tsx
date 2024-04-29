import React from "react";

// Buttonコンポーネントのプロパティの型定義
export interface ButtonProps {
  children: React.ReactNode; // ボタンの中身（テキストや要素）
  className?: string; // オプショナルなCSSクラス名
  onClick?: () => void; // オプショナルなクリックイベントハンドラ
}

const Component: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <button
      className={`p-2 rounded-md flex align-middle ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Component.displayName = "Button";
export const Button = React.memo(Component);
