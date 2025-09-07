import { Meta, StoryObj } from "@storybook/react";
import Top, { Props } from "."; // Top コンポーネント
import { RouterContext } from "next/dist/shared/lib/router-context";
import type { NextRouter } from "next/router";

export default {
  title: "organisms/Top",
  component: Top,
} as Meta<Props>;

export const Default: StoryObj<Props> = {
  args: {
    name: "Alice",
    signOut: () => alert("ログアウトしました！"),
  },
};

const createMockRouter = (overrides: Partial<NextRouter>): NextRouter => ({
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: async () => true,
  replace: async () => true,
  reload: () => {},
  back: () => {},
  prefetch: async () => {},
  beforePopState: () => {},
  events: {
    on() {},
    off() {},
    emit() {},
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: "ja",
  domainLocales: [],
  isPreview: false,
  ...overrides,
});

export const OnHome: StoryObj<Props> = {
  args: {
    name: "Alice",
    signOut: () => alert("ログアウトしました！"),
  },
  decorators: [
    (Story) => (
      <RouterContext.Provider value={createMockRouter({ pathname: "/" })}>
        <Story />
      </RouterContext.Provider>
    ),
  ],
};

export const OnPortfolio: StoryObj<Props> = {
  args: {
    name: "Alice",
    signOut: () => alert("ログアウトしました！"),
  },
  decorators: [
    (Story) => (
      <RouterContext.Provider
        value={createMockRouter({ pathname: "/portfolio" })}
      >
        <Story />
      </RouterContext.Provider>
    ),
  ],
};
