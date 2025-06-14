import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { CryptoModel } from "@server/repositories/crypto/crypto.model";

const useDeleteCrypto = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const deleteCrypto = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      try {
        const deletedCrypto = await fetchApi<CryptoModel>(
          `/api/crypto/${id}`,
          setError,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (deletedCrypto === null) {
          throw new Error("Failed to delete crypto");
        }
        setIsDeleting(false);
        return deletedCrypto;
      } catch (e) {
        setError((e as Error).message);
        setIsDeleting(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isDeleting, deleteCrypto, error };
};

export default useDeleteCrypto;