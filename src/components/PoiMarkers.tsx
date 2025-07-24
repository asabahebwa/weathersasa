import LocationsPoiMarker from "./LocationsPoiMarker";

interface PoiMarkersProps {
  locations: Array<any>;
  getTempColor: (temp: number) => string;
  selectedDayIndex: number;
}

const PoiMarkers = ({
  locations,
  getTempColor,
  selectedDayIndex,
}: PoiMarkersProps) => {
  return (
    <>
      {locations.map((poi: any, index: number) => {
        // Create a new marker reference for each location
        return (
          <LocationsPoiMarker
            key={index}
            poi={poi}
            getTempColor={getTempColor}
            selectedDayIndex={selectedDayIndex}
            visible={poi.query.visible}
          />
        );
      })}
    </>
  );
};

export default PoiMarkers;
