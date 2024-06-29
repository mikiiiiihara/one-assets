import React from "react";

// Buttonコンポーネントのプロパティの型定義
export interface ModalProps {
  children: React.ReactNode; // ボタンの中身（テキストや要素）
}

const Component: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="fixed flex inset-0 w-full h-full bg-black bg-opacity-50 z-[999] m-auto text-left border p-8 rounded border-neutral-600 overflow-auto">
      <div className="h-auto w-full m-auto p-8 rounded bg-[#343a40]">
        {children}
      </div>
    </div>
  );
};

Component.displayName = "Modal";
export const Modal = React.memo(Component);
