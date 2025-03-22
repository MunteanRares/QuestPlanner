import useData from "./useData";

export interface NearbyPlaces {
  placeName: string;
  currentCityName: string;
  formattedAddress: string;
  imageUrl: string;
  placeId: string;
}

const useGetNearbyPlaces = (lat: number | undefined, lng: number | undefined) =>
  useData<NearbyPlaces>("/api/places/getNearby", 500, {
    params: { lat: lat, lng: lng },
  });

export default useGetNearbyPlaces;
