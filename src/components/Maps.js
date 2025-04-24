import React, { useEffect, useState } from "react";
import "../styles/Maps.css";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";

// const locations = [
//   { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
//   { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
//   { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
//   { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
//   { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
//   { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
//   { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
//   { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
//   { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
//   { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
//   { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
//   { key: "kingStreetWharf", location: { lat: -33.8665445, lng: 151.1989808 } },
//   { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
//   { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
//   { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
// ];

const Maps = ({ forecastData, selectedDayIndex }) => {
  let selectedLocation = {
    key: forecastData.location.name,
    location: {
      lat: forecastData.location.lat,
      lng: forecastData.location.lon,
    },
  };

  let selectedLocationTemperature =
    forecastData.forecast.forecastday[selectedDayIndex].day.avgtemp_c;

  // console.log(forecastData);
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
          mapTypeId={"satellite"}
          defaultZoom={5}
          defaultCenter={{
            lat: selectedLocation.location.lat,
            lng: selectedLocation.location.lng,
          }}
        >
          <PoiMarker
            poi={selectedLocation}
            selectedLocationTemperature={selectedLocationTemperature}
          />
        </Map>
      </APIProvider>
    </div>
  );
};

const PoiMarker = ({ poi, selectedLocationTemperature }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  return (
    <>
      <AdvancedMarker key={poi.key} position={poi.location} ref={markerRef}>
        <Pin background={"white"} glyphColor={"#000"} borderColor={"#000"} />
      </AdvancedMarker>

      <InfoWindow className="info-window" anchor={marker} pixelOffset={[0, 0]}>
        <div className="info-window-location">{poi.key}</div>
        <div className="info-window-temp">
          {Math.trunc(selectedLocationTemperature)}
        </div>
      </InfoWindow>
    </>
  );
};

// const PoiMarkers = (props) => {
//   console.log(props.pois);
//   return (
//     <>
//       {props.pois.map((poi) => (
//         <AdvancedMarker key={poi.key} position={poi.location}>
//           <Pin
//             background={"#FBBC04"}
//             glyphColor={"#000"}
//             borderColor={"#000"}
//           />
//         </AdvancedMarker>
//       ))}
//     </>
//   );
// };

export default Maps;
