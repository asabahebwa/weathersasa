export interface Place {
  id?: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export const fetchPlace = async (text: string): Promise<Place[]> => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${text}`
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data: Place[] = await res.json();
    return data;
  } catch (error: unknown) {
    throw error instanceof Error
      ? error
      : new Error("An unknown error occurred.");
  }
};
