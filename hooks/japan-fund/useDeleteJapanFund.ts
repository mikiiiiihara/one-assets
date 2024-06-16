import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { JapanStockModel } from "@server/repositories/stock/jp/japan-stock.model";
import { DeleteJapanFundInput } from "@server/repositories/japan-fund/input";

const useDeleteJapanFund = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const deleteJapanFund = useCallback(
    async (input: DeleteJapanFundInput) => {
      setIsDeleting(true);
      const { id, cashId, changedPrice } = input;
      try {
        const deletedFund = await fetchApi<JapanStockModel>(
          `/api/japan-funds/${id}`,
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
        if (deletedFund === null) {
          throw new Error("Failed to delete Japan stock");
        }
        setIsDeleting(false);
        return deletedFund;
      } catch (e) {
        setError((e as Error).message);
        setIsDeleting(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isDeleting, deleteJapanFund, error };
};

export default useDeleteJapanFund;
