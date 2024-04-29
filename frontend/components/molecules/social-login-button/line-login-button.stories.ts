import { Meta, StoryObj } from "@storybook/react";
import { LineLoginButton, LineLoginButtonProps } from "./line-login-button";

export default {
  title: "molecules/SocialLoginButton/LineLoginButton",
  component: LineLoginButton,
} as Meta;

export const Default: StoryObj<LineLoginButtonProps> = {
  args: {
    onClick: () => alert("クリックしたよ！"),
    text: "LINEでログイン",
  },
};
