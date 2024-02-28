export function getWeatherForecast(latitude, longitude) {
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b13aeabd460a4ecfb5681331230211&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`
  ).then((data) => {
    // console.log(data.json());
    return data.json();
  });
}
