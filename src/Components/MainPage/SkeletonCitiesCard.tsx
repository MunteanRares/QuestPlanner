import { Card, Skeleton, SkeletonText, Text } from "@chakra-ui/react";

const SkeletonCitiesCard = () => {
  return (
    <Card.Root
      height="16rem"
      width="16.8rem"
      transition="all 1s ease-out"
      display="flex"
      overflow="hidden"
      borderRadius={6}
    >
      <Skeleton height="10rem" />
      <Card.Body>
        <Card.Title>
          <Text>{<SkeletonText />}</Text>
        </Card.Title>
      </Card.Body>
    </Card.Root>
  );
};

export default SkeletonCitiesCard;
