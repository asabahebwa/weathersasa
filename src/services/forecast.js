export function getWeatherForecast(coordinates) {
  if (coordinates) {
    let { latitude, longitude } = coordinates;

    return fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`
    )
      .then((data) => {
        return data.json();
      })
      .catch((error) => {
        console.error("Fetch", error);
        // Output e.g.: "Fetch Error: 404, Not found"
      });
  } else {
    return fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=London&days=1&aqi=no&alerts=no`
    )
      .then((data) => {
        return data.json();
      })
      .catch((error) => {
        console.error("Fetch", error);
        // Output e.g.: "Fetch Error: 404, Not found
      });
  }
}
