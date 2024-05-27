import { Button } from "@components/atoms/button";
import React, { ReactNode } from "react";

type Props = {
  content: string | ReactNode;
  type?: "submit";
  isForContent?: boolean;
  className?: string;
  notSelected?: boolean; // 非活性の見た目にしたいときにtrueを指定
  onClick?: (() => Promise<void>) | (() => void);
};
const Component: React.FC<Props> = ({
  content: content,
  type,
  isForContent,
  className,
  notSelected,
  onClick,
}) => {
  return (
    <Button
      className={`${
        !notSelected
          ? "bg-minus hover:bg-red-300"
          : "bg-gray-800 border border-minus hover:bg-red-300"
      } ${isForContent ? "" : undefined} ${className}`}
      onClick={onClick}
      type={type}
    >
      {content}
    </Button>
  );
};

Component.displayName = "DangerButton";
export const DangerButton = React.memo(Component);
