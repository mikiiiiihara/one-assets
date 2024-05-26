import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { JapanFundModel } from "@server/repositories/japan-fund/japan-fund.model";

const useUpdateJapanFund = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const updateJapanFund = useCallback(
    async (
      id: string,
      name: string,
      code: string,
      getPriceTotal: number,
      getPrice: number
    ) => {
      setIsUpdating(true);
      try {
        const updateJapanFund = await fetchApi<JapanFundModel>(
          `/api/japan-funds/${id}`,
          setError,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, code, getPriceTotal, getPrice }),
          }
        );
        if (updateJapanFund === null) {
          throw new Error("Failed to update japan fund");
        }
        setIsUpdating(false);
        return updateJapanFund;
      } catch (e) {
        setError((e as Error).message);
        setIsUpdating(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isUpdating, updateJapanFund, error };
};

export default useUpdateJapanFund;
