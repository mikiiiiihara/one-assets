import { useState, useEffect, useCallback } from "react";
import useFetchAPI from "../useFetchApi";
import { AssetHistoryModel } from "@server/repositories/asset-history/asset-history.model";
import { formatDateToJST } from "utils/date";

const useAssetHistories = (initialDay: number = 7) => {
  const [assetHistories, setAssetHistories] = useState<AssetHistoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();
  const [queryParams, setQueryParams] = useState<{
    day?: number;
    startDate?: string;
    endDate?: string;
  }>({ day: initialDay });

  const getAssetHistories = useCallback(
    async (params: { day?: number; startDate?: string; endDate?: string }) => {
      setIsLoading(true);
      let query = "";
      if (params.day !== undefined) query += `day=${params.day}&`;
      if (params.startDate) query += `startDate=${params.startDate}&`;
      if (params.endDate) query += `endDate=${params.endDate}`;
      if (query.endsWith("&")) query = query.slice(0, -1);
      const url = `/api/asset-histories${query ? `?${query}` : ""}`;
      const data = await fetchApi<AssetHistoryModel[]>(url, setError);
      if (data === null) throw new Error("Failed to fetch asset histories");
      setAssetHistories(data);
      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getAssetHistories(queryParams);
  }, [getAssetHistories, queryParams]);

  const refetch = (day?: number, startDate?: Date, endDate?: Date) => {
    setQueryParams({
      day,
      startDate: startDate ? formatDateToJST(startDate) : undefined,
      endDate: endDate ? formatDateToJST(endDate) : undefined,
    });
  };

  return { assetHistories, isLoading, error, refetch };
};

export default useAssetHistories;
