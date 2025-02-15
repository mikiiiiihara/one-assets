import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { JapanFundModel } from "@server/repositories/japan-fund/japan-fund.model";

const useCreateJapanFund = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const createJapanFund = useCallback(
    async (
      code: string,
      name: string,
      getPrice: number,
      getPriceTotal: number
    ) => {
      setIsCreating(true);
      try {
        const newFund = await fetchApi<JapanFundModel>(
          `/api/japan-funds`,
          setError,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
              name,
              getPrice,
              getPriceTotal,
            }),
          }
        );
        if (newFund === null) {
          throw new Error("Failed to create Japan fund");
        }
        setIsCreating(false);
        return newFund;
      } catch (e) {
        setError((e as Error).message);
        setIsCreating(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isCreating, createJapanFund, error };
};

export default useCreateJapanFund;
