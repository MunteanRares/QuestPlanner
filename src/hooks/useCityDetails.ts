import useData from "./useData";

interface LocationModel {
  latitude: string;
  longitude: string;
}

interface DisplayName {
  text: string;
}

export interface DetailedCityModel {
  displayName: DisplayName;
  formattedAddress: string;
  location: LocationModel;
  photoLinks: string;
  vicinity: string;
  website: string;
}

const useCityDetails = (placeId: string | undefined) =>
  useData<DetailedCityModel>(
    "/api/cities/getDetailedCity",
    0,
    { params: { placeId: placeId } },
    [placeId]
  );

export default useCityDetails;
