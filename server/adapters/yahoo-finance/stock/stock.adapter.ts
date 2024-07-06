import createAxiosClient from "@server/lib/axios.client";
import { JapanChartResponse, JapanStockPrice } from "./response";
/**
 * Fetch japan stock prices for given codes
 */
export const fetchJapanStockPrices = async (
  code: string
): Promise<JapanStockPrice> => {
  const baseUrl = process.env.YAHOO_FINANCE_URL ?? "";
  const axiosClient = createAxiosClient(baseUrl);
  try {
    const response = await axiosClient.get<JapanChartResponse>(
      `/v8/finance/chart/${code}.T`
    );
    const price = response.data.chart.result[0].meta;
    return {
      code: price.symbol,
      price: price.regularMarketPrice,
      previousClosePrice: price.previousClose,
    };
  } catch (error) {
    console.error("Error fetching stock prices:", error);
    throw new Error("Failed to fetch stock prices");
  }
};
