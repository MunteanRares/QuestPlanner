import { Box, Card, Text } from "@chakra-ui/react";
import useGetProfile from "../../hooks/useGetProfile";
import useGetItineraries, { itineraryDTO } from "../../hooks/useGetItineraries";
import Capitalize from "../../services/Capitalize";
import ItineraryCard from "./ItineraryCard";
import NavBar from "../NavBar/NavBar";
import useDeleteItinerary from "../../hooks/useDeleteItinerary";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: profile } = useGetProfile();
  const { data: itinerariesInit } = useGetItineraries();
  const [itineraries, setItineraries] = useState<itineraryDTO[]>([]);

  const { error, deleteItineraryFunc } = useDeleteItinerary();

  const deleteItinerary = (itineraryToDelete: itineraryDTO) => {
    setItineraries(itineraries.filter((i) => i.id !== itineraryToDelete.id));
    deleteItineraryFunc(itineraryToDelete.id);
  };

  useEffect(() => {
    if (itinerariesInit) {
      setItineraries(itinerariesInit);
    }
  }, [itinerariesInit]);

  return (
    <>
      <NavBar />
      <Box margin="4rem 6rem 4rem 6rem">
        <Text fontSize={"2xl"}>Welcome, {Capitalize(profile?.username)}</Text>
        <Text fontSize={"xl"} marginTop="30px">
          Your Itineraries
        </Text>

        <Box marginTop={"12px"}>
          {itineraries.map((itinerary, index) => (
            <ItineraryCard
              key={index}
              days={itinerary.days}
              title={itinerary.title}
              handleDeleteItinerary={() => deleteItinerary(itinerary)}
              dateRange={[
                itinerary.days[0].date,
                itinerary.days[itinerary.days.length - 1].date,
              ]}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
