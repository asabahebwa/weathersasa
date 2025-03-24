import React from "react";
import "../styles/DailyForecast.css";

const DailyForecast = ({
  forecastData,
  selectedDayIndex,
  setSelectedDayIndex,
}) => {
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

  const formatDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr).getDate();
    return date + nth(date);
  };

  return (
    <div className="weatherDays">
      {forecastData.forecast.forecastday.map((day, index) => (
        <div
          className={`weatherDay ${
            selectedDayIndex === index ? "weatherDay--selected" : ""
          }`}
          key={index}
          onClick={() => setSelectedDayIndex(index)}
        >
          <div className="weatherDay__date">
            <span className="weatherDay__dayOfWeek">
              {formatDayOfWeek(day.date)}
            </span>
            &nbsp;
            <span className="weatherDay__dateOfMonth">
              {formatDate(day.date)}
            </span>
          </div>

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
              <div className="weatherDay__condition">{day.day.condition.text}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
