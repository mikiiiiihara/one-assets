import { Button } from "components/atoms/button";
import React from "react";

export type Props = {
  name: string;
  signOut: () => void;
};

const Top: React.FC<Props> = ({ name, signOut }) => {
  return (
    <>
      <p className="font-bold">{name}でログイン中</p>
      <Button className="bg-gray-500 text-white" onClick={() => signOut()}>
        ログアウト
      </Button>
    </>
  );
};

export default Top;
