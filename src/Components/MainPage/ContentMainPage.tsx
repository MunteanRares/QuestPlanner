import { Box, Text } from "@chakra-ui/react";
import { Position } from "../../services/GetLocation";
import FeaturedPlaces from "./AroundYourArea";
import MostPopularPlaces from "./MostPopularPlaces";

interface Props {
  position: Position | null;
}

const ContentMainPage = ({ position }: Props) => {
  return (
    <>
      <Box>
        {position && (
          <>
            <Text marginLeft={4} marginBottom={2} fontSize="2xl">
              Around Your Area
            </Text>
            <FeaturedPlaces position={position} />
          </>
        )}

        <Text marginTop={10} marginLeft={4} marginBottom={2} fontSize={"2xl"}>
          Most Popular
        </Text>
        <MostPopularPlaces />
      </Box>
    </>
  );
};

export default ContentMainPage;
