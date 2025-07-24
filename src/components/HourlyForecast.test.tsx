import { render, screen, fireEvent } from "@testing-library/react";
import HourlyForecast from "./HourlyForecast";
import { ForecastState } from "../store/forecast";

const mockForecastData: ForecastState = {
  location: {
    localtime: "2025-07-23 14:00",
  },
  forecast: {
    forecastday: [
      {
        date: "2025-07-23",
        hour: Array.from({ length: 24 }).map((_, i) => ({
          time: `2025-07-23 ${String(i).padStart(2, "0")}:00`,
          temp_c: 25 + (i % 5),
          condition: {
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            code: 1000,
            text: "Sunny",
          },
          chance_of_rain: i % 2 === 0 ? 10 : 0,
          chance_of_snow: 0,
          wind_kph: 5 + i,
          humidity: 70,
          pressure_mb: 1012,
          feelslike_c: 26,
          wind_degree: 90,
        })),
      },
    ],
  },
};

const mockFns = {
  setSelectedDayIndex: jest.fn(),
  toggleExpandedHour: jest.fn(),
  getConditionText: (code: number, text: string) => text,
  getTempColor: (temp: number) => "#FF0000",
};

describe("HourlyForecast Component", () => {
  test("renders hourly forecast chart", () => {
    render(
      <HourlyForecast
        forecastData={mockForecastData}
        selectedDayIndex={0}
        expandedHourIndex={null}
        {...mockFns}
      />
    );

    expect(screen.getByText(/See weather for/i)).toBeInTheDocument();
    expect(screen.getAllByText("00")).not.toHaveLength(0);
  });

  test("clicking a weather hour triggers toggle", () => {
    render(
      <HourlyForecast
        forecastData={mockForecastData}
        selectedDayIndex={0}
        expandedHourIndex={null}
        {...mockFns}
      />
    );

    const hourBox = screen.getAllByRole("img")[0].closest(".weatherByHour");
    expect(hourBox).toBeInTheDocument();

    if (hourBox) {
      fireEvent.click(hourBox);
      expect(mockFns.toggleExpandedHour).toHaveBeenCalled();
    }
  });

  test("see more weather after is clickable", () => {
    render(
      <HourlyForecast
        forecastData={mockForecastData}
        selectedDayIndex={0}
        expandedHourIndex={null}
        {...mockFns}
      />
    );

    const seeMore = screen.getByText(/See weather for/i);
    fireEvent.click(seeMore);
    expect(mockFns.setSelectedDayIndex).toHaveBeenCalled();
  });

  test("displays correct precipitation percentage", () => {
    render(
      <HourlyForecast
        forecastData={mockForecastData}
        selectedDayIndex={0}
        expandedHourIndex={0}
        {...mockFns}
      />
    );

    expect(screen.getAllByText(/10%|0%/)[0]).toBeInTheDocument();
  });
});
