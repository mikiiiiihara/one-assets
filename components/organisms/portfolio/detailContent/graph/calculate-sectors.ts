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
    const existData = sectorData.find(
      (e) =>
        getSectorNameJapanese(e.sector) === getSectorNameJapanese(data.sector)
    );
    if (existData == undefined) {
      const item: SectorData = {
        sector: getSectorNameJapanese(data.sector),
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

const getSectorNameJapanese = (sector: string) => {
  switch (sector) {
    case "japanFund":
      return "日本投信";
    case "japanStock":
      return "日本株";
    case "usStock":
      return "米国株";
    case "fixedIncomeAsset":
      return "固定利回資産";
    case "crypto":
      return "仮想通貨";
    case "JPY":
      return "現金(¥)";
    case "USD":
      return "現金($)";
    default:
      return sector;
  }
};
