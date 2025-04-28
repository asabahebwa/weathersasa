import React, { useState } from "react";
import "../styles/HourlyForecast.css";

const HourlyForecast = ({
  forecastData,
  selectedDayIndex,
  setSelectedDayIndex,
  toggleExpandedHour,
  expandedHourIndex,
  getConditionText,
  getTempColor,
}) => {
  // if (!forecastData || !forecastData.forecast) {
  //   return null;
  // }

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    // console.log("Hovered index:", index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getBoxShadow = (color, index) => {
    const isExpanded = expandedHourIndex === index;
    const isHovered = hoveredIndex === index;
    if (isExpanded || isHovered) {
      return `inset 0 3px 0 ${color}`;
    }
  };

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

  const getPreviousDayDate = (currentDate) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);

    // Format the date to display day of week and day
    const options = { weekday: "long", day: "numeric" };

    return (
      date.toLocaleDateString("en-GB", options) +
      nth(parseInt(date.toLocaleDateString("en-GB", options).split(" ")[1]))
    );
  };

  const getNextDayDate = (currentDate) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);

    // Format the date to display day of week and month/day
    const options = { weekday: "long", day: "numeric" };

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
    let date = new Date(forecastData.location.localtime);

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

  let data = selectedDayIndex === 0 ? timelyHourlyData : hourlyData;

  const temperatures = hourlyData.map((item) => {
    return Math.trunc(item.temp_c);
  });
  const maxTempC = Math.max(...temperatures);
  const minTempC = Math.min(...temperatures);

  let marginBottomMax = 136;
  let marginBottomMin = 16;

  const getWindDirection = (windDegree) => {
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

  const getPrecipitationValue = (rain, snow) => {
    let value = "";
    if (rain === 0 && snow === 0) {
      value = `0%`;
    } else if (rain > 0 && snow === 0) {
      value = `${Math.trunc(rain)}%`;
    } else if (rain === 0 && snow > 0) {
      value = `${Math.trunc(snow)}%`;
    } else if (rain > 0 && snow > 0) {
      value = `${Math.trunc(rain + snow)}%`;
    } else {
      value = `-`;
    }
    return value;
  };

  const getPrecipitationText = (rain, snow) => {
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

  let conditions = [
    {
      code: 1000,
      day: "Sunny",
      night: "Clear",
      icon: 113,
    },
    {
      code: 1003,
      day: "Partly cloudy",
      night: "Partly cloudy",
      icon: 116,
    },
    {
      code: 1006,
      day: "Cloudy",
      night: "Cloudy",
      icon: 119,
    },
    {
      code: 1009,
      day: "Overcast",
      night: "Overcast",
      icon: 122,
    },
    {
      code: 1030,
      day: "Mist",
      night: "Mist",
      icon: 143,
    },
    {
      code: 1063,
      day: "Patchy rain possible",
      night: "Patchy rain possible",
      icon: 176,
    },
    {
      code: 1066,
      day: "Patchy snow possible",
      night: "Patchy snow possible",
      icon: 179,
    },
    {
      code: 1069,
      day: "Patchy sleet possible",
      night: "Patchy sleet possible",
      icon: 182,
    },
    {
      code: 1072,
      day: "Patchy freezing drizzle possible",
      night: "Patchy freezing drizzle possible",
      icon: 185,
    },
    {
      code: 1087,
      day: "Thundery outbreaks possible",
      night: "Thundery outbreaks possible",
      icon: 200,
    },
    {
      code: 1114,
      day: "Blowing snow",
      night: "Blowing snow",
      icon: 227,
    },
    {
      code: 1117,
      day: "Blizzard",
      night: "Blizzard",
      icon: 230,
    },
    {
      code: 1135,
      day: "Fog",
      night: "Fog",
      icon: 248,
    },
    {
      code: 1147,
      day: "Freezing fog",
      night: "Freezing fog",
      icon: 260,
    },
    {
      code: 1150,
      day: "Patchy light drizzle",
      night: "Patchy light drizzle",
      icon: 263,
    },
    {
      code: 1153,
      day: "Light drizzle",
      night: "Light drizzle",
      icon: 266,
    },
    {
      code: 1168,
      day: "Freezing drizzle",
      night: "Freezing drizzle",
      icon: 281,
    },
    {
      code: 1171,
      day: "Heavy freezing drizzle",
      night: "Heavy freezing drizzle",
      icon: 284,
    },
    {
      code: 1180,
      day: "Patchy light rain",
      night: "Patchy light rain",
      icon: 293,
    },
    {
      code: 1183,
      day: "Light rain",
      night: "Light rain",
      icon: 296,
    },
    {
      code: 1186,
      day: "Moderate rain at times",
      night: "Moderate rain at times",
      icon: 299,
    },
    {
      code: 1189,
      day: "Moderate rain",
      night: "Moderate rain",
      icon: 302,
    },
    {
      code: 1192,
      day: "Heavy rain at times",
      night: "Heavy rain at times",
      icon: 305,
    },
    {
      code: 1195,
      day: "Heavy rain",
      night: "Heavy rain",
      icon: 308,
    },
    {
      code: 1198,
      day: "Light freezing rain",
      night: "Light freezing rain",
      icon: 311,
    },
    {
      code: 1201,
      day: "Moderate or heavy freezing rain",
      night: "Moderate or heavy freezing rain",
      icon: 314,
    },
    {
      code: 1204,
      day: "Light sleet",
      night: "Light sleet",
      icon: 317,
    },
    {
      code: 1207,
      day: "Moderate or heavy sleet",
      night: "Moderate or heavy sleet",
      icon: 320,
    },
    {
      code: 1210,
      day: "Patchy light snow",
      night: "Patchy light snow",
      icon: 323,
    },
    {
      code: 1213,
      day: "Light snow",
      night: "Light snow",
      icon: 326,
    },
    {
      code: 1216,
      day: "Patchy moderate snow",
      night: "Patchy moderate snow",
      icon: 329,
    },
    {
      code: 1219,
      day: "Moderate snow",
      night: "Moderate snow",
      icon: 332,
    },
    {
      code: 1222,
      day: "Patchy heavy snow",
      night: "Patchy heavy snow",
      icon: 335,
    },
    {
      code: 1225,
      day: "Heavy snow",
      night: "Heavy snow",
      icon: 338,
    },
    {
      code: 1237,
      day: "Ice pellets",
      night: "Ice pellets",
      icon: 350,
    },
    {
      code: 1240,
      day: "Light rain shower",
      night: "Light rain shower",
      icon: 353,
    },
    {
      code: 1243,
      day: "Moderate or heavy rain shower",
      night: "Moderate or heavy rain shower",
      icon: 356,
    },
    {
      code: 1246,
      day: "Torrential rain shower",
      night: "Torrential rain shower",
      icon: 359,
    },
    {
      code: 1249,
      day: "Light sleet showers",
      night: "Light sleet showers",
      icon: 362,
    },
    {
      code: 1252,
      day: "Moderate or heavy sleet showers",
      night: "Moderate or heavy sleet showers",
      icon: 365,
    },
    {
      code: 1255,
      day: "Light snow showers",
      night: "Light snow showers",
      icon: 368,
    },
    {
      code: 1258,
      day: "Moderate or heavy snow showers",
      night: "Moderate or heavy snow showers",
      icon: 371,
    },
    {
      code: 1261,
      day: "Light showers of ice pellets",
      night: "Light showers of ice pellets",
      icon: 374,
    },
    {
      code: 1264,
      day: "Moderate or heavy showers of ice pellets",
      night: "Moderate or heavy showers of ice pellets",
      icon: 377,
    },
    {
      code: 1273,
      day: "Patchy light rain with thunder",
      night: "Patchy light rain with thunder",
      icon: 386,
    },
    {
      code: 1276,
      day: "Moderate or heavy rain with thunder",
      night: "Moderate or heavy rain with thunder",
      icon: 389,
    },
    {
      code: 1279,
      day: "Patchy light snow with thunder",
      night: "Patchy light snow with thunder",
      icon: 392,
    },
    {
      code: 1282,
      day: "Moderate or heavy snow with thunder",
      night: "Moderate or heavy snow with thunder",
      icon: 395,
    },
  ];

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

        {data.map((item, index) => {
          // console.log(item);

          let color = getTempColor(Math.trunc(item.temp_c));
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
                      <img
                        src="/precipitation.png"
                        alt="icon"
                        width={30}
                        height={30}
                        color="red"
                        className="weatherByHourPrecipitationIcon"
                      />
                      <div className="weatherByHourPrecipitationText">
                        {getPrecipitationValue(
                          item.chance_of_rain,
                          item.chance_of_snow
                        )}
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
};

export default HourlyForecast;
