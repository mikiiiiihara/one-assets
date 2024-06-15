import { Button } from "@components/atoms/button";
import React, { ReactNode } from "react";

type Props = {
  content: string | ReactNode;
  type?: "submit";
  isForContent?: boolean;
  className?: string;
  notSelected?: boolean; // 非活性の見た目にしたいときにtrueを指定
  onClick?: (() => Promise<void>) | (() => void);
  disabled?: boolean;
};
const PrimaryButtonComponent: React.FC<Props> = ({
  content: content,
  type,
  isForContent,
  className,
  notSelected,
  disabled,
  onClick,
}) => {
  const myClass = !notSelected
    ? "bg-primary-700 hover:bg-primary"
    : "bg-gray-800 border border-primary hover:bg-primary-900";
  return (
    <Button
      className={`${disabled ? "bg-gray-300" : myClass} ${isForContent ? "" : undefined} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {content}
    </Button>
  );
};

PrimaryButtonComponent.displayName = "PrimaryButton";
export const PrimaryButton = React.memo(PrimaryButtonComponent);
