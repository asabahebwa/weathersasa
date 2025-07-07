// expected data
// {
//   country: "Uganda"; // string
//   id: 2531868; // number
//   lat: 0.32; // number
//   lon: 32.57; // number
//   name: "Kampala"; // string
//   region: "Kampala"; // string
//   url: "kampala-kampala-uganda"; // string
// }

export const fetchPlace = async (text) => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${text}`
    );
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    throw new Error(
      "We couldn’t fetch location suggestions. Please check your connection and try again."
    );
  }
};
