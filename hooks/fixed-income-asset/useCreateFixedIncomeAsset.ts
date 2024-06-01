import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { FixedIncomeAssetModel } from "@server/repositories/fixed-income-asset/fixed-income-asset.model";

const useCreateFixedIncomeAsset = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const createFixedIncomeAsset = useCallback(
    async (
      code: string,
      getPriceTotal: number,
      dividendRate: number,
      usdjpy: number,
      paymentMonth: number[]
    ) => {
      setIsCreating(true);
      try {
        const newAsset = await fetchApi<FixedIncomeAssetModel>(
          `/api/fixed-income-assets`,
          setError,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
              getPriceTotal,
              dividendRate,
              usdjpy,
              paymentMonth,
            }),
          }
        );
        if (newAsset === null) {
          throw new Error("Failed to create fixed income asset");
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

  return { isCreating, createFixedIncomeAsset, error };
};

export default useCreateFixedIncomeAsset;
