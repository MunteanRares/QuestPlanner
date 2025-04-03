import { useState } from "react";
import CitiesApiClient from "../services/CitiesApiClient";
import { Response } from "./useLoginUser";
import { CanceledError } from "axios";

const useRegisterUser = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState<Response>({ token: "" });
  const [isLoading, setLoading] = useState(false);

  const fetchRegisterUser = (
    username: string,
    email: string,
    password: string
  ) => {
    const controller = new AbortController();

    setLoading(true);
    CitiesApiClient.post("/api/Users/RegisterUser", {
      signal: controller.signal,
      username,
      email,
      password,
    })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.response.data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });

    return controller.abort();
  };

  return { data, isLoading, error, fetchRegisterUser };
};

export default useRegisterUser;
