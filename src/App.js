import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getWeatherForecast } from "./services/forecast";
import { addForecast } from "./store/forecast/index";
import { fetchPlace } from "./services/fetchPlace";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Location from "./components/Location";
import "./styles/App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");

  const dispatch = useDispatch();

  const forecast = useSelector((state) => state.forecast);

  let weatherByHour;
  let maxTempC;
  let temperatures;
  let todayWeatherSummaryIcon;
  let todayWeatherSummaryText;
  let todayWeatherSummaryMinimumTemperature;
  let todayWeatherSummaryMaximumTemperature;

  const handleCityChange = async (e) => {
    setCity(e.target.value);
    if (!city) return;

    const res = await fetchPlace(city);

    // console.log(res);

    !autocompleteCities.includes(e.target.value) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");

    if (res.features) {
      const cities = res.features.map((place) => ({
        name: place.place_name,
        coordinates: place.geometry.coordinates,
      }));

      setCities(cities);
    }
  };

  if (forecast.forecast) {
    // All your data processing code remains the same
    temperatures = forecast.forecast.forecastday[0].hour.map(
      (item, index) => item.temp_c
    );

    maxTempC = Math.max(...temperatures);

    weatherByHour = forecast.forecast.forecastday[0].hour.map((item, index) => {
      return (
        <div className="weatherByHour" key={index}>
          <div className="weatherByHourTime">{item.time.split(" ")[1]}</div>
          <div style={{ marginBottom: (item.temp_c / maxTempC) * 250 }}>
            <div className="weatherByHourIcon">
              <img src={`https:${item.condition.icon}`} alt="icon" width={50} />
            </div>
            <div className="weatherByHourTemp">
              {item.temp_c}
              {String.fromCharCode(176)}
            </div>
          </div>
        </div>
      );
    });

    todayWeatherSummaryIcon = `https:${forecast.forecast.forecastday[0].day.condition.icon}`;
    todayWeatherSummaryText =
      forecast.forecast.forecastday[0].day.condition.text;
    todayWeatherSummaryMinimumTemperature =
      forecast.forecast.forecastday[0].day.mintemp_c;
    todayWeatherSummaryMaximumTemperature =
      forecast.forecast.forecastday[0].day.maxtemp_c;
  }

  useEffect(() => {
    getWeatherForecast(coordinates).then((items) => {
      dispatch(addForecast(items));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      getWeatherForecast(coordinates).then((items) => {
        dispatch(addForecast(items));
        setLoading(false);
      });
    }
  }, [selectedCity]);

  return (
    <div className="App">
      <Header
        city={city}
        handleCityChange={handleCityChange}
        autocompleteCities={autocompleteCities}
        setSelectedCity={setSelectedCity}
        cities={cities}
        setCoordinates={setCoordinates}
        setLoading={setLoading}
        autocompleteErr={autocompleteErr}
      />

      {/* Content section that can be loading */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Location selectedCity={selectedCity} />
          <div className="weatherSummary">
            <div className="today">
              <div className="heading">Today</div>
              <div className="summary">
                <div className="summaryIcon">
                  <img
                    src={todayWeatherSummaryIcon}
                    alt="weather icon"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="summaryTemperature">
                  <span className="summaryTemperatureMax">
                    {todayWeatherSummaryMaximumTemperature}
                    {String.fromCharCode(176)}
                  </span>
                  <br />
                  <span className="summaryTemperatureMin">
                    {todayWeatherSummaryMinimumTemperature}
                    {String.fromCharCode(176)}
                  </span>
                </div>
                <div className="summaryText">
                  <span>{todayWeatherSummaryText}</span>
                  <br />
                  <span className="summaryTextHidden">
                    {todayWeatherSummaryText}
                  </span>
                </div>
              </div>
            </div>
            <div className="otherDays"></div>
          </div>
          <div className="chart">{weatherByHour}</div>
        </>
      )}
    </div>
  );
}

export default App;
