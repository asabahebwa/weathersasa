import React, { useState } from "react";
import "../styles/DailyForecast.css";

const DailyForecast = ({
  forecastData,
  selectedDayIndex,
  setSelectedDayIndex,
  setExpandedHourIndex,
  setSelectedApiCondition,
  getTempColor,
  getConditionText,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    // console.log("Hovered index:", index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getBoxShadow = (color, index) => {
    const isSelected = selectedDayIndex === index;
    const isHovered = hoveredIndex === index;

    if (isSelected) {
      // If this day is selected, maintain a consistent style with larger top border
      return `0 -8px 0 ${color}, 0 6px 0 white`;
    } else if (isHovered) {
      // If not selected but hovered, show a slightly prominent top border
      return `0 -6px 0 ${color}, 0 6px 0 white`;
    } else {
      // Default state - show bottom border only
      return `inset 0 -6px 0 ${color}`;
    }
  };

  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  // console.log(forecastData);

  const nth = (d) => {
    switch (d) {
      case 1:
      case 21:
      case 31:
        return "st";
      case 2:
      case 22:
        return "nd";
      case 3:
      case 23:
        return "rd";
      default:
        return "th";
    }
  };

  const setSelectedParameters = (index) => {
    setSelectedDayIndex(index);
    setExpandedHourIndex(null);
    setSelectedApiCondition(
      getConditionText(
        forecastData.forecast.forecastday[index].day.condition.code,
        forecastData.forecast.forecastday[index].day.condition.text
      )
    );
  };

  const getWindPower = (windSpeed) => {
    let result = "";
    switch (true) {
      case windSpeed === 0:
        result = "with calm and still winds";
        break;
      case windSpeed > 0 && windSpeed <= 5:
        result = "with light winds";
        break;
      case windSpeed > 5 && windSpeed <= 11:
        result = "and a light breeze";
        break;
      case windSpeed > 11 && windSpeed <= 28:
        result = "and a gentle breeze";
        break;
      case windSpeed > 28 && windSpeed <= 38:
        result = "and a fresh breeze";
        break;
      case windSpeed > 38 && windSpeed <= 49:
        result = "and a strong breeze";
        break;
      case windSpeed > 49 && windSpeed <= 61:
        result = "and a moderate gale";
        break;
      case windSpeed > 61 && windSpeed <= 74:
        result = "and a fresh gale";
        break;
      case windSpeed > 74 && windSpeed <= 88:
        result = "and a strong gale";
        break;
      case windSpeed > 88 && windSpeed <= 102:
        result = "and a whole gale";
        break;
      case windSpeed > 102 && windSpeed <= 118:
        result = "and a storm";
        break;
      case windSpeed > 118:
        result = "and a hurricane";
        break;
      default:
        result = "Unknown wind conditions";
        break;
    }
    return result;
  };

  const formatDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr).getDate();
    return date + nth(date);
  };

  const getCurrentWeather = (day, index) => {
    const currentDetails = forecastData.current;

    return (
      <>
        <div className="dayOrNight">
          <span>{currentDetails.is_day === 1 ? "Today" : "Tonight"}</span>
        </div>

        <div className="weatherDay__summary">
          <div className="weatherDay__icon">
            <img
              src={
                currentDetails.is_day === 1
                  ? `https:${day.day.condition.icon}`
                  : `https:${currentDetails.condition.icon}`
              }
              alt={day.day.condition.text}
              width={selectedDayIndex === index ? 88 : 64}
              height={selectedDayIndex === index ? 88 : 64}
            />
          </div>
          {currentDetails.is_day === 1 ? (
            <div className="weatherDay__temps">
              <span className="weatherDay__maxTemp">
                {Math.round(day.day.maxtemp_c)}
                {String.fromCharCode(176)}
              </span>
              <span className="weatherDay__minTemp">
                {Math.round(day.day.mintemp_c)}
                {String.fromCharCode(176)}
              </span>
            </div>
          ) : (
            <div className="weatherDay__temps">
              <span className="weatherDay__lowTempText">Now</span>
              <span className="weatherDay__lowTemp">
                {Math.round(currentDetails.temp_c)}
                {String.fromCharCode(176)}
              </span>
            </div>
          )}

          {selectedDayIndex === index &&
            (currentDetails.is_day === 1 ? (
              <div className="weatherDay__condition">
                {getConditionText(
                  day.day.condition.code,
                  day.day.condition.text
                )}{" "}
                {getWindPower(day.day.maxwind_kph)}
              </div>
            ) : (
              <div className="weatherDay__condition">
                {getConditionText(
                  currentDetails.condition.code,
                  currentDetails.condition.text
                )}{" "}
                {getWindPower(currentDetails.wind_kph)}
              </div>
            ))}
        </div>
      </>
    );
  };

  return (
    <div className="weatherDays">
      {forecastData.forecast.forecastday.map((day, index) => {
        let color = getTempColor(Math.trunc(day.day.maxtemp_c));
        // console.log(color);
        return (
          <div
            className={`weatherDay ${
              selectedDayIndex === index ? "weatherDay--selected" : ""
            }`}
            key={index}
            style={{
              boxShadow: getBoxShadow(color, index),
            }}
            onClick={() => setSelectedParameters(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <>
              {index === 0 ? (
                <div className="today">
                  <span>Today</span>
                </div>
              ) : (
                <div className="weatherDay__date">
                  {formatDayOfWeek(day.date)}
                  &nbsp;
                  <span className="weatherDay__dateOfMonth">
                    {formatDate(day.date)}
                  </span>
                </div>
              )}

              <div className="weatherDay__summary">
                <div className="weatherDay__icon">
                  <img
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                    width={selectedDayIndex === index ? 88 : 64}
                    height={selectedDayIndex === index ? 88 : 64}
                  />
                </div>

                <div className="weatherDay__temps">
                  <span className="weatherDay__maxTemp">
                    {Math.round(day.day.maxtemp_c)}
                    {String.fromCharCode(176)}
                  </span>
                  <span className="weatherDay__minTemp">
                    {Math.round(day.day.mintemp_c)}
                    {String.fromCharCode(176)}
                  </span>
                </div>

                {selectedDayIndex === index && (
                  <div className="weatherDay__condition">
                    {getConditionText(
                      day.day.condition.code,
                      day.day.condition.text
                    )}{" "}
                    {getWindPower(day.day.maxwind_kph)}
                  </div>
                )}
              </div>
            </>
          </div>
        );
      })}
    </div>
  );
};

export default DailyForecast;
