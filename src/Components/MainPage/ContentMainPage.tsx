import { Box, Text } from "@chakra-ui/react";
import { Position } from "../../services/GetLocation";
import FeaturedPlaces from "./FeaturedPlaces";
import MostPopularPlaces from "./MostPopularPlaces";

interface Props {
  position: Position | null;
}

const ContentMainPage = ({ position }: Props) => {
  return (
    <>
      <Box>
        <Text marginLeft={4} marginBottom={2} fontSize={"2xl"}>
          Featured
        </Text>
        <FeaturedPlaces />

        <Text marginTop={10} marginLeft={4} marginBottom={2} fontSize={"2xl"}>
          Most Popular
        </Text>
        <MostPopularPlaces />
      </Box>
    </>
  );
};

export default ContentMainPage;
