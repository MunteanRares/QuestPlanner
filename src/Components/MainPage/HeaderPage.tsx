import { Box, Image, Text } from "@chakra-ui/react";
import headerImage from "../../assets/home-page.webp";

const HeaderPage = () => {
  return (
    <>
      <Box className="headerContainer">
        <Image
          width="100%"
          backgroundRepeat="repeat"
          filter="auto"
          blur="1.5px"
          src={headerImage}
        />
        <Box className="overlay"></Box>

        <Box className="headerText">
          <Text color="white" fontSize="3xl" fontWeight="bold">
            Start Your Journey
          </Text>
          <Text color="white">
            Discover amazing destinations and experiences worldwide. Whether
            you're exploring city streets, relaxing on a beach, or seeking
            adventure, our platform helps you plan the perfect itinerary with
            ease!
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default HeaderPage;
