import React from "react";
import "../styles/HourlyForecast.css";

const HourlyForecast = ({ forecastData, selectedDayIndex }) => {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  const hourlyData = forecastData.forecast.forecastday[selectedDayIndex].hour;

  // Calculate max temperature for scaling
  const temperatures = hourlyData.map((item) => item.temp_c);
  const maxTempC = Math.max(...temperatures);

  return (
    <div className="chart">
      {hourlyData.map((item, index) => (
        <div className="weatherByHour" key={index}>
          <div className="weatherByHourTime">{item.time.split(" ")[1]}</div>
          <div style={{ marginBottom: (item.temp_c / maxTempC) * 250 }}>
            <div className="weatherByHourIcon">
              <img src={`https:${item.condition.icon}`} alt="icon" width={50} />
            </div>
            <div className="weatherByHourTemp">
              {item.temp_c}
              {String.fromCharCode(176)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
