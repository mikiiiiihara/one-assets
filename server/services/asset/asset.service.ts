import { List as UsStockList } from "@server/repositories/stock/us/us-stock.repository";
import { Asset } from "./asset";

export const getAssets = async (userId: string): Promise<Asset[]> => {
  // 米国株式情報を取得
  const usStocks = await UsStockList(userId);

  const assets: Asset[] = [];
  usStocks.forEach((usStock) => {
    assets.push({
      code: usStock.code,
      currentPrice: usStock.currentPrice,
      currentRate: usStock.currentRate,
      dividends: usStock.dividends,
      getPrice: usStock.getPrice,
      getPriceTotal: usStock.getPrice * usStock.quantity,
      id: parseInt(usStock.id),
      priceGets: usStock.priceGets,
      quantity: usStock.quantity,
      sector: usStock.sector,
      usdJpy: usStock.usdjpy,
      group: "usStock",
    });
  });
  return assets;
};
