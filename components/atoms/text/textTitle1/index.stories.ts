import { Meta, StoryObj } from "@storybook/react";
import { TextTitle1 } from ".";

export default {
  title: "atoms/TextTitle1",
  component: TextTitle1,
} as Meta;

export const Default: StoryObj = {
  args: {
    children: "見出しタイトル",
  },
};

