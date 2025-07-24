import { render, screen } from "@testing-library/react";
import Sun from "./Sun";
import type { ForecastState } from "../store/forecast";

describe("Sun Component", () => {
  const mockForecastData: ForecastState = {
    forecast: {
      forecastday: [
        {
          astro: {
            sunrise: "06:00 AM",
            sunset: "06:00 PM",
          },
          day: {} as any,
        },
      ],
    },
  };

  test("renders sunrise and sunset times", () => {
    render(<Sun forecastData={mockForecastData} selectedDayIndex={0} />);
    expect(screen.getByText("Sunrise 06:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Sunset 06:00 PM")).toBeInTheDocument();
  });

  test("has correct test id container", () => {
    render(<Sun forecastData={mockForecastData} selectedDayIndex={0} />);
    expect(screen.getByTestId("sun")).toBeInTheDocument();
  });

  test("does not render if forecastData is empty", () => {
    render(<Sun forecastData={{} as ForecastState} selectedDayIndex={0} />);
    expect(screen.queryByTestId("sun")).not.toBeInTheDocument();
  });

  test("does not render if forecast property is missing", () => {
    render(
      <Sun
        forecastData={{ forecast: undefined } as ForecastState}
        selectedDayIndex={0}
      />
    );
    expect(screen.queryByTestId("sun")).not.toBeInTheDocument();
  });

  test("renders correct times based on different day index", () => {
    const multiDayData: ForecastState = {
      forecast: {
        forecastday: [
          {
            astro: { sunrise: "06:00 AM", sunset: "06:00 PM" },
            day: {} as any,
          },
          {
            astro: { sunrise: "06:30 AM", sunset: "06:45 PM" },
            day: {} as any,
          },
        ],
      },
    };

    render(<Sun forecastData={multiDayData} selectedDayIndex={1} />);
    expect(screen.getByText("Sunrise 06:30 AM")).toBeInTheDocument();
    expect(screen.getByText("Sunset 06:45 PM")).toBeInTheDocument();
  });
});
