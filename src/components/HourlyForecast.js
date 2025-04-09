import React, { useState, useEffect, useRef } from "react";
import "../styles/HourlyForecast.css";

const HourlyForecast = ({ forecastData, selectedDayIndex }) => {
  const [expandedHourIndex, setExpandedHourIndex] = useState(null);

  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  const hourlyData = forecastData.forecast.forecastday[selectedDayIndex].hour;

  // Calculate max temperature for scaling
  const temperatures = hourlyData.map((item) => {
    return Math.trunc(item.temp_c);
  });
  const maxTempC = Math.max(...temperatures);
  const minTempC = Math.min(...temperatures);

  let marginBottomMax = 136;
  let marginBottomMin = 16;

  // Toggle expanded state for clicked hour
  const toggleExpand = (index) => {
    if (expandedHourIndex === index) {
      setExpandedHourIndex(null);
    } else {
      setExpandedHourIndex(index);
    }
  };

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

  const getConditionText = (code, text) => {
    switch (code) {
      case 1000:
        if (text === "Clear ") {
          return "A clear sky";
        } else {
          return "Sunny";
        }
      case 1003:
        return "Partly cloudy";
      case 1006:
        return "Cloudy";
      case 1009:
        return "Overcast";
      case 1030:
        return "Mist";
      case 1063:
        return "Patchy rain possible";
      case 1066:
        return "Patchy snow possible";
      case 1069:
        return "Patchy sleet possible";
      case 1072:
        return "Patchy freezing drizzle possible";
      case 1087:
        return "Thundery outbreaks possible";
      case 1114:
        return "Blowing snow";
      case 1117:
        return "Blizzard";
      case 1135:
        return "Fog";
      case 1147:
        return "Freezing fog";
      case 1150:
        return "Patchy light drizzle";
      case 1153:
        return "Light drizzle";
      case 1168:
        return "Freezing drizzle";
      case 1171:
        return "Heavy freezing drizzle";
      case 1180:
        return "Patchy light rain";
      case 1183:
        return "Light rain";
      case 1186:
        return "Moderate rain at times";
      case 1189:
        return "Moderate rain";
      case 1192:
        return "Heavy rain at times";
      case 1195:
        return "Heavy rain";
      case 1198:
        return "Light freezing rain";
      case 1201:
        return "Moderate or heavy freezing rain";
      case 1204:
        return "Light sleet";
      case 1207:
        return "Moderate or heavy sleet";
      case 1210:
        return "Patchy light snow";
      case 1213:
        return "Light snow";
      case 1216:
        return "Patchy moderate snow";
      case 1219:
        return "Moderate snow";
      case 1222:
        return "Patchy heavy snow";
      case 1225:
        return "Heavy snow";
      case 1237:
        return "Ice pellets";
      case 1240:
        return "Light rain shower";
      case 1243:
        return "Moderate or heavy rain shower";
      case 1246:
        return "Torrential rain shower";
      case 1249:
        return "Light sleet showers";
      case 1252:
        return "Moderate or heavy sleet showers";
      case 1255:
        return "Light snow showers";
      case 1258:
        return "Moderate or heavy snow showers";
      case 1261:
        return "Light showers of ice pellets";
      case 1264:
        return "Moderate or heavy showers of ice pellets";
      case 1273:
        return "Patchy light rain with thunder";
      case 1276:
        return "Moderate or heavy rain with thunder";
      case 1279:
        return "Patchy light snow with thunder";
      case 1282:
        return "Moderate or heavy snow with thunder";
      default:
        return "Unknown condition";
    }
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

            {isExpanded && (
              <div className="weatherByHourDetails">
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
                    <span className="detailValue">{item.wind_kph} kph</span>
                  </div>
                </div>
                <div className="weatherDetailsRows__all">
                  <div className="weatherDetailsRow__temp">
                    <span className="detailLabel">Temperature feels like</span>
                    <span className="detailValue">
                      {item.feelslike_c}
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
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HourlyForecast;
