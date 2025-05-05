import React, { useEffect } from "react";
import "../styles/Maps.css";

import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";

const MyComponent = ({ location }) => {
  // const apiIsLoaded = useApiIsLoaded();
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (map) {
      // Use the map instance (e.g., map.panTo(), map.setZoom())
      map.panTo({ lat: location.lat, lng: location.lng });
      map.setZoom(6);
    }
  }, [map, location.lat, location.lng]);

  return null;
};

const CustomLocationInfoWindow = ({
  poi,
  getTempColor,
  selectedLocationTemperature,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker key={poi.key} position={poi.location} ref={markerRef}>
        <div
          className="info-window"
          style={{
            position: "absolute",
            left: 20 /* Position to the right */,
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

const CustomLocationsInfoWindow = ({ poi, getTempColor, selectedDayIndex }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

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
            left: 15 /* Position to the right */,
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

const Maps = ({
  forecastData,
  selectedDayIndex,
  getTempColor,
  locations,
  bulkForecast,
}) => {
  const [zoom, setZoom] = React.useState(6);
  let selectedLocationTemperature = Math.trunc(
    forecastData.forecast.forecastday[selectedDayIndex].day.maxtemp_c
  );

  let selectedLocation = {
    key: forecastData.location.name,
    location: {
      lat: forecastData.location.lat,
      lng: forecastData.location.lon,
    },
  };

  // Filter out the selected location from the locations array
  let filteredLocations = bulkForecast.bulk?.filter(
    (poi) =>
      poi.query.location.lat !== selectedLocation.location.lat &&
      poi.query.location.lon !== selectedLocation.location.lng
  );

  const getZoomThreshold = (customId) => {
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

  let filteredLocationsWithThreshold = filteredLocations?.map((poi) => {
    const customId = poi.query.custom_id;

    return {
      ...poi,
      query: {
        ...poi.query,
        visible: zoom >= getZoomThreshold(customId),
      },
    };
  });

  const handleZoomChange = (zoom) => {
    setZoom(zoom.detail.zoom);
  };

  return (
    <div className="maps-container">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
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
          defaultZoom={6} // Set default zoom directly here
          defaultCenter={{
            lat: selectedLocation.location.lat,
            lng: selectedLocation.location.lng,
          }}
          options={{
            minZoom: 2, // Set minimum zoom level (prevents zooming out beyond this)
            maxZoom: 20, // Optional: Set maximum zoom level (prevents zooming in beyond this)
            zoomControl: true, // Ensure zoom controls are enabled
            scrollwheel: true, // Allow zoom with mouse wheel
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
              selectedLocation={selectedLocation}
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

const PoiMarker = ({ poi, selectedLocationTemperature, getTempColor }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

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

// Create a separate component for each marker
const LocationsPoiMarker = ({
  poi,
  getTempColor,
  selectedDayIndex,
  visible,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  let isVisible = visible;

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

const PoiMarkers = ({ locations, getTempColor, selectedDayIndex }) => {
  return (
    <>
      {locations.map((poi, index) => {
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

export default Maps;
