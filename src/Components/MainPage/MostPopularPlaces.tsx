import { Box, Skeleton } from "@chakra-ui/react";
import Carousel from "../Carousel";
import useGetMostVisitedCities from "../../hooks/useGetMostVisitedCities";
import SkeletonCitiesCard from "./SkeletonCitiesCard";

const MostPopularPlaces = () => {
  const { data, isLoading } = useGetMostVisitedCities();

  const placesCardData = data.map((place) => ({
    imageSrc: place.imageUrl,
    title: place.cityName,
    description: place.cityName + place.country,
    placeId: place.placeId,
  }));

  console.log(data);

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

export default MostPopularPlaces;
