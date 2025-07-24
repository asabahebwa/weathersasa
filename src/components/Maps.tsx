import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { type ForecastState } from "../store/forecast/index";
import { type BulkForecastState } from "../store/bulkForecast/index";
import MyComponent from "./MyComponent";
import PoiMarker from "./PoiMarker";
import PoiMarkers from "./PoiMarkers";
import "../styles/Maps.css";

interface MapsProps {
  forecastData: ForecastState;
  selectedDayIndex: number;
  getTempColor: (temp: number) => string;
  bulkForecast: BulkForecastState;
}

const Maps = ({
  forecastData,
  selectedDayIndex,
  getTempColor,
  bulkForecast,
}: MapsProps) => {
  const [zoom, setZoom] = React.useState(6);
  const selectedLocationTemperature = Math.trunc(
    forecastData.forecast.forecastday[selectedDayIndex].day.maxtemp_c
  );

  const selectedLocation = {
    key: forecastData.location.name,
    location: {
      lat: forecastData.location.lat,
      lng: forecastData.location.lon,
    },
  };

  const filteredLocations = bulkForecast.bulk?.filter(
    (poi: any) =>
      poi.query.location.lat !== selectedLocation.location.lat &&
      poi.query.location.lon !== selectedLocation.location.lng
  );

  const getZoomThreshold = (customId: string) => {
    let zoomThreshold;
    switch (customId) {
      case "Berlin":
      case "Kyiv":
      case "Madrid":
      case "Seoul":
        zoomThreshold = 4; // visible at zoom level 4+
        break;
      default:
        zoomThreshold = 3; // All other cities only visible at closer zoom levels (7+)
    }
    return zoomThreshold;
  };

  const filteredLocationsWithThreshold = filteredLocations?.map((poi: any) => {
    const customId = poi.query.custom_id;

    return {
      ...poi,
      query: {
        ...poi.query,
        visible: zoom >= getZoomThreshold(customId),
      },
    };
  });

  const handleZoomChange = (zoom: { detail: { zoom: number } }) => {
    setZoom(zoom.detail.zoom);
  };

  return (
    <div className="maps-container">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "auto", height: "450px" }}
          mapId="DEMO_MAP_ID"
          disableDefaultUI={false}
          mapTypeControl={false}
          streetViewControl={false}
          rotateControl={false}
          keyboardShortcuts={false}
          cameraControl={false}
          onZoomChanged={handleZoomChange}
          mapTypeId={"satellite"}
          defaultZoom={6}
          defaultCenter={{
            lat: selectedLocation.location.lat,
            lng: selectedLocation.location.lng,
          }}
          // @ts-ignore-next-line
          defaultOptions={{
            zoomControl: false,
            scrollwheel: false,
          }}
          options={{
            minZoom: 2,
            maxZoom: 20,
          }}
        >
          <MyComponent location={selectedLocation.location} />

          <PoiMarker
            poi={selectedLocation}
            selectedLocationTemperature={selectedLocationTemperature}
            getTempColor={getTempColor}
          />

          {bulkForecast.bulk && (
            <PoiMarkers
              locations={filteredLocationsWithThreshold}
              getTempColor={getTempColor}
              selectedDayIndex={selectedDayIndex}
            />
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default Maps;
