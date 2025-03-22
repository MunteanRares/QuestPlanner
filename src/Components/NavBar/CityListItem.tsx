import { ListItem, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { City } from "../../hooks/useCities";

interface Props {
  item: City;
  index: number;
  data: City[];
}

const CityListItem = ({ item, index, data }: Props) => {
  const navigate = useNavigate();

  const handleCityClick = (city: string, placeId: string) => {
    navigate(`/${city}/${placeId}`);
  };

  return (
    <ListItem
      _hover={{ background: "bg.subtle", borderRadius: "4px" }}
      onClick={() =>
        handleCityClick(item.structuredFormatting.mainText, item.placeId)
      }
      padding="4px 8px"
      cursor="pointer"
      paddingBottom={index === data.length - 1 ? "0" : "10px"}
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
  );
};

export default CityListItem;
