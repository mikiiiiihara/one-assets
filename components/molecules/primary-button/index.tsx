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
const PrimaryButtonComponent: React.FC<Props> = ({
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
        !notSelected ? "bg-primary" : "bg-gray-800"
      } ${isForContent ? "" : undefined} ${className}`}
      onClick={onClick}
      type={type}
    >
      {content}
    </Button>
  );
};

PrimaryButtonComponent.displayName = "PrimaryButton";
export const PrimaryButton = React.memo(PrimaryButtonComponent);
