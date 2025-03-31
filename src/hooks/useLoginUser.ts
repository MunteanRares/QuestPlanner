import { useEffect, useState } from "react";
import useData from "./useData";
import CitiesApiClient from "../services/CitiesApiClient";

export interface Response {
  token: string;
}

const useLoginUser = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState<Response>({ token: "" });
  const [isLoading, setLoading] = useState(false);

  const fetchLoginUser = (email: string, password: string) => {
    CitiesApiClient.post("/api/Users/LoginUser", { email, password })
      .then((response) => {
        setData(response.data);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { data, isLoading, error, fetchLoginUser };
};

export default useLoginUser;
