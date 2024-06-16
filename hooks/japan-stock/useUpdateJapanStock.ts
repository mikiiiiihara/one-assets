import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { JapanStockModel } from "@server/repositories/stock/jp/japan-stock.model";
import { UpdateJapanStockInput } from "@server/repositories/stock/jp/input";

const useUpdateJapanStock = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const updateJapanStock = useCallback(
    async (input: UpdateJapanStockInput) => {
      setIsUpdating(true);
      const { id, quantity, getPrice, cashId, changedPrice } = input;
      try {
        const updatedStock = await fetchApi<JapanStockModel>(
          `/api/japan-stocks/${id}`,
          setError,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity,
              getPrice,
              cashId,
              changedPrice,
            }),
          }
        );
        if (updatedStock === null) {
          throw new Error("Failed to update Japan stock");
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

  return { isUpdating, updateJapanStock, error };
};

export default useUpdateJapanStock;
