import { Button } from "components/atoms/button";
import React from "react";

export type Props = {
  name: string;
  signOut: () => void;
};

const Top: React.FC<Props> = ({ name, signOut }) => {
  return (
    <>
      <p className="font-bold">Welcome {name}!</p>
      <Button className="bg-gray-500 text-white" onClick={() => signOut()}>
        Sign Out
      </Button>
    </>
  );
};

export default Top;
