import { useEffect, useState } from "react";

export interface Position {
  latitude: number;
  longitude: number;
}

const getLocation = () => {
  const [positionCoords, setPosition] = useState<Position | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (positionCoords) => {
          setPosition({
            latitude: positionCoords.coords.latitude,
            longitude: positionCoords.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          setLoading(false);
          alert("Could not get your location.");
        }
      );
    }
  }, []);

  return { positionCoords, isLoading };
};

export default getLocation;
