import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ForecastState } from "../store/forecast/index";
import "../styles/LastUpdated.css";

interface LastUpdatedProps {
  forecastData: ForecastState;
}

function LastUpdated({ forecastData }: LastUpdatedProps) {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }
  const lastUpdated = forecastData.current.last_updated;

  return (
    <div data-testid="last-updated" className="lastUpdated">
      <FontAwesomeIcon icon={faClock} />
      <span className="lastUpdated-text">Last updated</span>
      <span className="lastUpdated-time">
        {lastUpdated.split(" ")[0]} at {lastUpdated.split(" ")[1]}
      </span>
    </div>
  );
}

export default LastUpdated;
