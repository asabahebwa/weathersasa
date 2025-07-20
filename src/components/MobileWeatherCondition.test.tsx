import { screen, render } from "@testing-library/react";
import MobileWeatherCondition from "./MobileWeatherCondition";

describe("MobileWeatherCondition Component", () => {
  const mockForecastData = {
    forecast: {
      forecastday: [
        {
          day: {
            condition: {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            },
            avgtemp_c: 25,
            avghumidity: 60,
            maxwind_kph: 15,
          },
        },
      ],
    },
  };

  const selectedDayIndex = 0;

  test("renders mobile weather condition details", () => {
    render(
      <MobileWeatherCondition
        forecastData={mockForecastData}
        selectedDayIndex={selectedDayIndex}
      />
    );
    const container = screen.getByTestId("mobile-condition-container");
    expect(container).toBeInTheDocument();
  });
});
