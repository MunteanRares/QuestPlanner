import { useState } from "react";
import CitiesApiClient from "../services/CitiesApiClient";

const useDeleteItinerary = () => {
  const [error, setError] = useState("");

  const deleteItineraryFunc = (id: number) => {
    CitiesApiClient.delete(`/api/Users/deleteItinerary/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }).catch((err) => {
      setError(err.message);
    });
  };

  return { deleteItineraryFunc, error };
};

export default useDeleteItinerary;
