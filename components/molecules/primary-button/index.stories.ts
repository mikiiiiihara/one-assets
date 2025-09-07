import { Meta, StoryObj } from "@storybook/react";
import { PrimaryButton } from ".";

export default {
  title: "molecules/PrimaryButton",
  component: PrimaryButton,
} as Meta;

export const Default: StoryObj = {
  args: {
    content: "送信",
    onClick: () => alert("クリックしたよ！"),
    size: "md",
  },
};

export const NotSelected: StoryObj = {
  args: {
    content: "未選択",
    notSelected: true,
  },
};

export const FullWidth: StoryObj = {
  args: {
    content: "フル幅",
    fullWidth: true,
  },
};

