import { useState, useEffect } from "react";
import useFetchAPI from "../useFetchApi";
import { JapanStockPriceModel } from "@server/repositories/japan-stock-price/japan-stock-price.model";

const useJapanStockPrices = () => {
  const [stockPrices, setStockPrices] = useState<JapanStockPriceModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  useEffect(() => {
    const getJapanStockPrices = async () => {
      setIsLoading(true);
      const stockPrices = await fetchApi<JapanStockPriceModel[]>(
        "/api/japan-stock-prices",
        setError
      );
      if (stockPrices === null)
        throw new Error("Failed to fetch japan stock prices");
      setStockPrices(stockPrices);
      setIsLoading(false);
    };

    getJapanStockPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stockPrices, setStockPrices, isLoading, error };
};

export default useJapanStockPrices;
