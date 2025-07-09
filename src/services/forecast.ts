export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  key: string,
  location: {
    lat: number,
    lng: number,
  },
}

interface BulkWeatherData {
  bulk: Array<any>
}

interface WeatherForecast {
  location: {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime: string,
    localtime_epoch: number,
  };
  forecast: {
    forecastday: Array<any>,
  };
  current: {
    air_quality: any,
    condition: any,
    dewpoint_c: number,
    dewpoint_f: number,
    feelslike_c: number,
    feelslike_f: number,
    gust_kph: number,
    gust_mph: number,
    heatindex_c: number,
    heatindex_f: number,
    humidity: number,
    is_day: number,
    last_updated: string,
    last_updated_epoch: number,
    precip_in: number,
    precip_mm: number
    pressure_in: number,
    pressure_mb: number,
    temp_c: number,
    temp_f: number,
    uv: number,
    vis_km: number,
    vis_miles: number,
    wind_degree: number,
    wind_dir: string,
    wind_kph: number,
    wind_mph: number,
    windchill_c: number,
    windchill_f: number,
  }
}

export async function getWeatherForecast(
  coordinates?: Coordinates | null
): Promise<WeatherForecast> {
  const defaultLocation = "London";
  const query = coordinates
    ? `${coordinates.latitude},${coordinates.longitude}`
    : defaultLocation;

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${query}&days=14&aqi=yes&alerts=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching forecast: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw error instanceof Error
      ? error
      : new Error("An unknown error occurred.");
  }
}

export const getBulkWeatherData = async (
  locations: Location[]
): Promise<BulkWeatherData> => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=bulk&days=14&aqi=yes&alerts=no`;

  const payload = {
    locations: locations.map((item) => ({
      q: `${item.location.lat},${item.location.lng}`,
      custom_id: item.key,
    })),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error fetching bulk weather data: ${response.status}`);
    }

    const data = await response.json();
    return data

  } catch (error: unknown) {
    throw error instanceof Error
      ? error
      : new Error("An unknown error occurred.");
  }
};
