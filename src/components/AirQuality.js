import React from "react";
import "../styles/AirQuality.css";

function AirQuality({ forecastData, selectedDayIndex }) {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  let uvIndex = forecastData.forecast.forecastday[selectedDayIndex].day.uv;

  function getUVLevelAndColor(index) {
    let result = {
      level: "",
      color: "",
    };
    switch (true) {
      case index >= 0 && index <= 2:
        result.level = "L";
        result.color = "#afd251";
        break;
      case index > 2 && index <= 5:
        result.level = "M";
        result.color = "yellow";
        break;
      case index > 5 && index <= 7:
        result.level = "H";
        result.color = "orange";
        break;
      case index > 7 && index <= 10:
        result.level = "VH";
        result.color = "red";
        break;
      case index > 10:
        result.level = "E";
        result.color = "purple";
        break;
      default:
        return {
          level: "N/A",
          color: "gray",
        };
    }
    return result;
  }

  let uv = getUVLevelAndColor(uvIndex);

  // console.log( {getUVLevel(forecastData.forecast.forecastday[selectedDayIndex].day.uv)});

  return (
    <div className="air-quality-container">
      <div className="pollen-container">
        <div className="pollen-icon"></div>
        <span className="pollen-label">Pollen</span>
      </div>
      <div className="uv-container">
        <div className="uv-icon" style={{ background: uv.color }}>
          {uv.level}
        </div>
        <span className="uv-label">UV</span>
      </div>
      <div className="pollution-container">
        <div className="pollution-icon"></div>
        <span className="pollution-label">Pollution</span>
      </div>
    </div>
  );
}

export default AirQuality;
