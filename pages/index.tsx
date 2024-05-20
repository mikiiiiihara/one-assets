import Top from "@components/organisms/top";
import ProtectedPage from " layouts/protected-page";
import useUser from "hooks/useUser";
import { signOut } from "next-auth/react";
import { Loading } from "@components/atoms/loading";
import useAssetHistories from "@hooks/asset-hisotries/useAssetHistories";
import AssetHistory from "@components/organisms/asset-history";

export default function Component() {
  const { user, isLoading, error } = useUser();
  const {
    assetHistories,
    isLoading: isAssetsHistoryLoading,
    error: assetsHistoryError,
  } = useAssetHistories();

  if (isLoading || isAssetsHistoryLoading) return <Loading />;
  if (error || assetsHistoryError) return <div>Error: {error}</div>;
  console.log(assetHistories);
  if (!user) return <div>No user found</div>;
  return (
    <ProtectedPage>
      <Top name={user.name ?? ""} signOut={signOut} />
      <AssetHistory assetHistories={assetHistories} />
    </ProtectedPage>
  );
}
