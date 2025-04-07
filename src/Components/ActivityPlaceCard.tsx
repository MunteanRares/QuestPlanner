import { Card, Box } from "@chakra-ui/react";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  item: DetailedCityModel;
}

const ActivityPlaceCard = () => {
  return (
    <Card.Root
      height={"fit-content"}
      display="flex"
      flexDirection="column"
      overflow={"hidden"}
      maxWidth="300px"
      maxHeight="300px"
      key={index}
    >
      <LazyLoadImage
        referrerPolicy="no-referrer"
        style={{
          maxHeight: "150px",
          objectFit: "cover",
        }}
        src={item.photoLinks}
      />
      <IoMdClose
        color="var(--chakra-colors-fg)"
        size={"24px"}
        onClick={() => handleOnDeletePlace(index)}
        style={{
          cursor: "pointer",
          backgroundColor: "var(--chakra-colors-bg-panel)",
          position: "absolute",
          top: "0",
          right: "0",
        }}
      />

      <Card.Body>
        <Text fontSize="16px">{item.displayName.text}</Text>

        <Box marginTop="6px" gap={"12px"} display="flex" alignItems={"center"}>
          <LuMapPin color="gray" size="32px" />
          <Text color={"gray"} fontSize="13px">
            {item.formattedAddress}
          </Text>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};

export default ActivityPlaceCard;
