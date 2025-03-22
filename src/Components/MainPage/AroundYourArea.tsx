import { Box } from "@chakra-ui/react";
import Carousel from "../Carousel";
import useGetNearbyPlaces from "../../hooks/useGetNearbyPlaces";
import { Position } from "../../services/GetLocation";
import SkeletonCitiesCard from "./SkeletonCitiesCard";

interface Props {
  position: Position | null;
}

const AroundYourArea = ({ position }: Props) => {
  const { data, isLoading } = useGetNearbyPlaces(
    position?.latitude,
    position?.longitude
  );

  const placesCardData = data.map((place) => ({
    imageSrc: place.imageUrl,
    title: place.placeName,
    cityRedirect: place.currentCityName,
    description: place.formattedAddress,
    placeId: place.placeId,
  }));

  return (
    <>
      <Box>
        {isLoading ? (
          <Box display="flex" gap="25px">
            {[...Array(3)].map((_, index) => (
              <SkeletonCitiesCard key={index} />
            ))}
          </Box>
        ) : (
          <Carousel isLoading={isLoading} data={placesCardData} />
        )}
      </Box>
    </>
  );
};

export default AroundYourArea;
