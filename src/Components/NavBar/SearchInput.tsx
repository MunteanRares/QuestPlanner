import { Box, Input, List, Spinner } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useCities from "../../hooks/useCities";
import CityListItem from "./CityListItem";

const SearchInput = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useCities(searchTerm);
  console.log(data);

  return (
    <>
      <Box position="relative">
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          ref={searchRef}
          placeholder="Search Cities..."
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
              <CityListItem
                key={index + item.placeId}
                item={item}
                index={index}
                data={data}
              />
            ))}
        </List.Root>
      </Box>
    </>
  );
};

export default SearchInput;
