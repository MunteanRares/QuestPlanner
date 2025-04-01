import { useEffect, useState } from "react";
import CitiesApiClient from "../services/CitiesApiClient";

export interface UserProfile {
  username: string;
  email: string;
}

const useGetProfile = () => {
  const [data, setData] = useState<UserProfile>();
  const [error, setError] = useState();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    CitiesApiClient.get("/api/Users/getProfile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return { data, error };
};

export default useGetProfile;
