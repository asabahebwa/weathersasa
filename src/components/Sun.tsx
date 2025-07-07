import React from "react";
import "../styles/Sun.css";

function Sun({ forecastData, selectedDayIndex }) {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  return (
    <div className="sun">
      <span className="sunrise">
        Sunrise{" "}
        {forecastData.forecast.forecastday[selectedDayIndex].astro.sunrise}
      </span>{" "}
      {"|"}
      <span className="sunset">
        Sunset{" "}
        {forecastData.forecast.forecastday[selectedDayIndex].astro.sunset}
      </span>
    </div>
  );
}

export default Sun;
