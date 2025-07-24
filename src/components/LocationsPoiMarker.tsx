import {
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import CustomLocationsInfoWindow from "./CustomLocationsInfoWindow";

interface LocationsPoiMarkerProps {
  poi: any;
  getTempColor: (temp: number) => string;
  selectedDayIndex: number;
  visible: boolean;
}

const LocationsPoiMarker = ({
  poi,
  getTempColor,
  selectedDayIndex,
  visible,
}: LocationsPoiMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const isVisible = visible;

  return (
    isVisible && (
      <>
        <AdvancedMarker
          position={{
            lat: poi.query.location.lat,
            lng: poi.query.location.lon,
          }}
          ref={markerRef}
        >
          <div
            style={{
              width: 10,
              height: 10,
              position: "absolute",
              top: 0,
              left: 0,
              background: "#ffffff",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </AdvancedMarker>
        {marker && (
          <CustomLocationsInfoWindow
            poi={poi}
            getTempColor={getTempColor}
            selectedDayIndex={selectedDayIndex}
          />
        )}
      </>
    )
  );
};

export default LocationsPoiMarker;
