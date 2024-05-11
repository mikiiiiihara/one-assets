import { fetchUsStockPrices } from "@server/adapters/us-stock/us-stock.adapter";
import { Get } from "@server/repositories/user/user.repository";
/**
 * Fetch user by id
 */
export const userById = async (id: string) => {
  const codes = ["TSLA", "KRUS", "UAL", "RTX"];
  const usStockMarketPrices = await fetchUsStockPrices(codes);
  console.log(
    "usStockMarketPrices:",
    usStockMarketPrices.map((d) => ({
      symbol: d.symbol,
      currentPrice: d.price,
      priceGet: d.change,
      currentRate: d.changesPercentage,
    }))
  );
  return await Get(id);
};
