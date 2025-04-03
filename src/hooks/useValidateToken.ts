import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CitiesApiClient from "../services/CitiesApiClient";
import { CanceledError } from "axios";

export interface Response {
  valid: boolean;
}

const useValidateToken = () => {
  const [data, setData] = useState<Response>({ valid: false });
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const controller = new AbortController();

    if (!token) {
      setData({ valid: false });
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();

      if (isExpired) {
        console.warn("Token expired");
        setData({ valid: false });
        localStorage.removeItem("jwtToken");
        return;
      }

      CitiesApiClient.post(
        "/api/Users/ValidateToken",
        { signal: controller.signal },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          if (err instanceof CanceledError)
            console.error("Token validation error:", err);
          setError(err);
          setData({ valid: false });
        });
    } catch (e) {
      console.error("Invalid token:", e);
      setData({ valid: false });
      localStorage.removeItem("jwtToken");
    }

    return controller.abort();
  }, [token]);

  return { data, error };
};

export default useValidateToken;
