import React, { useState } from "react";
import "../styles/HourlyForecast.css";

const HourlyForecast = ({ forecastData, selectedDayIndex }) => {
  const [expandedHourIndex, setExpandedHourIndex] = useState(null);
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  const hourlyData = forecastData.forecast.forecastday[selectedDayIndex].hour;

  // Calculate max temperature for scaling
  const temperatures = hourlyData.map((item) => {
    return item.temp_c;
  });
  const maxTempC = Math.max(...temperatures);
  const minTempC = Math.min(...temperatures);

  let marginBottomMax = 250;
  let marginBottomMin = 50;

  // Toggle expanded state for clicked hour
  const toggleExpand = (index) => {
    if (expandedHourIndex === index) {
      setExpandedHourIndex(null);
    } else {
      setExpandedHourIndex(index);
    }
  };

  const getPrecipitation = (precip) => {
    let result = "";
    switch (precip) {
      case 0:
        result = "Precipitation is not expected";
        break;
      case precip > 0:
        result = "Chance of precipitation";
        break;
      default:
        result = "Unknown precipitation";
        break;
    }
    return result;
  };

  const getWindPower = (windSpeed) => {
    let result = "";
    switch (true) {
      case windSpeed === 0:
        result = "calm and still winds";
        break;
      case windSpeed > 0 && windSpeed <= 5:
        result = "light winds";
        break;
      case windSpeed > 5 && windSpeed <= 11:
        result = "light breeze";
        break;
      case windSpeed > 11 && windSpeed <= 28:
        result = "gentle breeze";
        break;
      case windSpeed > 28 && windSpeed <= 38:
        result = "fresh breeze";
        break;
      case windSpeed > 38 && windSpeed <= 49:
        result = "strong breeze";
        break;
      case windSpeed > 49 && windSpeed <= 61:
        result = "moderate gale";
        break;
      case windSpeed > 61 && windSpeed <= 74:
        result = "fresh gale";
        break;
      case windSpeed > 74 && windSpeed <= 88:
        result = "strong gale";
        break;
      case windSpeed > 88 && windSpeed <= 102:
        result = "whole gale";
        break;
      case windSpeed > 102 && windSpeed <= 118:
        result = "storm";
        break;
      case windSpeed > 118:
        result = "hurricane";
        break;
      default:
        result = "Unknown wind conditions";
        break;
    }
    return result;
  };
  return (
    <div className="chart">
      {hourlyData.map((item, index) => {
        // console.log(item);
        const isExpanded = expandedHourIndex === index;
        return (
          <div
            className={`weatherByHour ${
              isExpanded ? "weatherByHour--expanded" : ""
            }`}
            key={index}
            onClick={() => toggleExpand(index)}
          >
            <div className="weatherByHourSummary">
              <div className="weatherByHourTime">
                <span>{item.time.split(" ")[1].split(":")[0]}</span>
                <span className="weatherByHourTimeZero">{"00"}</span>
              </div>
              <div
                style={{
                  marginBottom:
                    ((item.temp_c - minTempC) / (maxTempC - minTempC)) *
                      (marginBottomMax - marginBottomMin) +
                    marginBottomMin,
                }}
                className="weatherByHourTempContainer"
              >
                <div className="weatherByHourIcon">
                  <img
                    src={`https:${item.condition.icon}`}
                    alt="icon"
                    width={50}
                  />
                </div>
                <div className="weatherByHourTemp">
                  {item.temp_c}
                  {String.fromCharCode(176)}
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="weatherByHourDetails">
                <div className="weatherDetailsCondition">
                  <span className="weatherDetailsConditionText">
                    {item.condition.text} and a {getWindPower(item.wind_kph)}
                  </span>
                </div>

                <div className="weatherDetailsRows">
                  <div className="weatherDetailsRow">
                    <span className="detailLabel">Humidity:</span>
                    <span className="detailValue">{item.humidity}%</span>
                  </div>
                  <div className="weatherDetailsRow">
                    <span className="detailLabel">Pressure:</span>
                    <span className="detailValue">{item.pressure_mb} mb</span>
                  </div>
                  <div className="weatherDetailsRow">
                    <span className="detailLabel">Wind:</span>
                    <span className="detailValue">{item.wind_kph} kph</span>
                  </div>
                </div>
                <div className="weatherDetailsRow__temp">
                  <span className="detailLabel">Temperature feels like</span>
                  <span className="detailValue">
                    {item.feelslike_c}
                    {String.fromCharCode(176)}C
                  </span>
                </div>
                <div className="weatherDetailsRow__precip">
                  <span className="detailLabel">
                    {getPrecipitation(item.precip_mm)}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HourlyForecast;
