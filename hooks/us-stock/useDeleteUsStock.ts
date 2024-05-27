import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";

const useDeleteUsStock = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const deleteUsStock = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      try {
        const deletedStock = await fetchApi<UsStockModel>(
          `/api/us-stocks/${id}`,
          setError,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
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
