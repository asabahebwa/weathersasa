import React from "react";
import "../styles/DailyForecast.css";

const DailyForecast = ({ forecastData, selectedDayIndex, setSelectedDayIndex }) => {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  const formatDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDate();
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
            <div className="weatherDay__dayOfWeek">
              {formatDayOfWeek(day.date)}
            </div>
            <div className="weatherDay__dateOfMonth">
              {formatDate(day.date)}
            </div>
          </div>
          <div className="weatherDay__icon">
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              width={40}
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
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;