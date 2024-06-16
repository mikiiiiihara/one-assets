import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { JapanStockModel } from "@server/repositories/stock/jp/japan-stock.model";
import { DeleteJapanStockInput } from "@server/repositories/stock/jp/input";

const useDeleteJapanStock = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const deleteJapanStock = useCallback(
    async (input: DeleteJapanStockInput) => {
      setIsDeleting(true);
      const { id, cashId, changedPrice } = input;
      try {
        const deletedStock = await fetchApi<JapanStockModel>(
          `/api/japan-stocks/${id}`,
          setError,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cashId,
              changedPrice,
            }),
          }
        );
        if (deletedStock === null) {
          throw new Error("Failed to delete Japan stock");
        }
        setIsDeleting(false);
        return deletedStock;
      } catch (e) {
        setError((e as Error).message);
        setIsDeleting(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isDeleting, deleteJapanStock, error };
};

export default useDeleteJapanStock;
