import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";

const useCreateUsStock = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const createUsStock = useCallback(
    async (
      code: string,
      getPrice: number,
      quantity: number,
      sector: string,
      usdjpy: number,
      cashId?: string,
      changedPrice?: number
    ) => {
      setIsCreating(true);
      try {
        const newStock = await fetchApi<UsStockModel>(
          `/api/us-stocks`,
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
              usdjpy,
              cashId,
              changedPrice,
            }),
          }
        );
        if (newStock === null) {
          throw new Error("Failed to create US stock");
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

  return { isCreating, createUsStock, error };
};

export default useCreateUsStock;
