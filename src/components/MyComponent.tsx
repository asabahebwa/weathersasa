import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

interface MyComponentProps {
  location: {
    lat: number;
    lng: number;
  };
}

const MyComponent = ({ location }: MyComponentProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (map) {
      map.panTo({ lat: location.lat, lng: location.lng });
      map.setZoom(6);
    }
  }, [map, location.lat, location.lng]);

  return null;
};

export default MyComponent;
