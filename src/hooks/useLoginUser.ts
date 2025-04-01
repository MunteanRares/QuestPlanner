import { useState } from "react";
import CitiesApiClient from "../services/CitiesApiClient";

export interface Response {
  token: string;
}

const useLoginUser = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState<Response>({ token: "" });
  const [isLoading, setLoading] = useState(false);

  const fetchLoginUser = (email: string, password: string) => {
    setLoading(true);
    CitiesApiClient.post("/api/Users/LoginUser", { email, password })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, isLoading, error, fetchLoginUser };
};

export default useLoginUser;
