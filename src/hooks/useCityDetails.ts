import useData from "./useData";

interface LocationModel {
  lat: number;
  lng: number;
}

interface GeometryLocation {
  location: LocationModel;
}

interface DetailedCityModel {
  formattedAddress: string;
  geometry: GeometryLocation;
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
