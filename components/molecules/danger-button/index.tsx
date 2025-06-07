import { Button } from "@components/atoms/button";
import React, { ReactNode } from "react";

type Props = {
  content: string | ReactNode;
  type?: "submit";
  isForContent?: boolean;
  className?: string;
  notSelected?: boolean;
  onClick?: (() => Promise<void>) | (() => void);
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

const Component: React.FC<Props> = ({
  content,
  type,
  isForContent,
  className = "",
  notSelected,
  onClick,
  disabled,
  size = "md",
  fullWidth = false,
}) => {
  return (
    <Button
      variant={notSelected ? "secondary" : "danger"}
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      size={size}
      fullWidth={fullWidth}
    >
      {content}
    </Button>
  );
};

Component.displayName = "DangerButton";
export const DangerButton = React.memo(Component);
