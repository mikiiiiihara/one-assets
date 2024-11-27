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
