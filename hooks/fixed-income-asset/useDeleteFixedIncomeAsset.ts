import { useState, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { FixedIncomeAssetModel } from "@server/repositories/fixed-income-asset/fixed-income-asset.model";

const useDeleteFixedIncomeAsset = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const deleteFixedIncomeAsset = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      try {
        const deletedFixedIncomeAsset = await fetchApi<FixedIncomeAssetModel>(
          `/api/fixed-income-assets/${id}`,
          setError,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (deletedFixedIncomeAsset === null) {
          throw new Error("Failed to delete fixed income asset");
        }
        setIsDeleting(false);
        return deletedFixedIncomeAsset;
      } catch (e) {
        setError((e as Error).message);
        setIsDeleting(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isDeleting, deleteFixedIncomeAsset, error };
};

export default useDeleteFixedIncomeAsset;