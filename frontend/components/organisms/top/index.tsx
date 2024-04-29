import { Button } from "@frontend/components/atoms/button";
import React from "react";

export type Props = {
  name: string;
  signOut: () => void;
};

const Component: React.FC<Props> = ({ name, signOut }) => {
  return (
    <>
      <p className="font-bold">Welcome {name}!</p>
      <Button className="bg-gray-500 text-white" onClick={() => signOut()}>
        Sign Out
      </Button>
    </>
  );
};

Component.displayName = "Top";
export const Top = React.memo(Component);
