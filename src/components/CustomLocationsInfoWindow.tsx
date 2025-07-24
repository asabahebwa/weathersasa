import {
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

interface CustomLocationsInfoWindowProps {
  poi: any;
  getTempColor: (temp: number) => string;
  selectedDayIndex: number;
}
const CustomLocationsInfoWindow = ({
  poi,
  getTempColor,
  selectedDayIndex,
}: CustomLocationsInfoWindowProps) => {
  const [markerRef] = useAdvancedMarkerRef();
  return (
    <>
      <AdvancedMarker
        position={{ lat: poi.query.location.lat, lng: poi.query.location.lon }}
        ref={markerRef}
      >
        <div
          className="info-window"
          style={{
            position: "absolute",
            left: 15,
            top: -16,
            background: "white",
          }}
        >
          <div className="info-window-location">{poi.query.custom_id}</div>
          <div className="info-window-temp">
            <div className="info-window-temp-value">
              {Math.trunc(
                poi.query.forecast.forecastday[selectedDayIndex].day.maxtemp_c
              )}
            </div>
            <div
              data-testid="temp-color-box"
              className="info-window-temp-color"
              style={{
                backgroundColor: getTempColor(
                  Math.trunc(
                    poi.query.forecast.forecastday[selectedDayIndex].day
                      .maxtemp_c
                  )
                ),
              }}
            />
          </div>
        </div>
      </AdvancedMarker>
    </>
  );
};

export default CustomLocationsInfoWindow;
