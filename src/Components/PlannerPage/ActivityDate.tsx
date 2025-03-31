import { Box, Collapsible, Separator, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import SearchInputPlacesNearby from "./SearchInputPlacesNearby";

interface Props {
  date: Date;
  lat: string;
  lng: string;
}

const ActivityDate = ({ date, lat, lng }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const formattedDate = `${date.toLocaleString("en-US", {
    weekday: "long",
  })}, ${date.toLocaleString("en-US", { month: "long" })} ${date.getDate()}`;

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
          <SearchInputPlacesNearby lat={lat} lng={lng} />
        </Collapsible.Content>
      </Collapsible.Root>
      <Separator />
    </>
  );
};

export default ActivityDate;
