import { Button } from "components/atoms/button";
import { useRouter } from "next/router";
import React from "react";

export type Props = {
  name: string;
  signOut: () => void;
};

const Top: React.FC<Props> = ({ name, signOut }) => {
  const router = useRouter();
  return (
    <div className="text-center">
      <p className="font-bold">{name}でログイン中</p>
      <div className="flex m-6 justify-center">
        <Button className="text-white" onClick={() => router.push("/")}>
          資産推移
        </Button>
        <Button
          className="text-white"
          onClick={() => router.push("/portfolio")}
        >
          ポートフォリオ
        </Button>
        <Button className="bg-gray-500 text-white" onClick={() => signOut()}>
          ログアウト
        </Button>
      </div>
    </div>
  );
};

export default Top;
