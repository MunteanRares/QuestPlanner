import { useEffect, useState } from "react";
import CitiesApiClient from "../services/CitiesApiClient";
import { AxiosRequestConfig, CanceledError } from "axios";

const useData = <T>(
  endpoint: string,
  msTimeAmount: number,
  requestConfig?: AxiosRequestConfig | null,
  deps?: any[]
) => {
  const [error, setError] = useState("");
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      if (requestConfig === null) return;

      const controller = new AbortController();
      const debounceTimer = setTimeout(() => {
        setLoading(true);
        CitiesApiClient.get(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
          .then((response) => {
            setData(response.data);
            setLoading(false);
          })
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            setLoading(false);
          })
          .finally(() => setLoading(false));
      }, msTimeAmount);

      return () => {
        controller.abort();
        debounceTimer > 0 && clearTimeout(debounceTimer);
      };
    },
    deps ? [...deps] : []
  );

  // console.log(data);
  return { data, isLoading, error };
};

export default useData;
