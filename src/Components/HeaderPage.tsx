import { Box, Image, Skeleton, Spinner, Text } from "@chakra-ui/react";
import defImage from "../assets/home-page.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  title?: string;
  image?: string;
  isLoading?: boolean;
  width: string;
}

const HeaderPage = ({ title, image, width, isLoading }: Props) => {
  return (
    <>
      <Box
        width={width}
        display="flex"
        position="relative"
        justifySelf={"center"}
        justifyContent="left"
        marginY="30px"
        marginX="60px"
        className="headerContainer"
      >
        {isLoading ? (
          <Spinner
            boxSize="70px"
            bottom="40%"
            borderWidth="4px"
            left="45%"
            position={"absolute"}
            justifySelf={"center"}
          />
        ) : (
          <LazyLoadImage
            width="100%"
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "0.6s" },
            }}
            src={image ? image : defImage}
            referrerPolicy="no-referrer"
          ></LazyLoadImage>
        )}
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
