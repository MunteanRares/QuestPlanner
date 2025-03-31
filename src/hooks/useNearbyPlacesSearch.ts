import useData from "./useData";

export interface SearchResultsNearby {
  placeId: string;
  placeName: string;
  placeTags: string[];
}

const useNearbyPlacesSearch = (searchTerm: string, lat: string, lng: string) =>
  useData<SearchResultsNearby>(
    "/api/places/searchNearby",
    500,
    searchTerm.length > 2
      ? { params: { searchTerm: searchTerm, latitude: lat, longitude: lng } }
      : null,
    [searchTerm]
  );

export default useNearbyPlacesSearch;
