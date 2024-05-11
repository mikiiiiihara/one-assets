import { useState, useEffect } from "react";
import useFetchAPI from "./useFetchApi";
import { Currency } from "@server/services/currency/currency";

const useCurrentUsdJpy = () => {
  const [currentUsdJpy, setCurrentUsdJpy] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      const response = await fetchApi<Currency>("/api/usd-jpy", setError);
      setCurrentUsdJpy(response?.rate || 0);
      setIsLoading(false);
    };

    getUserData();
  }, []);

  return { currentUsdJpy, isLoading, error };
};

export default useCurrentUsdJpy;
