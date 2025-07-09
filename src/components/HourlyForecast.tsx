import { useState } from "react";
import { type ForecastState } from "../store/forecast/index";
import "../styles/HourlyForecast.css";

interface HourlyForecastProps {
  forecastData: ForecastState;
  selectedDayIndex: number;
  setSelectedDayIndex: (index: number) => void;
  toggleExpandedHour: (index: number) => void;
  expandedHourIndex: number | null;
  getConditionText: (code: number, text: string) => string;
  getTempColor: (temp: number) => string;
}

function HourlyForecast({
  forecastData,
  selectedDayIndex,
  setSelectedDayIndex,
  toggleExpandedHour,
  expandedHourIndex,
  getConditionText,
  getTempColor,
}: HourlyForecastProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getBoxShadow = (color: string, index: number) => {
    const isExpanded = expandedHourIndex === index;
    const isHovered = hoveredIndex === index;
    if (isExpanded || isHovered) {
      return `inset 0 3px 0 ${color}`;
    }
  };

  const nth = (d: number) => {
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

  const getPreviousDayDate = (currentDate: string) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);

    // Format the date to display day of week and day
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
    };

    return (
      date.toLocaleDateString("en-GB", options) +
      nth(parseInt(date.toLocaleDateString("en-GB", options).split(" ")[1]))
    );
  };

  const getNextDayDate = (currentDate: string) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);

    // Format the date to display day of week and month/day
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
    };

    return (
      date.toLocaleDateString("en-GB", options) +
      nth(parseInt(date.toLocaleDateString("en-GB", options).split(" ")[1]))
    );
  };

  const currentDayDate =
    forecastData.forecast.forecastday[selectedDayIndex].date;

  const formattedNextDayDate = getNextDayDate(currentDayDate);
  const formattedPreviousDayDate = getPreviousDayDate(currentDayDate);

  const getHoursElapsedSinceMidnight = () => {
    const date = new Date(forecastData.location.localtime);

    // Get hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Calculate total hours with decimal for partial hours
    const totalHours = hours + minutes / 60;

    if (Math.trunc(totalHours) >= 2) {
      return Math.trunc(totalHours) - 2;
    } else {
      return Math.trunc(totalHours);
    }
  };

  const hourlyData = forecastData.forecast.forecastday[selectedDayIndex].hour;

  const timelyHourlyData = hourlyData.slice(getHoursElapsedSinceMidnight());

  const data = selectedDayIndex === 0 ? timelyHourlyData : hourlyData;

  const temperatures = hourlyData.map((item: any) => {
    return Math.trunc(item.temp_c);
  });
  const maxTempC = Math.max(...temperatures);
  const minTempC = Math.min(...temperatures);

  const marginBottomMax = 136;
  const marginBottomMin = 16;

  const getWindDirection = (windDegree: number) => {
    if (windDegree >= 0 && windDegree < 22.5) {
      return "north";
    } else if (windDegree >= 22.5 && windDegree < 67.5) {
      return "north east";
    } else if (windDegree >= 67.5 && windDegree < 112.5) {
      return "East";
    } else if (windDegree >= 112.5 && windDegree < 157.5) {
      return "south east";
    } else if (windDegree >= 157.5 && windDegree < 202.5) {
      return "south";
    } else if (windDegree >= 202.5 && windDegree < 247.5) {
      return "south west";
    } else if (windDegree >= 247.5 && windDegree < 292.5) {
      return "west";
    } else if (windDegree >= 292.5 && windDegree < 337.5) {
      return "north west";
    } else {
      return "north";
    }
  };

  const getPrecipitationValue = (rain: number, snow: number) => {
    let value: number;
    if (rain === 0 && snow === 0) {
      value = 0;
    } else if (rain > 0 && snow === 0) {
      value = Math.trunc(rain);
    } else if (rain === 0 && snow > 0) {
      value = Math.trunc(snow);
    } else if (Math.trunc(rain + snow) >= 100) {
      value = 100;
    } else if (rain > 0 && snow > 0) {
      value = Math.trunc(rain + snow);
    } else {
      value = 0;
    }
    return value;
  };

  const getPrecipitationText = (rain: number, snow: number) => {
    let result = "";
    if (rain === 0 && snow === 0) {
      result = "Precipitation is not expected";
    } else if (rain > 0 && snow === 0) {
      result = "Precipitation is expected";
    } else if (rain === 0 && snow > 0) {
      result = "Precipitation is expected";
    } else if (rain > 0 && snow > 0) {
      result = "Precipitation is expected";
    } else {
      result = "Unknown precipitation";
    }
    return result;
  };

  const getWindPower = (windSpeed: number) => {
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
  return (
    <div className="chart-container">
      <div className="chart">
        {selectedDayIndex !== 0 && (
          <div
            className="seeMoreWeatherBefore"
            onClick={() => setSelectedDayIndex(selectedDayIndex - 1)}
          >
            <span>See weather for</span>
            <span className="date">{formattedPreviousDayDate}</span>
          </div>
        )}

        {data.map((item: any, index: number) => {
          const precipValue = getPrecipitationValue(
            item.chance_of_rain,
            item.chance_of_snow
          );

          const color = getTempColor(Math.trunc(item.temp_c));
          const isExpanded = expandedHourIndex === index;
          return (
            <div
              className="weatherByHour"
              key={index}
              onClick={() => toggleExpandedHour(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`weatherByHourSummary ${
                  isExpanded ? "weatherByHourSummary--expanded" : ""
                }`}
                style={{
                  boxShadow: getBoxShadow(color, index),
                }}
              >
                <div className="weatherByHourTime">
                  <span>{item.time.split(" ")[1].split(":")[0]}</span>
                  <span className="weatherByHourTimeZero">{"00"}</span>
                </div>
                <div className="weatherByHourTempPrecipAndWind">
                  <div
                    style={{
                      marginBottom:
                        ((Math.trunc(item.temp_c) - minTempC) /
                          (maxTempC - minTempC)) *
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
                      {Math.trunc(item.temp_c)}
                      {String.fromCharCode(176)}
                    </div>
                  </div>
                  <div className="weatherByHourPrecipAndWind">
                    <div className="weatherByHourPrecipitationContainer">
                      <div className="weatherByHourPrecipitationIcon">
                        <div
                          className="weatherByHourPrecipitationIcon--precip"
                          style={{
                            backgroundColor:
                              precipValue > 0 ? "#1C86E0" : "#B4B4B4",
                          }}
                        ></div>
                        <div
                          className="weatherByHourPrecipitationIcon--precip"
                          style={{
                            backgroundColor:
                              precipValue > 0 ? "#1C86E0" : "#B4B4B4",
                          }}
                        ></div>
                        <div
                          className="weatherByHourPrecipitationIcon--precip"
                          style={{
                            backgroundColor:
                              precipValue > 0 ? "#1C86E0" : "#B4B4B4",
                          }}
                        ></div>
                      </div>
                      <div className="weatherByHourPrecipitationText">
                        {getPrecipitationValue(
                          item.chance_of_rain,
                          item.chance_of_snow
                        )}
                        %
                      </div>
                    </div>
                    <div className="weatherByHourWindContainer">
                      <span className="weatherByHourWindIcon">
                        {Math.trunc(item.wind_kph)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  isExpanded
                    ? "weatherByHourDetails--expanded"
                    : "weatherByHourDetails"
                }
                style={{
                  boxShadow: `inset 0 3px 0 ${color}`,
                }}
              >
                <div className="weatherDetailsCondition">
                  <span className="weatherDetailsConditionText">
                    {getConditionText(item.condition.code, item.condition.text)}{" "}
                    {getWindPower(item.wind_kph)}
                  </span>
                </div>

                <div className="weatherDetailsRows__general">
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
                    <span className="detailValue">
                      {Math.trunc(item.wind_kph)} kph
                    </span>
                  </div>
                </div>
                <div className="weatherDetailsRows__all">
                  <div className="weatherDetailsRow__temp">
                    <span className="detailLabel">Temperature feels like</span>
                    <span className="detailValue">
                      {Math.trunc(item.feelslike_c)}
                      {String.fromCharCode(176)}C
                    </span>
                  </div>
                  <div className="weatherDetailsRow__precip">
                    <span className="detailLabel">
                      {getPrecipitationText(
                        item.chance_of_rain,
                        item.chance_of_snow
                      )}
                    </span>
                  </div>
                  <div className="weatherDetailsRow__wind">
                    <span className="detailLabel">
                      Light winds from the {getWindDirection(item.wind_degree)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {selectedDayIndex < 13 && (
          <div
            className="seeMoreWeatherAfter"
            onClick={() => setSelectedDayIndex(selectedDayIndex + 1)}
          >
            <span>See weather for</span>
            <span className="date">{formattedNextDayDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default HourlyForecast;
