import createAxiosClient from "@server/lib/axios.client";
import { CryptoPrice } from "./response";

/**
 * Fetch currency rates
 */
export const fetchCryptoPrice = async (code: string): Promise<CryptoPrice> => {
  const baseUrl = process.env.CRYPTO_URL ?? "";
  const axiosClient = createAxiosClient(baseUrl);
  try {
    const response = await axiosClient.get<CryptoPrice>(
      `${baseUrl}/${code}_jpy/ticker`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto price:", error);
    throw new Error("Failed to fetch crypto price");
  }
};
