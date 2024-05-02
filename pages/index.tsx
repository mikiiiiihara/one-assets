import Top from "@components/organisms/top";
import ProtectedPage from "@frontend/ layouts/protected-page";
import useUser from "@frontend/hooks/useUser";
import { signOut } from "next-auth/react";

export default function Component() {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  return (
    <ProtectedPage>
      <Top name={user.name ?? ""} signOut={signOut} />
    </ProtectedPage>
  );
}
