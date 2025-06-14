import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { FixedIncomeAssetModel } from "@server/repositories/fixed-income-asset/fixed-income-asset.model";

const useUpdateFixedIncomeAsset = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const updateFixedIncomeAsset = useCallback(
    async (id: string, getPriceTotal: number, dividendRate: number, usdjpy: number, paymentMonth: number[]) => {
      setIsUpdating(true);
      try {
        const updatedFixedIncomeAsset = await fetchApi<FixedIncomeAssetModel>(
          `/api/fixed-income-assets/${id}`,
          setError,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ getPriceTotal, dividendRate, usdjpy, paymentMonth }),
          }
        );
        if (updatedFixedIncomeAsset === null) {
          throw new Error("Failed to update fixed income asset");
        }
        setIsUpdating(false);
        return updatedFixedIncomeAsset;
      } catch (e) {
        setError((e as Error).message);
        setIsUpdating(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isUpdating, updateFixedIncomeAsset, error };
};

export default useUpdateFixedIncomeAsset;