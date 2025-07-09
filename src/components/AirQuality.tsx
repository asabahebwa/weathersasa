import { type ForecastState } from "../store/forecast/index";
import "../styles/AirQuality.css";

interface AirQualityProps {
  forecastData: ForecastState;
  selectedDayIndex: number;
}

function AirQuality({ forecastData, selectedDayIndex }: AirQualityProps) {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  const uvIndex = forecastData.forecast.forecastday[selectedDayIndex].day.uv;

  function getUVLevelAndColor(index: number) {
    const result = {
      level: "",
      color: "",
    };
    switch (true) {
      case index >= 0 && index <= 2:
        result.level = "L";
        result.color = "#afd251";
        break;
      case index > 2 && index <= 5:
        result.level = "M";
        result.color = "yellow";
        break;
      case index > 5 && index <= 7:
        result.level = "H";
        result.color = "orange";
        break;
      case index > 7 && index <= 10:
        result.level = "VH";
        result.color = "red";
        break;
      case index > 10:
        result.level = "E";
        result.color = "purple";
        break;
      default:
        return {
          level: "N/A",
          color: "gray",
        };
    }
    return result;
  }

  const uv = getUVLevelAndColor(uvIndex);

  function calcAQI(
    Cp: number,
    Ih: number,
    Il: number,
    BPh: number,
    BPl: number
  ) {
    const a = Ih - Il;
    const b = BPh - BPl;
    const c = Cp - BPl;
    return Math.round((a / b) * c + Il);
  }

  function aqiFromPM(pm: any) {
    if (isNaN(pm)) return "-";
    if (pm == undefined) return "-";
    if (pm < 0) return pm;
    if (pm > 1000) return "-";
    /*                                  AQI         RAW PM2.5
    Good                               0 - 50   |   0.0 – 12.0
    Moderate                          51 - 100  |  12.1 – 35.4
    Unhealthy for Sensitive Groups   101 – 150  |  35.5 – 55.4
    Unhealthy                        151 – 200  |  55.5 – 150.4
    Very Unhealthy                   201 – 300  |  150.5 – 250.4
    Hazardous                        301 – 400  |  250.5 – 350.4
    Hazardous                        401 – 500  |  350.5 – 500.4
    */
    if (pm > 350.5) {
      return calcAQI(pm, 500, 401, 500.4, 350.5); //Hazardous
    } else if (pm > 250.5) {
      return calcAQI(pm, 400, 301, 350.4, 250.5); //Hazardous
    } else if (pm > 150.5) {
      return calcAQI(pm, 300, 201, 250.4, 150.5); //Very Unhealthy
    } else if (pm > 55.5) {
      return calcAQI(pm, 200, 151, 150.4, 55.5); //Unhealthy
    } else if (pm > 35.5) {
      return calcAQI(pm, 150, 101, 55.4, 35.5); //Unhealthy for Sensitive Groups
    } else if (pm > 12.1) {
      return calcAQI(pm, 100, 51, 35.4, 12.1); //Moderate
    } else if (pm >= 0) {
      return calcAQI(pm, 50, 0, 12, 0); //Good
    } else {
      return undefined;
    }
  }

  const pm25value =
    forecastData.forecast.forecastday[selectedDayIndex].day.air_quality.pm2_5;
  const aQI = aqiFromPM(pm25value);

  function getAQIResult(aqi: number) {
    switch (true) {
      case aqi >= 0 && aqi <= 50:
        return { level: "L", color: "#afd251" };
      case aqi > 50 && aqi <= 100:
        return { level: "M", color: "yellow" };
      case aqi > 100 && aqi <= 150:
        return { level: "H", color: "orange" };
      case aqi > 150 && aqi <= 200:
        return { level: "H", color: "red" };
      case aqi > 200 && aqi <= 300:
        return { level: "H", color: "purple" };
      case aqi > 300 && aqi <= 400:
        return { level: "VH", color: "maroon" };
      case aqi > 400 && aqi <= 500:
        return { level: "VH", color: "black" };
      default:
        return { level: "", color: "gray" };
    }
  }

  const pollution = getAQIResult(aQI);

  return (
    <div className="air-quality-container">
      <div className="pollen-container">
        <div className="pollen-icon"></div>
        <span className="pollen-label">Pollen</span>
      </div>
      <div className="uv-container">
        <div className="uv-icon" style={{ background: uv.color }}>
          {uv.level}
        </div>
        <span className="uv-label">UV</span>
      </div>
      {pollution.level && (
        <div className="pollution-container">
          <div
            className="pollution-icon"
            style={{ background: pollution.color }}
          >
            {pollution.level}
          </div>
          <span className="pollution-label">Pollution</span>
        </div>
      )}
    </div>
  );
}

export default AirQuality;
