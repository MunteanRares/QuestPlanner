import useData from "./useData";

export interface MostVisitedCities {
  cityName: string;
  country: string;
  imageUrl: string;
  placeId: string;
}

const useGetMostVisitedCities = () =>
  useData<MostVisitedCities>("/api/cities/getMostVisited", 0);

export default useGetMostVisitedCities;
