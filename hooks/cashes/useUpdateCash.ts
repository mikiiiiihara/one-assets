import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { CashModel } from "@server/repositories/cash/cash.model";

const useUpdateCash = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const updateCash = useCallback(
    async (id: string, price: number) => {
      setIsUpdating(true);
      try {
        const updatedCash = await fetchApi<CashModel>(
          `/api/cashes/${id}`,
          setError,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price }),
          }
        );
        if (updatedCash === null) {
          throw new Error("Failed to update cash");
        }
        setIsUpdating(false);
        return updatedCash;
      } catch (e) {
        setError((e as Error).message);
        setIsUpdating(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isUpdating, updateCash, error };
};

export default useUpdateCash;
