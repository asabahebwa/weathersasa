import { screen, render } from "@testing-library/react";
import AirQuality from "./AirQuality";

describe("AirQuality Component", () => {
  const mockForecastData = {
    forecast: {
      forecastday: [
        {
          day: {
            air_quality: {
              co: 0.5,
              no2: 10,
              o3: 20,
              so2: 5,
              pm2_5: 15,
              pm10: 25,
            },
          },
        },
      ],
    },
  };
  const selectedDayIndex = 0;
  test("renders AirQuality component", () => {
    render(
      <AirQuality
        forecastData={mockForecastData}
        selectedDayIndex={selectedDayIndex}
      />
    );
    const airQualityContainer = screen.getByTestId("air-quality-container");
    expect(airQualityContainer).toBeInTheDocument();
  });
});
