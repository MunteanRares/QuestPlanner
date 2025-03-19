import { Card, Image, Text } from "@chakra-ui/react";

export interface PlacesCardObj {
  imageSrc: string;
  title: string;
  description: string;
}

interface Props {
  place: PlacesCardObj;
}

const PlacesCard = ({ place }: Props) => {
  const { imageSrc, title, description } = place;

  return (
    <Card.Root
      transition="all 1s ease-out"
      display="flex"
      overflow="hidden"
      borderRadius={8}
    >
      <Image maxHeight="10rem" src={imageSrc} />
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

export default PlacesCard;
