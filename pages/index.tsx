import ProtectedPage from "@frontend/ layouts/protected-page";
import { Top } from "@frontend/components/organisms/top";
import useUser from "@frontend/hooks/userUser";
import { signOut } from "next-auth/react";

export default function Component() {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  return (
    <ProtectedPage>
      <Top name={user.name} signOut={signOut} />
    </ProtectedPage>
  );
}
