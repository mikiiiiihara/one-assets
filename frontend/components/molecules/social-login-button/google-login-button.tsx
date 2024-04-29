import { Button } from "@frontend/components/atoms/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export type GoogleLoginButtonProps = {
  onClick: () => void;
  text: string;
};

const Component: React.FC<GoogleLoginButtonProps> = ({ onClick, text }) => {
  return (
    <Button
      className="bg-gray-100 box-border w-[200px] p-0 text-black m-1 flex hover:bg-gray-300 items-center justify-start transition-colors duration-300"
      onClick={onClick}
    >
      <FcGoogle size={44} className="border-r border-line mr-2 justify-start" />
      <span className="flex-grow text-center">{text}</span>
    </Button>
  );
};

Component.displayName = "GoogleLoginButton";
export const GoogleLoginButton = React.memo(Component);
