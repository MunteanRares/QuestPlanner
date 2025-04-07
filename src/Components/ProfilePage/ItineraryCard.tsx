import {
  ActionBarRootProvider,
  Box,
  Card,
  Collapsible,
  Flex,
  Image,
  Mark,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { LuAlignCenter, LuChevronDown, LuMapPin } from "react-icons/lu";
import { act, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoMdClose } from "react-icons/io";
import { itineraryDTO } from "../../hooks/useGetItineraries";

interface Props {
  title: string;
  dateRange: Date[];
  days: {
    activities: {
      imageUrl: string;
      location: string;
    }[];
    date: Date;
  }[];
  handleDeleteItinerary: () => void;
}

const ItineraryCard = ({
  title,
  dateRange,
  days,
  handleDeleteItinerary,
}: Props) => {
  const startDate =
    new Date(dateRange[0]).toLocaleString("en-US", { month: "long" }) +
    " " +
    new Date(dateRange[0]).getDate() +
    ", " +
    new Date(dateRange[0]).getFullYear();

  const endDate =
    new Date(dateRange[dateRange.length - 1]).toLocaleString("en-US", {
      month: "long",
    }) +
    " " +
    new Date(dateRange[dateRange.length - 1]).getDate() +
    ", " +
    new Date(dateRange[dateRange.length - 1]).getFullYear();

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <Collapsible.Root marginBottom={"16px"}>
      <Box display={"flex"}>
        <Card.Root
          width={"100%"}
          ref={ref}
          _hover={{ background: "gray.900" }}
          transition={"all 0.3s"}
          position={"relative"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
        >
          <Collapsible.Trigger
            position={"absolute"}
            height={"100%"}
            width={"100%"}
            cursor={"pointer"}
          />
          <Box
            padding={"16px"}
            width={"47%"}
            display={"flex"}
            flexDirection={"row"}
          >
            <Text width={"fit-content"} fontSize={"28px"}>
              {title}
            </Text>

            <Box
              color={"gray.400"}
              marginLeft={"auto"}
              fontSize={"17px"}
              alignSelf={"center"}
            >
              <Text>
                {startDate} - {endDate}
              </Text>
            </Box>
          </Box>

          <FontAwesomeIcon
            style={{
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              fontSize: "28px",
              marginRight: "24px",
            }}
            icon={faMapLocationDot}
          />
        </Card.Root>
        <FontAwesomeIcon
          className="closeItineraryIcon"
          onClick={handleDeleteItinerary}
          icon={faClose}
        />
      </Box>

      <Collapsible.Content
        width="95.5%"
        className="collapsibleProfilePage"
        borderRadius={"4px"}
        shadow={"inner"}
        backgroundColor={"gray.900"}
      >
        {days.map((day, index) => (
          <Collapsible.Root key={index} padding={5}>
            <Collapsible.Trigger
              width="100%"
              cursor="pointer"
              justifyContent={"space-between"}
              display={"flex"}
            >
              <Text fontSize={"xl"}>{new Date(day.date).toDateString()}</Text>
              <LuChevronDown size={"22px"} style={{ alignSelf: "center" }} />
            </Collapsible.Trigger>

            <Collapsible.Content display={"flex"} gap={"16px"}>
              {day.activities.map((activity, index) => (
                <Card.Root
                  marginTop={"16px"}
                  key={index}
                  height={"fit-content"}
                  display="flex"
                  flexDirection="column"
                  overflow={"hidden"}
                  maxWidth="300px"
                  maxHeight="300px"
                >
                  <LazyLoadImage
                    referrerPolicy="no-referrer"
                    style={{
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    src={activity.imageUrl}
                  />

                  <Card.Body>
                    <Box
                      marginTop="6px"
                      gap={"12px"}
                      display="flex"
                      alignItems={"center"}
                    >
                      <LuMapPin color="gray" size="40px" />
                      <Text fontSize="16px">{activity.location}</Text>
                    </Box>
                  </Card.Body>
                </Card.Root>
              ))}
            </Collapsible.Content>
          </Collapsible.Root>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default ItineraryCard;
