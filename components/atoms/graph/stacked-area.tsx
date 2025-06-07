import React from "react";
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ANIMATION_DURATION_TIME } from "./setting";
type Props = {
  themeColor?: string;
  background: string;
  xData: string[];
  series: StackedAreaType[];
};

export type StackedAreaType = {
  name: string;
  data: number[];
};

const StackedAreaComponent: FC<Props> = ({
  themeColor,
  background,
  xData,
  series,
}) => {
  const options = {
    chart: {
      type: "area",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    exporting: { enabled: false },
    xAxis: {
      categories: xData,
      crosshair: {
        color: "rgba(30, 204, 158, 0.3)",
        width: 1,
      },
      labels: {
        style: {
          color: "#ffffff",
        },
      },
      lineColor: "rgba(255, 255, 255, 0.2)",
      tickColor: "rgba(255, 255, 255, 0.2)",
    },
    yAxis: {
      title: {
        useHTML: true,
        text: "",
      },
      labels: {
        style: {
          color: "#ffffff",
        },
      },
      gridLineColor: "rgba(255, 255, 255, 0.1)",
      lineColor: "rgba(255, 255, 255, 0.2)",
      tickColor: "rgba(255, 255, 255, 0.2)",
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size:12px"><b>{point.key}</b></span><br>',
      backgroundColor: "rgba(10, 10, 10, 0.95)",
      borderColor: "rgba(30, 204, 158, 0.3)",
      borderRadius: 8,
      style: {
        color: "#ffffff",
      },
    },
    plotOptions: {
      area: {
        animation: {
          duration: ANIMATION_DURATION_TIME,
        },
        stacking: "normal",
        color: themeColor,
        lineColor: themeColor,
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "themeColor",
        },
      },
    },
    series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

StackedAreaComponent.displayName = "StackedArea";
export const StackedArea = React.memo(StackedAreaComponent);
