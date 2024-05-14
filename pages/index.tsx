import Top from "@components/organisms/top";
import ProtectedPage from " layouts/protected-page";
import useUser from "hooks/useUser";
import { signOut } from "next-auth/react";
import useAssets from "@hooks/useAssets";
import useCurrentUsdJpy from "@hooks/useCurrentUsdJpy";
import { Loading } from "@components/atoms/loading";

export default function Component() {
  const { user, isLoading, error } = useUser();
  const {
    currentUsdJpy,
    isLoading: isUsdJpyLoading,
    error: UsdJpyError,
  } = useCurrentUsdJpy();
  const {
    assets,
    isLoading: isAssetsLoading,
    error: AssetsError,
  } = useAssets();

  if (isLoading || isUsdJpyLoading || isAssetsLoading) return <Loading />;
  if (error || UsdJpyError || AssetsError) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  return (
    <ProtectedPage>
      <Top name={user.name ?? ""} signOut={signOut} />
    </ProtectedPage>
  );
}
