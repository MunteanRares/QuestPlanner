import { useEffect, useState } from "react";

export interface Position {
  latitude: number;
  longitude: number;
}

const getLocation = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
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

  return { position, isLoading };
};

export default getLocation;
