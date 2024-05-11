import { List as UsStockList } from "@server/repositories/stock/us/us-stock.repository";
import { Asset } from "./asset";
import { List as JapanFundList } from "@server/repositories/japan-fund/japan-fund.repository";

export const getAssets = async (userId: string): Promise<Asset[]> => {
  const assets: Asset[] = [];
  // 米国株式
  const usStocks = await UsStockList(userId);
  usStocks.forEach((usStock) => {
    assets.push({
      code: usStock.code,
      name: usStock.code, // TODO: repositoryから持ってきてもいいかもしれない
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
  // 日本株式
  // 日本投資信託
  const japanFunds = await JapanFundList(userId);
  japanFunds.forEach((japanFund) => {
    assets.push({
      code: japanFund.code,
      name: japanFund.name,
      currentPrice: japanFund.currentPrice,
      currentRate: 0,
      dividends: [],
      getPrice: japanFund.getPrice,
      getPriceTotal: japanFund.getPriceTotal,
      id: parseInt(japanFund.id),
      priceGets: 0,
      quantity: 0,
      sector: "japanFund",
      usdJpy: 0,
      group: "japanFund",
    });
  });
  //　仮想通貨
  // 固定利回り資産
  // 現金
  return assets;
};
