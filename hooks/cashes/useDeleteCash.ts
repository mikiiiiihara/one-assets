import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { CashModel } from "@server/repositories/cash/cash.model";

const useDeleteCash = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const deleteCash = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      try {
        const deletedCash = await fetchApi<CashModel>(
          `/api/cashes/${id}`,
          setError,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (deletedCash === null) {
          throw new Error("Failed to delete cash");
        }
        setIsDeleting(false);
        return deletedCash;
      } catch (e) {
        setError((e as Error).message);
        setIsDeleting(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isDeleting, deleteCash, error };
};

export default useDeleteCash;
