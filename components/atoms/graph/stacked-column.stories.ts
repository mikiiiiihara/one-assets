import { Meta, StoryObj } from "@storybook/react";
import { StackedColumn, DivData } from "./stacked-column";

export default {
  title: "atoms/Graph/StackedColumn",
  component: StackedColumn,
} as Meta;

const sampleColors = [
  "#007bff",
  "#ff3333",
  "#ffd700",
  "#00d56a",
  "#00ced1",
];

const series: DivData[] = [
  { name: "US Stock", data: [2, 3, 4, 3, 5, 4, 6, 7, 5, 6, 7, 8] },
  { name: "Japan Stock", data: [1, 1, 2, 2, 2, 3, 2, 3, 3, 3, 4, 4] },
  { name: "Crypto", data: [0, 0, 1, 0, 1, 1, 1, 2, 1, 1, 2, 2] },
];

export const Default: StoryObj = {
  args: {
    divData: series,
    themeColor: sampleColors,
    background: "rgba(10, 10, 10, 0.95)",
  },
};

