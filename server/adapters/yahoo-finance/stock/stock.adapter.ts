import createAxiosClient from "@server/lib/axios.client";
/**
 * Fetch japan stock prices for given codes
 */
export const fetchJapanStockPrices = async (code: string): Promise<number> => {
  const axiosClient = createAxiosClient("https://query1.finance.yahoo.com");
  try {
    const response = await axiosClient.get(`/v8/finance/chart/${code}.T`);
    // return response.data; // APIからの生データをそのまま返す
    const price = response.data.chart.result[0].meta;
    return price.regularMarketPrice;
  } catch (error) {
    console.error("Error fetching stock prices:", error);
    throw new Error("Failed to fetch stock prices");
  }
};
