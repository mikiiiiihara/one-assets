import { Meta, StoryObj } from "@storybook/react";
import AssetHistory, { Props } from ".";

export default {
  title: "organisms/AssetHistory",
  component: AssetHistory,
} as Meta<Props>;

export const Default: StoryObj<Props> = {
  args: {
    assetHistories: [
      {
        id: "cm3zn6c2y0001obok8yautxhk",
        stock: 100000,
        fund: 110000,
        crypto: 60000,
        fixedIncomeAsset: 0,
        cash: 200000,
        createdAt: new Date("2024-11-27T08:46:40.043Z"),
      },
      {
        id: "cm3zn51x50000obokpm79meg9",
        stock: 90000,
        fund: 95000,
        crypto: 15000,
        fixedIncomeAsset: 0,
        cash: 200000,
        createdAt: new Date("2024-11-26T08:45:40.218Z"),
      },
      {
        id: "cm3zmz3pr0000vi08f3an5691",
        stock: 80000,
        fund: 90000,
        crypto: 20000,
        fixedIncomeAsset: 0,
        cash: 200000,
        createdAt: new Date("2024-11-25T08:41:02.608Z"),
      },
    ],
  },
};

export const Empty: StoryObj<Props> = {
  args: {
    assetHistories: [],
  },
};

export const SinglePoint: StoryObj<Props> = {
  args: {
    assetHistories: [
      {
        id: "single-1",
        stock: 50000,
        fund: 25000,
        crypto: 10000,
        fixedIncomeAsset: 0,
        cash: 100000,
        createdAt: new Date("2024-11-01T00:00:00.000Z"),
      },
    ],
  },
};

export const DecreasingTrend: StoryObj<Props> = {
  args: {
    assetHistories: [
      {
        id: "dec-1",
        stock: 120000,
        fund: 100000,
        crypto: 30000,
        fixedIncomeAsset: 0,
        cash: 200000,
        createdAt: new Date("2024-11-20T00:00:00.000Z"),
      },
      {
        id: "dec-2",
        stock: 110000,
        fund: 95000,
        crypto: 20000,
        fixedIncomeAsset: 0,
        cash: 200000,
        createdAt: new Date("2024-11-21T00:00:00.000Z"),
      },
      {
        id: "dec-3",
        stock: 90000,
        fund: 90000,
        crypto: 15000,
        fixedIncomeAsset: 0,
        cash: 200000,
        createdAt: new Date("2024-11-22T00:00:00.000Z"),
      },
    ],
  },
};

export const WithFixedIncome: StoryObj<Props> = {
  args: {
    assetHistories: [
      {
        id: "fix-1",
        stock: 70000,
        fund: 80000,
        crypto: 10000,
        fixedIncomeAsset: 50000,
        cash: 150000,
        createdAt: new Date("2024-11-10T00:00:00.000Z"),
      },
      {
        id: "fix-2",
        stock: 80000,
        fund: 90000,
        crypto: 12000,
        fixedIncomeAsset: 50000,
        cash: 150000,
        createdAt: new Date("2024-11-11T00:00:00.000Z"),
      },
      {
        id: "fix-3",
        stock: 85000,
        fund: 92000,
        crypto: 13000,
        fixedIncomeAsset: 50000,
        cash: 150000,
        createdAt: new Date("2024-11-12T00:00:00.000Z"),
      },
    ],
  },
};
