import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getWeatherForecast } from "./services/forecast";
import { addForecast } from "./store/forecast/index";
import { fetchPlace } from "./services/fetchPlace";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Location from "./components/Location";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import LastUpdated from "./components/LastUpdated";
import MobileWeatherCondition from "./components/MobileWeatherCondition";
import MenuBar from "./components/MenuBar";
import Sun from "./components/Sun";
import AirQuality from "./components/AirQuality";
import "./styles/App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // Add this to track which day is selected

  const dispatch = useDispatch();

  const forecast = useSelector((state) => state.forecast);
  // console.log(forecast);

  const handleCityChange = async (e) => {
    setCity(e.target.value);
    if (!city) return;

    const res = await fetchPlace(city);

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
      <MenuBar />
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

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="location-and-daily-forecast">
            <Location selectedCity={selectedCity} />
            {forecast.forecast && (
              <DailyForecast
                forecastData={forecast}
                selectedDayIndex={selectedDayIndex}
                setSelectedDayIndex={setSelectedDayIndex}
              />
            )}
          </div>
          {forecast.forecast && (
            <MobileWeatherCondition
              forecastData={forecast}
              selectedDayIndex={selectedDayIndex}
            />
          )}
          {forecast.forecast && (
            <HourlyForecast
              forecastData={forecast}
              selectedDayIndex={selectedDayIndex}
            />
          )}
          <LastUpdated forecastData={forecast} />
          <Sun forecastData={forecast} selectedDayIndex={selectedDayIndex} />
          <AirQuality
            forecastData={forecast}
            selectedDayIndex={selectedDayIndex}
          />
        </>
      )}
    </div>
  );
}

export default App;
