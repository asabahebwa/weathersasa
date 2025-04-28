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
import Maps from "./components/Maps";
import FooterHeading from "./components/FooterHeading";
import Footer from "./components/Footer";
import "./styles/App.css";

// Function to get device width
const getDeviceWidth = () => {
  return window.innerWidth;
};

// Custom hook to track window width
const useWindowWidth = () => {
  const [width, setWidth] = useState(getDeviceWidth());

  useEffect(() => {
    const handleResize = () => {
      setWidth(getDeviceWidth());
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // Add this to track which day is selected
  const [expandedHourIndex, setExpandedHourIndex] = useState(null);
  const [selectedApiCondition, setSelectedApiCondition] = useState("");
  const [selectedBackgroundCondition, setSelectedbackgroundCondition] =
    useState("");

  const dispatch = useDispatch();

  const forecast = useSelector((state) => state.forecast);
  // console.log(forecast);

  const getTempColor = (temp) => {
    switch (true) {
      case temp < -30:
        return "#241967";
      case temp < -28:
        return "#272579";
      case temp < -26:
        return "#20348D";
      case temp < -24:
        return "#214295";
      case temp < -22:
        return "#3054A2";
      case temp < -20:
        return "#3E65AF";
      case temp < -18:
        return "#4976BA";
      case temp < -16:
        return "#5784C2";
      case temp < -14:
        return "#688FCA";
      case temp < -12:
        return "#759FD3";
      case temp < -10:
        return "#89ADDC";
      case temp < -8:
        return "#9AB9E3";
      case temp < -6:
        return "#9BC3DA";
      case temp < -4:
        return "#9ACDCF";
      case temp < -2:
        return "#9CD2C1";
      case temp < 0:
        return "#9ED0AA";
      case temp < 2:
        return "#D7DE7E";
      case temp < 4:
        return "#EADA6F";
      case temp < 6:
        return "#F4D862";
      case temp < 8:
        return "#FCCC4E";
      case temp < 10:
        return "#F7B42D";
      case temp < 12:
        return "#F29C00";
      case temp < 14:
        return "#F29400";
      case temp < 16:
        return "#F3840D";
      case temp < 18:
        return "#EE730E";
      case temp < 20:
        return "#ED6517";
      case temp < 22:
        return "#EB561E";
      case temp < 24:
        return "#E84B1A";
      case temp < 26:
        return "#E04016";
      case temp < 28:
        return "#D83412";
      case temp < 30:
        return "#D2270F";
      case temp < 32:
        return "#C30507";
      case temp < 34:
        return "#B6070D";
      case temp < 36:
        return "#A90914";
      case temp < 38:
        return "#89061A";
      case temp < 40:
        return "#6F0317";
      case temp >= 40:
        return "#4D0014";

      default:
        return "black";
    }
  };

  const getBackgroundImageUrl = (width) => {
    let url;
    if (!selectedBackgroundCondition) {
      return;
    }
    switch (true) {
      case width < 400:
        url = `https://weathersasa.lon1.cdn.digitaloceanspaces.com/images/G1/@1x-G1_${selectedBackgroundCondition}-day.jpg`;
        break;
      case width >= 400 && width < 600:
        url = `https://weathersasa.lon1.cdn.digitaloceanspaces.com/images/G2/@1x-G2_${selectedBackgroundCondition}-day.jpg`;
        break;
      case width >= 600 && width < 1008:
        url = `https://weathersasa.lon1.cdn.digitaloceanspaces.com/images/G3/@1x-G3_${selectedBackgroundCondition}-day.jpg`;
        break;
      case width >= 1008 && width < 1280:
        url = `https://weathersasa.lon1.cdn.digitaloceanspaces.com/images/G4/@1x-G4_${selectedBackgroundCondition}-day.jpg`;
        break;
      case width > 1280:
        url = `https://weathersasa.lon1.cdn.digitaloceanspaces.com/images/G5/@1x-G5_${selectedBackgroundCondition}-day.jpg`;
        break;
      default:
        url = `https://weathersasa.lon1.cdn.digitaloceanspaces.com/images/G4/@1x-G4_${selectedBackgroundCondition}-day.jpg`;
    }
    return url;
  };

  let deviceWidth = useWindowWidth();
  let url = getBackgroundImageUrl(deviceWidth);

  // Toggle expanded state for clicked hour
  const toggleExpandedHour = (index) => {
    if (expandedHourIndex === index) {
      setExpandedHourIndex(null);
    } else {
      setExpandedHourIndex(index);
    }
  };

  const handleCityChange = async (e) => {
    setCity(e.target.value);

    if (e.target.value.length < 2) {
      setAutocompleteCities([]);
      return;
    }

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

  const getConditionText = (code, text) => {
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

  const getSelectedBackgroundCondition = (selectedApiCondition) => {
    if (selectedApiCondition) {
      switch (selectedApiCondition) {
        case "Sunny":
          return "sunny";
        case "Cloudy":
          return "white-cloud";
        case "Partly cloudy":
          return "sunny-intervals";
        case "Overcast":
          return "thick-cloud";
        case "Mist":
          return "mist";
        case "Patchy rain possible":
        case "Patchy light rain":
        case "Light rain":
          return "light-rain";
        case "Heavy rain at times":
        case "Heavy rain":
        case "Moderate rain at times":
        case "Moderate rain":
        case "Moderate or heavy rain":
        case "Moderate or heavy rain showers":
        case "Torrential rain shower":
          return "heavy-rain";
        case "Patchy snow possible":
        case "Blowing snow":
        case "Patchy light snow":
        case "Patchy moderate snow":
        case "Light snow":
        case "Moderate snow":
        case "Light snow showers":
        case "Patchy light snow with thunder":
          return "light-snow";
        case "Heavy snow":
        case "Patchy heavy snow":
        case "Moderate or heavy snow":
        case "Moderate or heavy snow showers":
        case "Heavy snow showers":
        case "Moderate or heavy snow with thunder":
        case "Blizzard":
          return "heavy-snow";
        case "Fog":
        case "Freezing fog":
          return "fog";
        case "Patchy sleet possible":
        case "Light sleet":
        case "Moderate or heavy sleet":
        case "Light sleet showers":
        case "Moderate or heavy sleet showers":
          return "sleet";
        case "Light drizzle":
        case "Patchy light drizzle":
          return "drizzle";
        case "Freezing drizzle":
        case "Light freezing rain":
        case "Moderate or heavy freezing rain":
        case "Patchy freezing drizzle possible":
        case "Heavy freezing drizzle":
          return "hail";
        case "Thundery outbreaks possible":
        case "Patchy light rain with thunder":
        case "Moderate or heavy rain with thunder":
          return "thunderstorm-shower";
        default:
          return "white-cloud";
      }
    }
  };

  useEffect(() => {
    getWeatherForecast(coordinates).then((items) => {
      dispatch(addForecast(items));
      setLoading(false);
      setSelectedDayIndex(0);
      setSelectedApiCondition(
        getConditionText(
          items.forecast.forecastday[0].day.condition.code,
          items.forecast.forecastday[0].day.condition.text
        )
      );
    });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      getWeatherForecast(coordinates).then((items) => {
        dispatch(addForecast(items));
        setLoading(false);
        setSelectedDayIndex(0);
        setExpandedHourIndex(null);
        setSelectedApiCondition(
          getConditionText(
            items.forecast.forecastday[0].day.condition.code,
            items.forecast.forecastday[0].day.condition.text
          )
        );
      });
    }
  }, [selectedCity]);

  useEffect(() => {
    // console.log("Selected API condition:", selectedApiCondition);
    setSelectedbackgroundCondition(
      getSelectedBackgroundCondition(selectedApiCondition)
    );
  }, [selectedApiCondition]);

  return (
    <div className="App">
      <MenuBar />
      <Header
        city={city}
        handleCityChange={handleCityChange}
        autocompleteCities={autocompleteCities}
        setAutocompleteCities={setAutocompleteCities}
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
          <div
            className="location-and-daily-forecast"
            style={{
              backgroundImage: `url(${url})`,
            }}
          >
            <Location selectedCity={selectedCity} />
            {forecast.forecast && (
              <DailyForecast
                forecastData={forecast}
                selectedDayIndex={selectedDayIndex}
                setSelectedDayIndex={setSelectedDayIndex}
                selectedApiCondition={selectedApiCondition}
                setSelectedApiCondition={setSelectedApiCondition}
                getConditionText={getConditionText}
                getTempColor={getTempColor}
                setExpandedHourIndex={setExpandedHourIndex}
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
              toggleExpandedHour={toggleExpandedHour}
              expandedHourIndex={expandedHourIndex}
              setExpandedHourIndex={setExpandedHourIndex}
              setSelectedDayIndex={setSelectedDayIndex}
              getConditionText={getConditionText}
              getTempColor={getTempColor}
            />
          )}
          <LastUpdated forecastData={forecast} />
          <Sun forecastData={forecast} selectedDayIndex={selectedDayIndex} />
          <AirQuality
            forecastData={forecast}
            selectedDayIndex={selectedDayIndex}
          />
          {forecast.forecast && (
            <Maps
              forecastData={forecast}
              selectedDayIndex={selectedDayIndex}
              getTempColor={getTempColor}
            />
          )}

          {forecast.forecast && (
            <FooterHeading
              forecastData={forecast}
              selectedDayIndex={selectedDayIndex}
            />
          )}
          {forecast.forecast && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
