import { useEffect, useState } from "react";
import CitiesApiClient from "../services/CitiesApiClient";

export interface itineraryDTO {
  days: {
    activities: {
      imageUrl: string;
      location: string;
    }[];
    date: Date;
  }[];
  title: string;
  date: Date;
  id: number;
}

const useGetItineraries = () => {
  const [data, setData] = useState<itineraryDTO[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    CitiesApiClient.get("/api/Users/getItineraries", {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
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

export default useGetItineraries;
