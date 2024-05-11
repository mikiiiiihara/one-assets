import { PieData } from "@components/atoms/graph/pie";
import { Detail } from "../../types";

export const calculateTickerPie = (details: Detail[]): PieData[] => {
  let graphData: PieData[] = new Array();
  // 比率計算
  for (let data of details) {
    const yData = data.sumOfPrice;
    const value = {
      name: truncateString(data.name),
      y: Math.round(yData * 10) / 10,
    };
    graphData.push(value);
  }
  return graphData.sort(function (a, b) {
    if (a.y > b.y) return -1;
    if (a.y < b.y) return 1;
    return 0;
  });
};

const truncateString = (str: string) => {
  const maxLength = 4;
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
};
