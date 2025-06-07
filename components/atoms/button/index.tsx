import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Component: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus-ring";
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:shadow-glow hover:shadow-primary/50 active:scale-95",
    secondary: "bg-dark-800 text-white border border-white/10 hover:bg-dark-700 hover:border-primary/30 hover:shadow-glow-sm",
    ghost: "bg-transparent text-primary-400 hover:bg-primary/10 hover:text-primary-300",
    danger: "bg-danger text-white hover:bg-red-600 hover:shadow-red-500/30",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed hover:shadow-none" : "";
  const widthStyles = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${widthStyles} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Component.displayName = "Button";
export const Button = React.memo(Component);
