import { NextRouter, useRouter } from "next/router";

const useFetchApi = () => {
  const router = useRouter();

  const fetchApi = async <T>(
    url: string,
    setError: (message: string) => void
  ): Promise<T | null> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        await handleApiError(response, setError, router);
        return null;
      }
      return (await response.json()) as T;
    } catch (error: any) {
      console.error("Failed to fetch data:", error);
      setError("Failed to fetch data: " + error.message);
      return null;
    }
  };

  return fetchApi;
};

const handleApiError = async (
  response: Response,
  setError: (message: string) => void,
  router: NextRouter
) => {
  console.error(response);
  if (response.status === 401) {
    router.push("/login");
    return;
  }
  const message = `HTTP error! status: ${response.status}`;
  setError(message);
};

export default useFetchApi;
