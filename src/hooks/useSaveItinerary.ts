import React, { useEffect, useState } from "react";
import {
  activityDataModel,
  itineraryModel,
} from "../Components/PlannerPage/PlannerPage";
import CitiesApiClient from "../services/CitiesApiClient";
import { useStatStyles } from "@chakra-ui/react";

const useSaveItinerary = () => {
  const [error, setError] = useState();

  const saveItinerary = (itinerary: itineraryModel) => {
    CitiesApiClient.post("/api/Users/saveItinerary", itinerary, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).catch((err) => {
      setError(err.message);
    });
  };

  return { saveItinerary };
};

export default useSaveItinerary;
