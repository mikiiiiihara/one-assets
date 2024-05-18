import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";

const useUpdateUsStock = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const updateUsStock = useCallback(
    async (id: string, quantity: number, getPrice: number, usdJpy: number) => {
      setIsUpdating(true);
      try {
        const updatedStock = await fetchApi<UsStockModel>(
          `/api/us-stocks/${id}`,
          setError,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity, getPrice, usdJpy }),
          }
        );
        if (updatedStock === null) {
          throw new Error("Failed to update US stock");
        }
        setIsUpdating(false);
        return updatedStock;
      } catch (e) {
        setError((e as Error).message);
        setIsUpdating(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isUpdating, updateUsStock, error };
};

export default useUpdateUsStock;
