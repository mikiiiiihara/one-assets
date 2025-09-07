import { Meta, StoryObj } from "@storybook/react";
import { DangerButton } from ".";

export default {
  title: "molecules/DangerButton",
  component: DangerButton,
} as Meta;

export const Default: StoryObj = {
  args: {
    content: "削除",
    onClick: () => alert("削除を実行します"),
  },
};

export const Disabled: StoryObj = {
  args: {
    content: "削除 (無効)",
    disabled: true,
  },
};

export const FullWidth: StoryObj = {
  args: {
    content: "削除 (フル幅)",
    fullWidth: true,
  },
};

