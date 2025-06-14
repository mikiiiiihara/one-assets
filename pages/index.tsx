import { signOut, useSession } from "next-auth/react";
import { Landing } from "@components/organisms/landing";

export default function Component() {
  const { data: session, status } = useSession();

  // 認証状態をチェック
  if (status === "loading") return null;
  if (status === "unauthenticated" || !session) return <Landing />;

  // 認証済みの場合はダッシュボードコンポーネントを表示
  return <AuthenticatedDashboard />;
}

// 認証済みユーザー向けのダッシュボードコンポーネント
import Top from "@components/organisms/top";
import useUser from "hooks/useUser";
import { Loading } from "@components/atoms/loading";
import AssetHistory from "@components/organisms/asset-history";
import { useState } from "react";
import useAssetHistories from "@hooks/asset-hisotries/useAssetHistories";
import ProtectedPage from "../ layouts/protected-page";
import { PrimaryButton } from "@components/molecules/primary-button";

function AuthenticatedDashboard() {
  const { user, isLoading, error } = useUser();
  const {
    assetHistories,
    isLoading: isAssetsHistoryLoading,
    error: assetsHistoryError,
    refetch,
  } = useAssetHistories();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

  const handleRefetch = () => {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    refetch(undefined, start, end);
  };

  if (isLoading || isAssetsHistoryLoading) return <Loading />;
  if (error || assetsHistoryError) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <ProtectedPage>
      <Top name={user.name ?? ""} signOut={signOut} />
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold gradient-text mb-4">期間フィルター</h2>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="form-label">開始日</label>
            <input
              className="form-input w-full"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="form-label">終了日</label>
            <input
              className="form-input w-full"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex-shrink-0">
            <PrimaryButton content="検索" onClick={handleRefetch} size="lg" />
          </div>
        </div>
      </div>
      <AssetHistory assetHistories={assetHistories} />
    </ProtectedPage>
  );
}
