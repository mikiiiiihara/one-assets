import { useState, useEffect } from "react";
import useFetchAPI from "../useFetchApi";
import { AssetHistoryModel } from "@server/repositories/asset-history/asset-history.model";

const useAssetHistories = (day?: number) => {
  const [assetHistories, setAssetHistories] = useState<AssetHistoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  useEffect(() => {
    const getAssetHistories = async () => {
      setIsLoading(true);
      const query = day !== undefined ? `?day=${day}` : "";
      const url = `/api/asset-history${query}`;
      const data = await fetchApi<AssetHistoryModel[]>(url, setError);
      if (data === null) throw new Error("Failed to fetch asset histories");
      setAssetHistories(data);
      setIsLoading(false);
    };

    getAssetHistories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  return { assetHistories, setAssetHistories, isLoading, error };
};

export default useAssetHistories;
