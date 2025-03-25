import {
  Box,
  Input,
  List,
  Separator,
  Spinner,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useNearbyPlacesSearch from "../../hooks/useNearbyPlacesSearch";
import { LuAlignCenter, LuMapPin } from "react-icons/lu";

interface Props {
  lat: string;
  lng: string;
}

const SearchInputPlacesNearby = ({ lat, lng }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useNearbyPlacesSearch(searchTerm, lat, lng);
  // console.log(data);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
              <Box key={index}>
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
                      {item.placeTags.map((tag) => (
                        <Tag.Root marginX="3px" colorPalette={"blue"}>
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
      </Box>
    </>
  );
};

export default SearchInputPlacesNearby;
