import { Meta, StoryObj } from "@storybook/react";
import Top, { Props } from "."; // Top コンポーネントのパスを適切に設定してください

export default {
  title: "organisms/Top",
  component: Top,
} as Meta<Props>;

export const Default: StoryObj<Props> = {
  args: {
    name: "Alice",
    signOut: () => alert("サインアウトしました！"),
  },
};
