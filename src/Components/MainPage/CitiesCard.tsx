import { Card, Image, Spinner, Text } from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

export interface PlacesCardObj {
  imageSrc: string;
  title: string;
  cityRedirect: string;
  description: string;
  placeId: string;
}

interface Props {
  place: PlacesCardObj;
}

const CitiesCard = ({ place }: Props) => {
  const { imageSrc, title, description } = place;
  const navigate = useNavigate();

  const handleCityClick = (city: string, placeId: string) => {
    navigate(`/${city}/${placeId}`);
  };

  return (
    <Card.Root
      minHeight={"17rem"}
      maxHeight={"20rem"}
      transition="all 1s ease-out"
      display="flex"
      overflow="hidden"
      borderRadius={6}
    >
      <LazyLoadImage
        onClick={() => handleCityClick(place.cityRedirect, place.placeId)}
        effect="blur"
        referrerPolicy="no-referrer"
        className="cities-card-image"
        src={imageSrc}
      />
      <Card.Body>
        <Card.Title>
          <Text>{title}</Text>
        </Card.Title>
        <Card.Description>
          <Text>{description}</Text>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default CitiesCard;
