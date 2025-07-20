import "../styles/Location.css";

interface LocationProps {
  selectedCity: string;
}

function Location({ selectedCity }: LocationProps) {
  const city = selectedCity.split(",")[0];
  return (
    <div data-testid="location" className="location-section">
      <h1 className="selected-city">{city || "London"}</h1>
    </div>
  );
}

export default Location;
