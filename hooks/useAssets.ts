import { useState, useEffect } from "react";
import useFetchAPI from "./useFetchApi";
import { Asset } from "@server/services/asset/asset";

const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  useEffect(() => {
    const getAssets = async () => {
      setIsLoading(true);
      const assets = await fetchApi<Asset[]>("/api/assets", setError);
      if (assets === null) throw new Error("Failed to fetch assets");
      setAssets(assets);
      setIsLoading(false);
    };

    getAssets();
  }, []);

  return { assets, isLoading, error };
};

export default useAssets;
