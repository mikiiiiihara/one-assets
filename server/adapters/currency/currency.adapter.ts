import createAxiosClient from "@server/lib/axios.client";
/**
 * Fetch currency rates
 */
export const fetchCurrencyRates = async (): Promise<CurrencyRate[]> => {
  const baseUrl = process.env.CURRENCY_URL ?? "";
  const axiosClient = createAxiosClient(baseUrl);
  try {
    const response = await axiosClient.get<CurrencyRates>(baseUrl);
    return response.data.quotes;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    throw new Error("Failed to fetch currency rates");
  }
};
