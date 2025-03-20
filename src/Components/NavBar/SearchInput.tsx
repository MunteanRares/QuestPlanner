import {
  Box,
  HStack,
  Input,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useCities from "../../hooks/useCities";
import { FaCity } from "react-icons/fa";

const SearchInput = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useCities(searchTerm, [searchTerm]);
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
              <ListItem
                marginBottom={index === data.length - 1 ? "0" : "10px"}
                borderBottomWidth={index === data.length - 1 ? "0" : "1px"}
                key={item.description}
              >
                <Text fontSize="medium" fontWeight="medium">
                  {item.structuredFormatting.mainText}
                </Text>
                <Text fontSize="12px" color="fg.subtle">
                  {item.description}
                </Text>
              </ListItem>
            ))}
        </List.Root>
      </Box>
    </>
  );
};

export default SearchInput;
