import React from "react";
import Image from "next/image";
import { Button } from "@components/atoms/button";

export type LineLoginButtonProps = {
  onClick: () => void;
  text: string;
};

const Component: React.FC<LineLoginButtonProps> = ({ onClick, text }) => {
  return (
    <Button
      className="!bg-dark-800 w-[200px] box-border !text-white m-1 p-0  hover:!bg-dark-700 flex items-center transition-colors duration-300 !border !border-white/10"
      onClick={onClick}
    >
      <Image
        src="/line_88.png"
        alt="LINE"
        width={44}
        height={44}
        className="border-r border-line mr-2 justify-start"
      />
      <span className="flex-grow text-center">{text}</span>
    </Button>
  );
};

Component.displayName = "LineLoginButton";
export const LineLoginButton = React.memo(Component);
