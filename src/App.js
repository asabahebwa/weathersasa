import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getWeatherForecast } from "./services/forecast";
import { addForecast } from "./store/forecast/index";
import { fetchPlace } from "./services/fetchPlace";
import "./App.css";

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
    temperatures = forecast.forecast.forecastday[0].hour.map(
      (item, index) => item.temp_c
    );

    maxTempC = Math.max(...temperatures);

    weatherByHour = forecast.forecast.forecastday[0].hour.map((item, index) => {
      // console.log(item);
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
    getWeatherForecast(coordinates).then((items) => {
      dispatch(addForecast(items));
      setLoading(false);
    });
  }, [selectedCity]);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="App">
        <div className="weatherSummary">
          <div className="today">
            <div className="heading">Today</div>
            <div className="summary">
              <div className="summaryIcon">
                {loading ? (
                  <span>loading...</span>
                ) : (
                  <img
                    src={todayWeatherSummaryIcon}
                    alt="wather icon"
                    width={64}
                    height={64}
                  />
                )}
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
          <div className="otherDays">
            <div className="placesAutocomplete">
              <div className="placesAutocomplete__inputWrap">
                <input
                  list="places"
                  type="text"
                  id="city"
                  name="city"
                  onChange={handleCityChange}
                  onInput={(e) => {
                    if (autocompleteCities.includes(e.target.value)) {
                      console.log("Selected city from list:", e.target.value);
                      setSelectedCity(e.target.value);

                      // Find selected city coordinates when it matches
                      const selectedPlace = cities.find(
                        (c) => c.name === e.target.value
                      );
                      if (selectedPlace) {
                        const [longitude, latitude] = selectedPlace.coordinates;
                        console.log(
                          `Selected city coordinates: lat ${latitude}, lon ${longitude}`
                        );
                        setCoordinates({ latitude, longitude });
                      }
                    }
                  }}
                  value={city}
                  required
                  placeholder="*start typing and choose your city from the given options"
                  pattern={autocompleteCities.join("|")}
                  autoComplete="off"
                />

                <datalist id="places">
                  {autocompleteCities.map((city, i) => (
                    <option key={i}>{city}</option>
                  ))}
                </datalist>
              </div>
              <label htmlFor="city" className="label">
                {autocompleteErr && (
                  <span className="inputError">{autocompleteErr}</span>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="chart">{weatherByHour}</div>
      </div>
    );
  }
}

export default App;
