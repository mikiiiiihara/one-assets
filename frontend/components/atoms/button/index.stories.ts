import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from ".";

export default {
  title: "atoms/Button",
  component: Button,
} as Meta;

export const Default: StoryObj<ButtonProps> = {
  args: {
    children: "ボタン",
    className: "bg-primary",
    onClick: () => alert("クリックしたよ！"),
  },
};
