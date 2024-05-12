import React from "react";
import { signIn } from "next-auth/react";
import { GoogleLoginButton } from "@components/molecules/social-login-button/google-login-button";

const Component = () => {
  return (
    <center>
      <h2 className="text-lg font-bold">ログイン</h2>
      <GoogleLoginButton
        onClick={() => signIn("google")}
        text="Googleでログイン"
      />
    </center>
  );
};

Component.displayName = "Login";
export const Login = React.memo(Component);
