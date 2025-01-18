import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { CryptoModel } from "@server/repositories/crypto/crypto.model";

const useCreateCrypto = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const createCrypto = useCallback(
    async (code: string, getPrice: number, quantity: number) => {
      setIsCreating(true);
      try {
        const newAsset = await fetchApi<CryptoModel>(`/api/crypto`, setError, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            getPrice,
            quantity,
          }),
        });
        if (newAsset === null) {
          throw new Error("Failed to create crypto");
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

  return { isCreating, createCrypto, error };
};

export default useCreateCrypto;
