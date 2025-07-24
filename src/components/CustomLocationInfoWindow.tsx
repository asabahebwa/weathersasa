import {
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { type Location } from "../services/forecast";

interface CustomLocationInfoWindowProps {
  poi: Location;
  getTempColor: (temp: number) => string;
  selectedLocationTemperature: number;
}

const CustomLocationInfoWindow = ({
  poi,
  getTempColor,
  selectedLocationTemperature,
}: CustomLocationInfoWindowProps) => {
  const [markerRef] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker key={poi.key} position={poi.location} ref={markerRef}>
        <div
          className="info-window"
          style={{
            position: "absolute",
            left: 20,
            top: -33,
            background: "white",
          }}
        >
          <div className="info-window-location">{poi.key}</div>
          <div className="info-window-temp">
            <div className="info-window-temp-value">
              {selectedLocationTemperature}
            </div>
            <div
              data-testid="temp-color-box"
              className="info-window-temp-color"
              style={{
                backgroundColor: getTempColor(selectedLocationTemperature),
              }}
            />
          </div>
        </div>
      </AdvancedMarker>
    </>
  );
};

export default CustomLocationInfoWindow;
