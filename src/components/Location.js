import React from "react";
import "../styles/Location.css";

function Location({ selectedCity }) {
  let city = selectedCity.split(",")[0];
  return (
    <div className="location-section">
      <div className="selected-city">{city || "London"}</div>
    </div>
  );
}

export default Location;
