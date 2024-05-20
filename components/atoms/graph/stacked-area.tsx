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
      backgroundColor: background,
    },
    title: {
      text: "",
    },
    exporting: { enabled: false },
    xAxis: {
      categories: xData,
      crosshair: true,
      labels: {
        style: {
          color: "#ffffff", // xAxisラベルの色を白に設定
        },
      },
    },
    yAxis: {
      title: {
        useHTML: true,
        text: "",
      },
      labels: {
        style: {
          color: "#ffffff", // xAxisラベルの色を白に設定
        },
      },
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size:12px"><b>{point.key}</b></span><br>',
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
