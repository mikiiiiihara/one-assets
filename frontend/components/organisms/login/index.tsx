import React from "react";
import { signIn } from "next-auth/react";
import { GoogleLoginButton } from "@frontend/components/molecules/social-login-button/google-login-button";
import { LineLoginButton } from "@frontend/components/molecules/social-login-button/line-login-button";

const Component = () => {
  return (
    <center>
      <h2 className="text-lg font-bold">ログイン</h2>
      <GoogleLoginButton
        onClick={() => signIn("google")}
        text="Googleでログイン"
      />
      <LineLoginButton onClick={() => signIn("line")} text="LINEでログイン" />
    </center>
  );
};

Component.displayName = "Login";
export const Login = React.memo(Component);
