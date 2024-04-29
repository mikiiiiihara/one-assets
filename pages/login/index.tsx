import { Login } from "@frontend/components/organisms/login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const LoginPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) router.push("/");
  return <Login />;
};

export default LoginPage;
