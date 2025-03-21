import { Box, Image, Text } from "@chakra-ui/react";
import defImage from "../assets/home-page.webp";

interface Props {
  title?: string;
  image: string;
}

const HeaderPage = ({ title, image }: Props) => {
  return (
    <>
      <Box
        width="50%"
        display="flex"
        justifySelf={"center"}
        justifyContent="left"
        marginY="30px"
        marginX="60px"
        className="headerContainer"
      >
        <Image
          width="100%"
          filter="auto"
          // blur="2px"
          src={title ? image : defImage}
          referrerPolicy="no-referrer"
        ></Image>
        <Box className="overlay">
          <Box
            alignItems="center"
            flexDirection="column"
            className="headerText"
          >
            {title ? (
              <Text fontSize="42px" fontWeight="semibold" color="white">
                {title}
              </Text>
            ) : (
              <Text fontWeight="bold" fontSize="3xl" color="white">
                Start Your Journey
              </Text>
            )}
            {title ? (
              <Text fontSize="18px" color="white">
                Embark on your journey in {title}, and discover what it has to
                offer!
              </Text>
            ) : (
              <Text color="white">
                Discover amazing destinations and experiences worldwide. Whether
                you're exploring city streets, relaxing on a beach, or seeking
                adventure, our platform helps you plan the perfect itinerary
                with ease!
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeaderPage;
