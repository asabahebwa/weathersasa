import React from "react";
import "../styles/Location.css";

function Location({selectedCity}) {
  return (
    <div className="location-section">
      <div className="selected-city">
        {selectedCity || "London, Greater London, England, United Kingdom"}
      </div>
    </div>
  );
}

export default Location;
