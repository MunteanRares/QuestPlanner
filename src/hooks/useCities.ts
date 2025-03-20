import { useEffect, useState } from "react";
import CitiesApiClient from "../services/CitiesApiClient";
import { CanceledError } from "axios";

interface StructuredFormattingModel {
  mainText: string;
}

export interface City {
  description: string;
  structuredFormatting: StructuredFormattingModel;
}

const useCities = (searchTerm: string, deps?: any[]) => {
  const [error, setError] = useState("");
  const [data, setData] = useState<City[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      if (searchTerm.length < 2) {
        setData([]); // Clear the data if searchTerm length is less than 2
        return;
      }
      const controller = new AbortController();
      const delayDebounceFn = setTimeout(() => {
        setLoading(true);
        if (!searchTerm || searchTerm.length <= 2) return;

        CitiesApiClient.get("/api/cities/search", {
          signal: controller.signal,
          params: { cityName: searchTerm },
        })
          .then((response) => {
            setData(response.data);
            console.log(response.data);
            setLoading(false);
          })
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            setLoading(false);
          })
          .finally(() => setLoading(false));
      }, 1000);

      return () => {
        controller.abort();
        clearTimeout(delayDebounceFn);
      };
    },
    deps ? [...deps] : []
  );

  console.log(data);
  return { data, isLoading };
};

export default useCities;
