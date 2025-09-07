import { Meta, StoryObj } from "@storybook/react";
import { StackedArea, StackedAreaType } from "./stacked-area";

export default {
  title: "atoms/Graph/StackedArea",
  component: StackedArea,
} as Meta;

const xData = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
];

const series: StackedAreaType[] = [
  { name: "Invested", data: [10, 20, 30, 35, 40, 48, 55, 60, 70, 78, 85, 95] },
  { name: "Value", data: [12, 22, 28, 38, 44, 52, 60, 66, 76, 84, 92, 105] },
];

export const Default: StoryObj = {
  args: {
    background: "rgba(10, 10, 10, 0.95)",
    xData,
    series,
  },
};

