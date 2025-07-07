import React from "react";
import "../styles/Location.css";

function Location({ selectedCity }) {
  let city = selectedCity.split(",")[0];
  return (
    <div className="location-section">
      <h1 className="selected-city">{city || "London"}</h1>
    </div>
  );
}

export default Location;
