import { Button } from "components/atoms/button";
import { useRouter } from "next/router";
import React from "react";

export type Props = {
  name: string;
  signOut: (options?: { callbackUrl?: string }) => void;
};

const Top: React.FC<Props> = ({ name, signOut }) => {
  const router = useRouter();
  const isPortfolioPage = router.pathname === "/portfolio";
  const isAssetHistoryPage = router.pathname === "/";

  return (
    <div className="card p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">One Assets</h1>
            <p className="text-gray-400 text-sm">{name}としてログイン中</p>
          </div>
        </div>

        <nav className="flex gap-3">
          <Button
            variant={isAssetHistoryPage ? "primary" : "ghost"}
            onClick={() => router.push("/")}
          >
            資産推移
          </Button>
          <Button
            variant={isPortfolioPage ? "primary" : "ghost"}
            onClick={() => router.push("/portfolio")}
          >
            ポートフォリオ
          </Button>
          <Button
            variant="secondary"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            ログアウト
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Top;
