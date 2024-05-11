import { fetchCurrencyRates } from "@server/adapters/currency/currency.adapter";
import { Currency } from "./currency";

export const getCurrentUsdJpy = async (): Promise<Currency> => {
  const currencyRates = await fetchCurrencyRates();
  // USDJPYの情報を取得
  const currentUsdJpy = currencyRates.filter(
    (rate) => rate.currencyPairCode === "USDJPY"
  )[0];
  return {
    pairCode: currentUsdJpy.currencyPairCode,
    rate: Number(currentUsdJpy.bid),
  };
};
