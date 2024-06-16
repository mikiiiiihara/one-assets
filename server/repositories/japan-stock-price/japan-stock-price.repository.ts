import prismaClient from "@server/lib/prisma-client";
import { JapanStockPriceModel } from "./japan-stock-price.model";

export const List = async (): Promise<JapanStockPriceModel[]> => {
  const japanStockPrices = await prismaClient.japanStockPrice.findMany({
    orderBy: {
      name: "asc", // 名前順で取得
    },
    select: {
      id: true,
      name: true,
      code: true,
      price: true,
      dividend: true,
    },
  });

  if (japanStockPrices.length === 0) return [];

  return japanStockPrices;
};
