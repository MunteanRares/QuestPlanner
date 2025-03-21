import { Box } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CitiesCard, { PlacesCardObj } from "./MainPage/CitiesCard";
import { useColorMode } from "./ui/color-mode";

interface Props {
  data: PlacesCardObj[];
}

const Carousel = ({ data }: Props) => {
  const { colorMode } = useColorMode();

  const settings = {
    dots: colorMode === "dark" ? false : true,
    infinite: true,
    arrows: colorMode === "light" ? false : true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box maxWidth="45vw">
      <Slider {...settings}>
        {data.map((item, index) => (
          <CitiesCard key={index} place={item} />
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
