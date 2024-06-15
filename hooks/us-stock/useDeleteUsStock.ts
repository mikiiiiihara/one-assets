import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";
import { DeleteUsStockInput } from "@server/repositories/stock/us/input";

const useDeleteUsStock = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const deleteUsStock = useCallback(
    async (input: DeleteUsStockInput) => {
      setIsDeleting(true);
      const { id, cashId, changedPrice } = input;
      try {
        const deletedStock = await fetchApi<UsStockModel>(
          `/api/us-stocks/${id}`,
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
          throw new Error("Failed to delete US stock");
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

  return { isDeleting, deleteUsStock, error };
};

export default useDeleteUsStock;
