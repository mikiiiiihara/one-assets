import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { CreateJapanStockInput } from "@server/repositories/stock/jp/input";
import { JapanStockModel } from "@server/repositories/stock/jp/japan-stock.model";

const useCreateJapanStock = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const createJapanStock = useCallback(
    async (
      code: string,
      getPrice: number,
      quantity: number,
      sector: string,
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
              getPrice,
              quantity,
              sector,
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