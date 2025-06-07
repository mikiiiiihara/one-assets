import React from "react";
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ANIMATION_DURATION_TIME } from "./setting";

export type PieData = {
  name: string;
  y: number;
};

type Props = {
  pieData: PieData[];
  themeColor: string[];
  background: string;
};

const Component: FC<Props> = ({ pieData, themeColor, background }) => {
  const options = {
    chart: {
      backgroundColor: "transparent",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "",
    },
    exporting: { enabled: false },
    tooltip: {
      pointFormat:
        "{series.name}: <b>{point.percentage:.1f}%</b><br/><p>金額：{point.y}円</p>",
      backgroundColor: "rgba(10, 10, 10, 0.95)",
      borderColor: "rgba(30, 204, 158, 0.3)",
      borderRadius: 8,
      style: {
        color: "#ffffff",
      },
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: "pointer",
        colors: themeColor,
        animation: {
          duration: ANIMATION_DURATION_TIME,
        },
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
          distance: -50,
          filter: {
            property: "percentage",
            operator: ">",
            value: 4,
          },
          style: {
            color: "#ffffff",
            textOutline: "2px rgba(0, 0, 0, 0.8)",
            fontSize: "12px",
            fontWeight: "600",
          },
        },
      },
    },
    series: [
      {
        name: "Share",
        data: pieData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
Component.displayName = "Pie";
export const Pie = React.memo(Component);
