import { type ForecastState } from "../store/forecast/index";
import "../styles/Sun.css";

interface SunProps {
  forecastData: ForecastState;
  selectedDayIndex: number;
}

function Sun({ forecastData, selectedDayIndex }: SunProps) {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  return (
    <div data-testid="sun" className="sun">
      <span className="sunrise">
        Sunrise{" "}
        {forecastData.forecast.forecastday[selectedDayIndex].astro.sunrise}
      </span>{" "}
      {"|"}
      <span className="sunset">
        Sunset{" "}
        {forecastData.forecast.forecastday[selectedDayIndex].astro.sunset}
      </span>
    </div>
  );
}

export default Sun;
