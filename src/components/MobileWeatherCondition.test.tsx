import { render, screen } from "@testing-library/react";
import MobileWeatherCondition from "./MobileWeatherCondition";
import type { ForecastState } from "../store/forecast";

describe("MobileWeatherCondition Component", () => {
  const baseForecastData: ForecastState = {
    forecast: {
      forecastday: [
        {
          day: {
            condition: {
              code: 1000,
              text: "Clear",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            },
            maxwind_kph: 15,
          } as any,
        },
      ],
    },
  };

  test("renders container", () => {
    render(
      <MobileWeatherCondition
        forecastData={baseForecastData}
        selectedDayIndex={0}
      />
    );
    expect(
      screen.getByTestId("mobile-condition-container")
    ).toBeInTheDocument();
  });

  test("displays 'A clear sky' with gentle breeze for code 1000 and text 'Clear'", () => {
    render(
      <MobileWeatherCondition
        forecastData={baseForecastData}
        selectedDayIndex={0}
      />
    );
    expect(
      screen.getByText(/A clear sky and a gentle breeze/i)
    ).toBeInTheDocument();
  });

  test("displays 'Moderate or heavy snow showers and a storm'", () => {
    const snowstormData = {
      forecast: {
        forecastday: [
          {
            day: {
              condition: {
                code: 1258,
                text: "Moderate or heavy snow showers",
                icon: "",
              },
              maxwind_kph: 110,
            },
          },
        ],
      },
    };

    render(
      <MobileWeatherCondition
        forecastData={snowstormData}
        selectedDayIndex={0}
      />
    );
    expect(
      screen.getByText(/Moderate or heavy snow showers and a storm/i)
    ).toBeInTheDocument();
  });

  test("renders nothing if forecastData is missing", () => {
    render(
      <MobileWeatherCondition
        forecastData={{} as ForecastState}
        selectedDayIndex={0}
      />
    );
    expect(
      screen.queryByTestId("mobile-condition-container")
    ).not.toBeInTheDocument();
  });
});
