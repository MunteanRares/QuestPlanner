import { useState } from "react";
import CitiesApiClient from "../services/CitiesApiClient";
import { CanceledError } from "axios";

export interface Response {
  token: string;
}

const useLoginUser = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState<Response>({ token: "" });
  const [isLoading, setLoading] = useState(false);

  const fetchLoginUser = (email: string, password: string) => {
    setLoading(true);
    const controller = new AbortController();

    CitiesApiClient.post("/api/Users/LoginUser", {
      signal: controller.signal,
      email,
      password,
    })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });

    return controller.abort();
  };

  return { data, isLoading, error, fetchLoginUser };
};

export default useLoginUser;
