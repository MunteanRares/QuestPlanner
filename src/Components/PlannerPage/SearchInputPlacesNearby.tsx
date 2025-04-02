import {
  Box,
  Card,
  Center,
  Flex,
  Input,
  List,
  Separator,
  Spinner,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useNearbyPlacesSearch, {
  SearchResultsNearby,
} from "../../hooks/useNearbyPlacesSearch";
import { LuMapPin } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import useCityDetails from "../../hooks/useCityDetails";
import { DetailedCityModel } from "../../hooks/useCityDetails";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Detail } from "react-calendar/dist/esm/shared/types.js";

interface Props {
  lat: string;
  lng: string;
  onPlacesChange: (places: DetailedCityModel[]) => void;
}

const SearchInputPlacesNearby = ({ lat, lng, onPlacesChange }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useNearbyPlacesSearch(searchTerm, lat, lng);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>("");
  const { data: placeDetails, isLoading: isDetailsLoading } =
    useCityDetails(selectedPlaceId);

  const handleOnPlaceClick = (item: SearchResultsNearby) => {
    console.log(item.placeId);
    setSelectedPlaceId(item.placeId);
    setSearchTerm("");
  };

  const [addedPlaces, setAddedPlaces] = useState<DetailedCityModel[]>([]);

  useEffect(() => {
    onPlacesChange(addedPlaces);
  }, [addedPlaces]);

  const handleOnDeletePlace = (index: number) => {
    setAddedPlaces((prevAdded) => prevAdded.filter((_, i) => i !== index));
    setSelectedPlaceId("");
  };

  useEffect(() => {
    if (placeDetails) {
      setAddedPlaces((prevPlaces) => {
        return [...prevPlaces, ...placeDetails];
      });
    }

    console.log(placeDetails[0] && placeDetails[0].photoLinks);
  }, [placeDetails]);

  return (
    <>
      <Box position="relative">
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          ref={searchRef}
          placeholder="Search Places..."
          variant="outline"
          type="search"
        ></Input>

        {isLoading && searchTerm.length >= 3 && (
          <Spinner bottom="-60%" left="43%" position="absolute" />
        )}
        <Box
          borderRadius="8px"
          borderBottom="1px solid gray"
          borderLeft="1px solid gray"
          borderRight="1px solid gray"
        >
          {data &&
            searchTerm.length > 2 &&
            data.map((item, index) => (
              <Box onClick={() => handleOnPlaceClick(item)} key={index}>
                <List.Root paddingTop={3} paddingX={3}>
                  <List.Item
                    marginTop={index === 0 ? "0px" : "10px"}
                    gap="10px"
                    cursor="pointer"
                    alignItems="left "
                    display="flex"
                    flexDirection={"column"}
                  >
                    <Box gap="15px" display="flex">
                      <LuMapPin size="25px" style={{ color: "#2563ab" }} />
                      <Text>{item.placeName}</Text>
                    </Box>

                    <Box marginLeft="35px" alignSelf={"left"} display="flex">
                      {item.placeTags.map((tag, index) => (
                        <Tag.Root
                          key={index}
                          marginX="3px"
                          colorPalette={"blue"}
                        >
                          <Tag.Label>{tag}</Tag.Label>
                        </Tag.Root>
                      ))}
                    </Box>
                    <Separator />
                  </List.Item>
                </List.Root>
              </Box>
            ))}
        </Box>

        {isDetailsLoading ? (
          <>
            <Spinner />
            <p>Loading details...</p>
          </>
        ) : (
          <Box
            marginTop="12px"
            flexWrap={"wrap"}
            gap="16px"
            flexDirection="row"
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
          >
            {addedPlaces.map((item, index) => (
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

                  <Box
                    marginTop="6px"
                    gap={"12px"}
                    display="flex"
                    alignItems={"center"}
                  >
                    <LuMapPin color="gray" size="32px" />
                    <Text color={"gray"} fontSize="13px">
                      {item.formattedAddress}
                    </Text>
                  </Box>
                </Card.Body>
              </Card.Root>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default SearchInputPlacesNearby;
