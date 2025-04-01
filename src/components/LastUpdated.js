import React from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import "../styles/LastUpdated.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LastUpdated({ forecastData }) {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }
  const lastUpdated = forecastData.current.last_updated;

  return (
    <div>
      <div className="lastUpdated">
        <FontAwesomeIcon icon={faClock} />
        <span className="lastUpdated-text">Last updated</span>
        <span className="lastUpdated-time">
          {lastUpdated.split(" ")[0]} at {lastUpdated.split(" ")[1]}
        </span>
      </div>
      <div className="lastUpdated-sun">
        <span className="lastUpdated-sunrise">
          Sunrise {forecastData.forecast.forecastday[0].astro.sunrise}
        </span>{" "}
        {"|"}
        <span className="lastUpdated-sunset">
          Sunset {forecastData.forecast.forecastday[0].astro.sunset}
        </span>
      </div>
    </div>
  );
}

export default LastUpdated;
