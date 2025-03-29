import React from "react";
import "../styles/HourlyForecast.css";

const HourlyForecast = ({ forecastData, selectedDayIndex }) => {
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

  return (
    <div className="chart">
      {hourlyData.map((item, index) => {
        console.log(item);
        return (
          <div className="weatherByHour" key={index}>
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
        );
      })}
    </div>
  );
};

export default HourlyForecast;
