import { type ForecastState } from "../store/forecast/index";
import "../styles/MobileWeatherCondition.css";

interface MobileWeatherConditionProps {
  forecastData: ForecastState;
  selectedDayIndex: number;
}

function MobileWeatherCondition({
  forecastData,
  selectedDayIndex,
}: MobileWeatherConditionProps) {
  const getConditionText = (code: number, text: string) => {
    switch (code) {
      case 1000:
        if (text === "Clear " || text === "Clear") {
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

  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  return (
    <div data-testid="mobile-condition-container" className="mobile-condition-container">
      <div className="mobile-condition">
        {getConditionText(
          forecastData.forecast.forecastday[selectedDayIndex].day.condition
            .code,
          forecastData.forecast.forecastday[selectedDayIndex].day.condition.text
        )}{" "}
        {getWindPower(
          forecastData.forecast.forecastday[selectedDayIndex].day.maxwind_kph
        )}
      </div>
    </div>
  );
}

export default MobileWeatherCondition;
