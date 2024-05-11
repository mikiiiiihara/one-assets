import React from "react";

type Props = {
  children: string | string[];
};

const Component: React.FC<Props> = ({ children }) => {
  return <h1 className="text-xl ">{children}</h1>;
};
Component.displayName = "TextTitle1";
export const TextTitle1 = React.memo(Component);
