import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { JapanStockModel } from "@server/repositories/stock/jp/japan-stock.model";

const useCreateJapanStock = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const createJapanStock = useCallback(
    async (
      code: string,
      name: string,
      getPrice: number,
      quantity: number,
      dividends: number,
      sector: string,
      isNoTax: boolean,
      cashId?: string,
      changedPrice?: number
    ) => {
      setIsCreating(true);
      try {
        const newStock = await fetchApi<JapanStockModel>(
          `/api/japan-stocks`,
          setError,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
              name,
              getPrice,
              quantity,
              dividends,
              sector,
              isNoTax,
              cashId,
              changedPrice,
            }),
          }
        );
        if (newStock === null) {
          throw new Error("Failed to create Japan stock");
        }
        setIsCreating(false);
        return newStock;
      } catch (e) {
        setError((e as Error).message);
        setIsCreating(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isCreating, createJapanStock, error };
};

export default useCreateJapanStock;
