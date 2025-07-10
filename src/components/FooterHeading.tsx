import { DateTime } from "luxon";
import { type ForecastState } from "../store/forecast/index";
import "../styles/FooterHeading.css";

interface FooterHeadingProps {
  forecastData: ForecastState;
}

function FooterHeading({ forecastData }: FooterHeadingProps) {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  const tz_id = forecastData.location.tz_id;

  function displayTimezoneInfo(tz_id: string) {
    const dt = DateTime.now().setZone(tz_id);

    return {
      zone: tz_id,
      localTime: dt.toFormat("yyyy-MM-dd HH:mm"),
      abbreviation: dt.offsetNameShort,
      fullName: dt.offsetNameLong,
      offsetMinutes: dt.offset,
      offsetHours: dt.offset / 60,
      isoString: dt.toISO(),
    };
  }

  const fullName = displayTimezoneInfo(tz_id).fullName;
  const abbreviation = displayTimezoneInfo(tz_id).abbreviation;

  return (
    <div className="footer-heading-container">
      <div className="footer-heading">
        <p className="footer-heading-text-col">
          Weathersasa in association with{" "}
          <a
            className="dtn"
            href="https://www.dtn.com/"
            target="_blank"
            rel="noreferrer"
          >
            DTN
          </a>
        </p>
        <p className="footer-heading-text">
          All times are {fullName}({abbreviation}) unless otherwise stated.
        </p>
      </div>
    </div>
  );
}

export default FooterHeading;
