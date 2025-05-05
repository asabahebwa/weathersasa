export function getWeatherForecast(coordinates) {
  if (coordinates) {
    let { latitude, longitude } = coordinates;

    return fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}&days=14&aqi=yes&alerts=no`
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
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=London&days=14&aqi=yes&alerts=no`
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

export const getBulkWeatherData = (locations) => {
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=bulk&days=14&aqi=yes&alerts=no`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locations: locations.map((item) => ({
          q: `${item.location.lat},${item.location.lng}`,
          custom_id: item.key,
        })),
      }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Fetch", error);
      // Output e.g.: "Fetch Error: 404, Not found"
    });
};
