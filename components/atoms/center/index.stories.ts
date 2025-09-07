import { Meta, StoryObj } from "@storybook/react";
import { Center } from ".";

export default {
  title: "atoms/Center",
  component: Center,
} as Meta;

export const Default: StoryObj = {
  args: {
    children: "Centered content",
  },
};

