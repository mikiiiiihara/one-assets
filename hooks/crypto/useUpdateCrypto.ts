import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { CryptoModel } from "@server/repositories/crypto/crypto.model";

const useUpdateCrypto = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const updateCrypto = useCallback(
    async (id: string, getPrice: number, quantity: number) => {
      setIsUpdating(true);
      try {
        const updatedCrypto = await fetchApi<CryptoModel>(
          `/api/crypto/${id}`,
          setError,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ getPrice, quantity }),
          }
        );
        if (updatedCrypto === null) {
          throw new Error("Failed to update crypto");
        }
        setIsUpdating(false);
        return updatedCrypto;
      } catch (e) {
        setError((e as Error).message);
        setIsUpdating(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isUpdating, updateCrypto, error };
};

export default useUpdateCrypto;