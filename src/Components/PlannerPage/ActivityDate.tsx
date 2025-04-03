import { Collapsible, Separator, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import SearchInputPlacesNearby from "./SearchInputPlacesNearby";
import { DetailedCityModel } from "../../hooks/useCityDetails";

interface Props {
  date: Date;
  lat: string;
  lng: string;
  onSelectedPlaces: (date: Date, places: DetailedCityModel[]) => void;
}

const ActivityDate = ({ date, lat, lng, onSelectedPlaces }: Props) => {
  const [selectedPlaces, setSelectedPlaces] = useState<DetailedCityModel[]>([]);

  const formattedDate = `${date.toLocaleString("en-US", {
    weekday: "long",
  })}, ${date.toLocaleString("en-US", { month: "long" })} ${date.getDate()}`;

  useEffect(() => {
    console.log(selectedPlaces);
    onSelectedPlaces(date, selectedPlaces);
  }, [selectedPlaces]);

  return (
    <>
      <Collapsible.Root padding={5}>
        <Collapsible.Trigger
          width="100%"
          cursor="pointer"
          justifyContent={"space-between"}
          display={"flex"}
        >
          <Text fontSize={"xl"}>{formattedDate}</Text>
          <LuChevronDown size={"22px"} style={{ alignSelf: "center" }} />
        </Collapsible.Trigger>

        <Collapsible.Content border={"none"} marginTop="0.5rem">
          <SearchInputPlacesNearby
            lat={lat}
            lng={lng}
            onPlacesChange={(places: DetailedCityModel[]) =>
              setSelectedPlaces(places)
            }
          />
        </Collapsible.Content>
      </Collapsible.Root>
      <Separator />
    </>
  );
};

export default ActivityDate;
