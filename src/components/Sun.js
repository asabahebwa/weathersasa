import React from "react";
import "../styles/Sun.css";

function Sun({ forecastData }) {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  return (
    <div className="sun">
      <span className="sunrise">
        Sunrise {forecastData.forecast.forecastday[0].astro.sunrise}
      </span>{" "}
      {"|"}
      <span className="sunset">
        Sunset {forecastData.forecast.forecastday[0].astro.sunset}
      </span>
    </div>
  );
}

export default Sun;
