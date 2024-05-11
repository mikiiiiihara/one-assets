import createAxiosClient from "@server/lib/axios.client";
/**
 * Fetch us stock prices for given codes
 */
export const fetchUsStockPrices = async (
  codes: string[]
): Promise<UsStockMarketPrice[]> => {
  const baseUrl = process.env.STOCK_API_BASE_URL ?? "";
  const token = process.env.STOCK_API_PRICE_TOKEN;
  const axiosClient = createAxiosClient(baseUrl);
  try {
    const response = await axiosClient.get<UsStockMarketPrice[]>(
      `${baseUrl}/v3/quote-order/${codes.toString()}?apikey=${token}`
    );
    return response.data; // APIからの生データをそのまま返す
  } catch (error) {
    console.error("Error fetching stock prices:", error);
    throw new Error("Failed to fetch stock prices");
  }
};

/**
 * Fetch us stock dividends for given code
 */
export const fetchUsStockDividend = async (
  code: string
): Promise<UsStockDividend> => {
  // ローカルでの検証時、本番に繋がないようにダミーデータを返す（TODO: ローカルでのモックサーバー構築が完了するまで）
  return {
    symbol: code,
    historical: [],
  };
  // const baseUrl = process.env.STOCK_API_BASE_URL ?? "";
  // const token = process.env.STOCK_API_DIVIDEND_TOKEN_MAIN;
  // const axiosClient = createAxiosClient(baseUrl);
  // try {
  //   const response = await axiosClient.get<UsStockDividend>(
  //     `${baseUrl}/v3/historical-price-full/stock_dividend/${code}?apikey=${token}`
  //   );
  //   return response.data; // APIからの生データをそのまま返す
  // } catch (error: any) {
  //   if (error.response?.status === 429) {
  //     console.log("Rate limit exceeded, retrying with a different token...");
  //     const newToken = process.env.STOCK_API_DIVIDEND_TOKEN_SUB; // 代替のAPIキートークン
  //     try {
  //       const response = await axiosClient.get<UsStockDividend>(
  //         `${baseUrl}/v3/historical-price-full/stock_dividend/${code}?apikey=${newToken}`
  //       );
  //       return response.data;
  //     } catch (secondError) {
  //       console.error("Error fetching stock dividends:", secondError);
  //       throw new Error("Failed to fetch stock dividends after retry");
  //     }
  //   } else {
  //     console.error("Error fetching stock dividends:", error);
  //     throw new Error("Failed to fetch stock dividends");
  //   }
  // }
};
