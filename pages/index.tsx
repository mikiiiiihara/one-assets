import Top from "@components/organisms/top";
import ProtectedPage from " layouts/protected-page";
import useUser from "hooks/useUser";
import { signOut } from "next-auth/react";
import useAssets from "@hooks/useAssets";

export default function Component() {
  const { user, isLoading, error } = useUser();
  const {
    assets,
    isLoading: isAssetsLoading,
    error: AssetsError,
  } = useAssets();

  if (isLoading || isAssetsLoading) return <div>Loading...</div>;
  if (error || AssetsError) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  console.log("assets", assets);
  return (
    <ProtectedPage>
      <Top name={user.name ?? ""} signOut={signOut} />
    </ProtectedPage>
  );
}
