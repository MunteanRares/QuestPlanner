import { APIProvider, latLngEquals, Map } from "@vis.gl/react-google-maps";

const GoogleMaps = () => {
  return (
    <APIProvider apiKey="AIzaSyBQvQLke_0JE3jt9Ov3ZWOSUe04c3ESEAo">
      <Map
        style={{ height: "100%" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
};

export default GoogleMaps;
