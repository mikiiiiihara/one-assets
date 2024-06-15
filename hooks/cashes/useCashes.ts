import { useState, useEffect } from "react";
import useFetchAPI from "../useFetchApi";
import { CashModel } from "@server/repositories/cash/cash.model";

const useCashes = () => {
  const [cashes, setCashes] = useState<CashModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  useEffect(() => {
    const getCashes = async () => {
      setIsLoading(true);
      const cashes = await fetchApi<CashModel[]>("/api/cashes", setError);
      if (cashes === null) throw new Error("Failed to fetch cashes");
      setCashes(cashes);
      setIsLoading(false);
    };

    getCashes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { cashes, setCashes, isLoading, error };
};

export default useCashes;
