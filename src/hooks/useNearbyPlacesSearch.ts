import useData from "./useData";

export interface SearchResultsNearby {
  placeName: string;
  placeTags: string[];
}

const useNearbyPlacesSearch = (searchTerm: string, lat: string, lng: string) =>
  useData<SearchResultsNearby>(
    "/api/places/searchNearby",
    500,
    searchTerm.length > 2
      ? { params: { cityName: searchTerm, lat: lat, lng: lng } }
      : null,
    [searchTerm]
  );

export default useNearbyPlacesSearch;
