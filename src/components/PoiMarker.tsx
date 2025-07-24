import {
  AdvancedMarker,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";
import CustomLocationInfoWindow from "./CustomLocationInfoWindow";
import { type Location } from "../services/forecast";

interface PoiMarkerProps {
  poi: Location;
  selectedLocationTemperature: number;
  getTempColor: (temp: number) => string;
}

const PoiMarker = ({
  poi,
  selectedLocationTemperature,
  getTempColor,
}: PoiMarkerProps) => {
  const [markerRef] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker key={poi.key} position={poi.location} ref={markerRef}>
        <Pin background={"white"} glyphColor={"#000"} borderColor={"#000"} />
      </AdvancedMarker>

      <CustomLocationInfoWindow
        poi={poi}
        selectedLocationTemperature={selectedLocationTemperature}
        getTempColor={getTempColor}
      />
    </>
  );
};

export default PoiMarker;
