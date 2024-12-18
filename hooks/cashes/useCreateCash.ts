import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { CashModel } from "@server/repositories/cash/cash.model";

const useCreateCash = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const createCash = useCallback(
    async (name: string, price: number, sector: string) => {
      setIsCreating(true);
      try {
        const newAsset = await fetchApi<CashModel>(`/api/cashes`, setError, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            price,
            sector,
          }),
        });
        if (newAsset === null) {
          throw new Error("Failed to create cash");
        }
        setIsCreating(false);
        return newAsset;
      } catch (e) {
        setError((e as Error).message);
        setIsCreating(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isCreating, createCash, error };
};

export default useCreateCash;
