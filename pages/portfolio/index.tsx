import Top from "@components/organisms/top";
import ProtectedPage from " layouts/protected-page";
import useUser from "hooks/useUser";
import { signOut } from "next-auth/react";
import useCurrentUsdJpy from "@hooks/useCurrentUsdJpy";
import Portfolio from "@components/organisms/portfolio";
import { Loading } from "@components/atoms/loading";
import { AssetsProvider } from " providers/assetsProvider";

export default function Component() {
  // ユーザー情報の取得
  // TODO: ユーザー情報をクライアントに露出したくないため、SSR化するのもアリ
  const { user, isLoading, error } = useUser();
  const {
    currentUsdJpy,
    isLoading: isUsdJpyLoading,
    error: UsdJpyError,
  } = useCurrentUsdJpy();

  if (isLoading || isUsdJpyLoading) return <Loading />;
  if (error || UsdJpyError) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  return (
    <AssetsProvider>
      <ProtectedPage>
        <Top name={user.name ?? ""} signOut={signOut} />
        <Portfolio currentUsdJpy={currentUsdJpy} />
      </ProtectedPage>
    </AssetsProvider>
  );
}
