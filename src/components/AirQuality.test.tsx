import { render, screen } from "@testing-library/react";
import AirQuality from "./AirQuality";
import type { ForecastState } from "../store/forecast";

describe("AirQuality Component", () => {
  const baseMockForecastData: ForecastState = {
    forecast: {
      forecastday: [
        {
          day: {
            uv: 6, // triggers "H" (orange)
            air_quality: {
              co: 0.5,
              no2: 10,
              o3: 20,
              so2: 5,
              pm2_5: 15, // triggers Moderate AQI: 51–100
              pm10: 25,
            },
          },
        },
      ],
    },
  };

  test("renders AirQuality container", () => {
    render(
      <AirQuality forecastData={baseMockForecastData} selectedDayIndex={0} />
    );
    expect(screen.getByTestId("air-quality-container")).toBeInTheDocument();
  });

  test("displays correct UV level and color", () => {
    render(
      <AirQuality forecastData={baseMockForecastData} selectedDayIndex={0} />
    );
    const uvIcon = screen.getByText("H");
    expect(uvIcon).toBeInTheDocument();
    expect(uvIcon).toHaveStyle("background: orange");
  });

  test("displays correct pollution level and color", () => {
    render(
      <AirQuality forecastData={baseMockForecastData} selectedDayIndex={0} />
    );
    const pollutionIcon = screen.getByText("M");
    expect(pollutionIcon).toBeInTheDocument();
    expect(pollutionIcon).toHaveStyle("background: yellow");
  });

  test("handles missing forecast data", () => {
    render(
      <AirQuality forecastData={{} as ForecastState} selectedDayIndex={0} />
    );
    expect(
      screen.queryByTestId("air-quality-container")
    ).not.toBeInTheDocument();
  });

  test("handles undefined pm2_5 gracefully", () => {
    const brokenData = JSON.parse(JSON.stringify(baseMockForecastData));
    brokenData.forecast.forecastday[0].day.air_quality.pm2_5 = undefined;

    render(<AirQuality forecastData={brokenData} selectedDayIndex={0} />);
    expect(screen.getByTestId("air-quality-container")).toBeInTheDocument();
  });

  test("handles extreme UV index > 10", () => {
    const highUVData = JSON.parse(JSON.stringify(baseMockForecastData));
    highUVData.forecast.forecastday[0].day.uv = 12;

    render(<AirQuality forecastData={highUVData} selectedDayIndex={0} />);
    const uvIcon = screen.getByText("E");
    expect(uvIcon).toBeInTheDocument();
    expect(uvIcon).toHaveStyle("background: purple");
  });

  test("handles low pm2_5 value for Good AQI", () => {
    const goodAir = JSON.parse(JSON.stringify(baseMockForecastData));
    goodAir.forecast.forecastday[0].day.air_quality.pm2_5 = 5;

    render(<AirQuality forecastData={goodAir} selectedDayIndex={0} />);
    const pollutionIcon = screen.getByText("L");
    expect(pollutionIcon).toBeInTheDocument();
    expect(pollutionIcon).toHaveStyle("background: #afd251");
  });
});
