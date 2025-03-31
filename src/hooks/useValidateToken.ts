import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CitiesApiClient from "../services/CitiesApiClient";

export interface Response {
  valid: boolean;
}

const useValidateToken = () => {
  const [data, setData] = useState<Response>({ valid: false });
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
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

      // Only call API if the token is not expired
      CitiesApiClient.post(
        "/api/Users/ValidateToken",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.error("Token validation error:", err);
          setError(err);
          setData({ valid: false });
        });
    } catch (e) {
      console.error("Invalid token:", e);
      setData({ valid: false });
      localStorage.removeItem("jwtToken");
    }
  }, [token]);

  return { data, error };
};

export default useValidateToken;
