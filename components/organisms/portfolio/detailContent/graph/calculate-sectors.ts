import { PieData } from "@components/atoms/graph/pie";
import { Detail } from "../../types";

type SectorData = {
  sector: string;
  amount: number;
};

export const calculateSectors = (details: Detail[]): PieData[] => {
  // セクター名取得
  let sectorData: SectorData[] = new Array();
  for (let data of details) {
    const existData = sectorData.find((e) => e.sector === data.sector);
    if (existData == undefined) {
      const item: SectorData = {
        sector: data.sector,
        amount: data.sumOfPrice,
      };
      sectorData.push(item);
    } else {
      existData.amount += data.sumOfPrice;
    }
  }
  let result: PieData[] = new Array();
  for (let data of sectorData) {
    const pieData: PieData = {
      name: data.sector,
      y: Math.round(data.amount * 10) / 10,
    };
    result.push(pieData);
  }
  result.sort(function (a, b) {
    if (a.y > b.y) return -1;
    if (a.y < b.y) return 1;
    return 0;
  });
  return result;
};
