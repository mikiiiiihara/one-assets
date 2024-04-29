import { Meta, StoryObj } from "@storybook/react";
import {
  GoogleLoginButton,
  GoogleLoginButtonProps,
} from "./google-login-button";

export default {
  title: "molecules/SocialLoginButton/GoogleLoginButton",
  component: GoogleLoginButton,
} as Meta;

export const Default: StoryObj<GoogleLoginButtonProps> = {
  args: {
    onClick: () => alert("クリックしたよ！"),
    text: "Googleでログイン",
  },
};
