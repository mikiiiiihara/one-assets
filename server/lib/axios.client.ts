import axios, { AxiosInstance } from "axios";
/**
 * Creates a customized Axios instance with a specified base URL.
 * @param baseURL The base URL to be used for the axios instance.
 * @returns {AxiosInstance} A customized Axios instance.
 */
const createAxiosClient = (baseURL: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Error in API call:", error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosClient;
