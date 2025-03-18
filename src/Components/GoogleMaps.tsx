import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import getLocation from "../services/GetLocation";
import { Box, Spinner } from "@chakra-ui/react";

const GoogleMaps = () => {
  const { position, isLoading } = getLocation();

  if (isLoading)
    return (
      <Box position="relative" height="100%">
        <Spinner
          position="absolute"
          top="50%"
          right="50%"
          size="xl"
          borderWidth="4px"
        />
      </Box>
    );

  return (
    <>
      <APIProvider apiKey="AIzaSyBQvQLke_0JE3jt9Ov3ZWOSUe04c3ESEAo">
        <Map
          style={{ height: "100%" }}
          defaultCenter={
            position
              ? { lat: position.latitude, lng: position.longitude }
              : { lat: -33.860664, lng: 151.208138 }
          }
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
        <Marker
          position={
            position && { lat: position.latitude, lng: position.longitude }
          }
        />
      </APIProvider>
    </>
  );
};

export default GoogleMaps;
