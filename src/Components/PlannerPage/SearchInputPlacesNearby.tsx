import { Box, Input, List, Spinner, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useNearbyPlacesSearch from "../../hooks/useNearbyPlacesSearch";

interface Props {
  lat: string;
  lng: string;
}

const SearchInputPlaces = ({ lat, lng }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useNearbyPlacesSearch(searchTerm, lat, lng);
  console.log(data);

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
        <List.Root
          listStyle="none"
          display={data.length > 0 ? "block" : "none"}
          zIndex={999}
          width={searchRef.current?.clientWidth}
          className="dropdown-search-result"
          as="ul"
          backgroundColor="bg.emphasized"
          background="dark"
        >
          {data &&
            data.map((item, index) => (
              <Box key={index}>
                <Text>{item.placeName}</Text>
                {item.placeTags.map((tag: string, tagIndex: number) => (
                  <Text key={tagIndex}>{tag}</Text>
                ))}
              </Box>
            ))}
        </List.Root>
      </Box>
    </>
  );
};

export default SearchInputPlaces;
