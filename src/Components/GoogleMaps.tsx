import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { Position } from "../services/GetLocation";
import { Box, Spinner } from "@chakra-ui/react";

interface Props {
  position: Position | null;
  isLoading: boolean;
}

const GoogleMaps = ({ position, isLoading }: Props) => {
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
          mapId="17efa118721c6d3a"
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
        <AdvancedMarker
          position={
            position && { lat: position.latitude, lng: position.longitude }
          }
        />
      </APIProvider>
    </>
  );
};

export default GoogleMaps;
