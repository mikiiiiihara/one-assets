import { Meta, StoryObj } from "@storybook/react";
import { Pie, PieData } from "./pie";

export default {
  title: "atoms/Graph/Pie",
  component: Pie,
} as Meta;

const sampleColors = [
  "#007bff",
  "#ff3333",
  "#ffd700",
  "#00d56a",
  "orange",
  "#00ced1",
];

const sampleData: PieData[] = [
  { name: "US Stock", y: 45 },
  { name: "Japan Stock", y: 25 },
  { name: "Crypto", y: 10 },
  { name: "Cash", y: 20 },
];

export const Default: StoryObj = {
  args: {
    pieData: sampleData,
    themeColor: sampleColors,
    background: "rgba(10, 10, 10, 0.95)",
  },
};

