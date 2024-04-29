import { User } from "models/user";
import { useState, useEffect } from "react";
import useFetchAPI from "./useFetchApi";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      const userData = await fetchApi<User>("/api/me", setError);
      setUser(userData);
      setIsLoading(false);
    };

    getUserData();
  }, []);

  return { user, isLoading, error };
};

export default useUser;
