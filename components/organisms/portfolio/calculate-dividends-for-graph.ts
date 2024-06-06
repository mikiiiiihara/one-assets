import { DivData } from "@components/atoms/graph/stacked-column";
import { Detail } from "./types";

export const convertDetailsToDivData = (details: Detail[]): DivData[] => {
  const divDataArray: DivData[] = details.map((detail) => {
    const monthlyDividends = new Array(12).fill(0);

    detail.dividend.forEach((dividend) => {
      const month = new Date(dividend.paymentDate).getMonth(); // 0-11 for Jan-Dec
      monthlyDividends[month] +=
        Math.round(dividend.price * detail.quantity * 100) / 100;
    });

    return {
      name: detail.name,
      data: monthlyDividends,
    };
  });

  return divDataArray;
};
