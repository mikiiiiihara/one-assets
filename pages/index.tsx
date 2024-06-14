import Top from "@components/organisms/top";

import useUser from "hooks/useUser";
import { signOut } from "next-auth/react";
import { Loading } from "@components/atoms/loading";

import AssetHistory from "@components/organisms/asset-history";
import { useState } from "react";
import useAssetHistories from "@hooks/asset-hisotries/useAssetHistories";
import ProtectedPage from " layouts/protected-page";
import { PrimaryButton } from "@components/molecules/primary-button";

export default function Component() {
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
      <div>
        <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-4 space-y-4 sm:space-y-0">
          <label>
            Start Date:
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <PrimaryButton
            className="ml-1"
            content={"検索"}
            onClick={handleRefetch}
          />
        </div>
      </div>
      <AssetHistory assetHistories={assetHistories} />
    </ProtectedPage>
  );
}
