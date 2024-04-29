import { Login } from "@frontend/components/organisms/login";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ProtectedPage: React.FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  if (session) {
    return <>{children}</>;
  }
  return <Login />;
};

export default ProtectedPage;
