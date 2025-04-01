import { useState } from "react";
import CitiesApiClient from "../services/CitiesApiClient";
import { Response } from "./useLoginUser";

const useRegisterUser = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState<Response>({ token: "" });
  const [isLoading, setLoading] = useState(false);

  const fetchRegisterUser = (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    CitiesApiClient.post("/api/Users/RegisterUser", {
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
        setError(err.response.data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, isLoading, error, fetchRegisterUser };
};

export default useRegisterUser;
