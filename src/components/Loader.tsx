import "../styles/Loader.css";

function Loader() {
  return (
    <div data-testid="loading-container" className="loading-container">
      <div className="loading-message">Loading weather data...</div>
    </div>
  );
}

export default Loader;
