import { useState, useEffect, type ChangeEvent } from "react";
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
import ErrorMessage from "./components/ErrorMessage";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getWeatherForecast, getBulkWeatherData } from "./services/forecast";
import { addForecast } from "./store/forecast/index";
import { addBulkForecast } from "./store/bulkForecast/index";
import { fetchPlace, type Place } from "./services/fetchPlace";
import { type Coordinates } from "./services/forecast";
import "./styles/App.css";

// Function to get device width
const getDeviceWidth = () => {
  return window.innerWidth;
};
const useWindowWidth = () => {
  const [width, setWidth] = useState(getDeviceWidth());

  useEffect(() => {
    const handleResize = () => {
      setWidth(getDeviceWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  // @ts-ignore-next-line
  const [bulkError, setBulkError] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<Place[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [autocompleteCities, setAutocompleteCities] = useState<Place[]>([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [expandedHourIndex, setExpandedHourIndex] = useState<number | null>(
    null
  );
  const [selectedApiCondition, setSelectedApiCondition] = useState("");
  const [selectedBackgroundCondition, setSelectedbackgroundCondition] =
    useState("");

  const dispatch = useAppDispatch();

  const forecast = useAppSelector((state) => state.forecast);
  const bulkForecast = useAppSelector((state) => state.bulkForecast);

  const locations = [
    {
      key: "San Francisco",
      location: {
        lat: 37.775,
        lng: -122.418,
      },
    },
    {
      key: "Nairobi",
      location: {
        lat: -1.283,
        lng: 36.817,
      },
    },
    {
      key: "Doha",
      location: {
        lat: 25.287,
        lng: 51.533,
      },
    },
    {
      key: "Moscow",
      location: {
        lat: 55.752,
        lng: 37.616,
      },
    },
    {
      key: "New York",
      location: {
        lat: 40.712776,
        lng: -74.005974,
      },
    },
    {
      key: "San Paulo",
      location: {
        lat: -23.533,
        lng: -46.617,
      },
    },
    {
      key: "Rome",
      location: {
        lat: 41.9,
        lng: 12.483,
      },
    },
    {
      key: "Madrid",
      location: {
        lat: 40.4,
        lng: -3.683,
      },
    },
    {
      key: "Kyiv",
      location: {
        lat: 50.433,
        lng: 30.517,
      },
    },
    {
      key: "Berlin",
      location: {
        lat: 52.517,
        lng: 13.4,
      },
    },
    {
      key: "Cairo",
      location: {
        lat: 30.05,
        lng: 31.25,
      },
    },
    {
      key: "Lagos",
      location: {
        lat: 6.453,
        lng: 3.396,
      },
    },
    {
      key: "Rabat",
      location: {
        lat: 34.025,
        lng: -6.836,
      },
    },
    {
      key: "Beijing",
      location: {
        lat: 39.929,
        lng: 116.388,
      },
    },
    {
      key: "New Delhi",
      location: {
        lat: 28.6,
        lng: 77.2,
      },
    },
    {
      key: "Seoul",
      location: {
        lat: 37.566,
        lng: 127,
      },
    },
    {
      key: "Cape Town",
      location: {
        lat: -33.917,
        lng: 18.417,
      },
    },
    {
      key: "Miami",
      location: {
        lat: 25.774,
        lng: -80.194,
      },
    },
    {
      key: "Vancouver",
      location: {
        lat: 49.25,
        lng: -123.133,
      },
    },
    {
      key: "Anchorage",
      location: {
        lat: 61.218,
        lng: -149.9,
      },
    },
    {
      key: "Yellowknife",
      location: {
        lat: 62.45,
        lng: -114.35,
      },
    },
    {
      key: "Nuuk",
      location: {
        lat: 64.183,
        lng: -51.75,
      },
    },
    {
      key: "Qaarsut",
      location: {
        lat: 70.733,
        lng: -52.65,
      },
    },
    {
      key: "Bogota",
      location: {
        lat: 4.6,
        lng: -74.083,
      },
    },
    {
      key: "Sydney",
      location: {
        lat: -33.883,
        lng: 151.217,
      },
    },
    {
      key: "Darwin",
      location: {
        lat: -12.467,
        lng: 130.833,
      },
    },
    {
      key: "Auckland",
      location: {
        lat: -36.867,
        lng: 174.767,
      },
    },
    {
      key: "Manila",
      location: {
        lat: 14.604,
        lng: 120.982,
      },
    },
    {
      key: "Murmansk",
      location: {
        lat: 68.967,
        lng: 33.083,
      },
    },
  ];

  const getTempColor = (temp: number) => {
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

  const getBackgroundImageUrl = (width: number) => {
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

  const deviceWidth = useWindowWidth();
  const url = getBackgroundImageUrl(deviceWidth);

  // Toggle expanded state for clicked hour
  const toggleExpandedHour = (index: number) => {
    if (expandedHourIndex === index) {
      setExpandedHourIndex(null);
    } else {
      setExpandedHourIndex(index);
    }
  };

  const handleCityChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);

    if (e.target.value.length < 2) {
      setAutocompleteCities([]);
      setAutocompleteErr("");
      return;
    }

    if (!city) return;

    try {
      const data = await fetchPlace(city);
      if (data.length > 0) {
        setAutocompleteCities(data);
        setCities(data);
        setAutocompleteErr("");
      } else {
        setAutocompleteCities([]);
        setCities([]);

        if (e.target.value.length > 3) {
          setAutocompleteErr("No suggestions found.");
        } else {
          setAutocompleteErr("");
        }
      }
    } catch (error) {
      setAutocompleteCities([]);
      setCities([]);
      if (error instanceof Error) {
        setAutocompleteErr(error.message);
      } else {
        setAutocompleteErr("An unknown error occurred");
      }
    }
  };

  const getConditionText = (code: number, text: string) => {
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

  const getSelectedBackgroundCondition = (selectedApiCondition: string) => {
    if (!selectedApiCondition) {
      return "white-cloud";
    }
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
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const items = await getWeatherForecast();
        dispatch(addForecast(items));
        setLoading(false);
        setSelectedDayIndex(0);
        setSelectedApiCondition(
          getConditionText(
            items?.forecast.forecastday[0].day.condition.code,
            items?.forecast.forecastday[0].day.condition.text
          )
        );
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchBulkWeatherData = async () => {
      try {
        const items = await getBulkWeatherData(locations);
        dispatch(addBulkForecast(items));
      } catch (error: unknown) {
        setBulkError(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    };

    fetchWeatherData();
    fetchBulkWeatherData();
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const items = await getWeatherForecast(coordinates);
        dispatch(addForecast(items));
        setSelectedDayIndex(0);
        setExpandedHourIndex(null);
        setSelectedApiCondition(
          getConditionText(
            items?.forecast.forecastday[0].day.condition.code,
            items?.forecast.forecastday[0].day.condition.text
          )
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  useEffect(() => {
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

      {error ? (
        <ErrorMessage text={error} />
      ) : loading ? (
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
              bulkForecast={bulkForecast}
            />
          )}

          {forecast.forecast && <FooterHeading forecastData={forecast} />}
          {forecast.forecast && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
