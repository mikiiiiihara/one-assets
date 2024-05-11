import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CenterComponent: React.FC<Props> = ({ children }) => {
  return <div style={{ textAlign: "center" }}>{children}</div>;
};
CenterComponent.displayName = "Center";
export const Center = React.memo(CenterComponent);
