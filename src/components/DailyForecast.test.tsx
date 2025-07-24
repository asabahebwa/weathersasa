import { render, screen, fireEvent } from "@testing-library/react";
import DailyForecast, { type DailyForecastProps } from "./DailyForecast";
import { ForecastState } from "../store/forecast/index";

const mockForecastData: ForecastState = {
  forecast: {
    forecastday: [
      {
        date: "2025-07-22",
        date_epoch: 1721606400,
        astro: {},
        day: {
          maxtemp_c: 30,
          mintemp_c: 20,
          condition: {
            code: 1000,
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          },
          maxwind_kph: 10,
        },
        hour: [],
      },
      {
        date: "2025-07-23",
        date_epoch: 1721692800,
        astro: {},
        day: {
          maxtemp_c: 28,
          mintemp_c: 18,
          condition: {
            code: 1003,
            text: "Partly Cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          },
          maxwind_kph: 20,
        },
        hour: [],
      },
    ],
  },
  current: {
    is_day: 1,
    temp_c: 25,
    wind_kph: 5,
    condition: {
      code: 1000,
      text: "Sunny",
      icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
    },
  },
};

const mockProps: DailyForecastProps = {
  forecastData: mockForecastData,
  selectedDayIndex: 0,
  setSelectedDayIndex: jest.fn(),
  setExpandedHourIndex: jest.fn(),
  setSelectedApiCondition: jest.fn(),
  getTempColor: (temp: number) => (temp > 25 ? "red" : "blue"),
  getConditionText: (code: number, text: string) => `${text} (${code})`,
};

describe("DailyForecast", () => {
  test("renders the forecast days", () => {
    render(<DailyForecast {...mockProps} />);
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
    expect(screen.getByText("23rd")).toBeInTheDocument();
  });

  test("renders condition text for selected day", () => {
    render(<DailyForecast {...mockProps} />);
    expect(screen.getByText(/Sunny/)).toBeInTheDocument();
    expect(screen.getByText(/and a light breeze/)).toBeInTheDocument();
  });

  test("calls setSelectedDayIndex and others when a day is clicked", () => {
    render(<DailyForecast {...mockProps} />);
    const secondDay = screen.getByText("Wed").closest(".weatherDay")!;
    fireEvent.click(secondDay);

    expect(mockProps.setSelectedDayIndex).toHaveBeenCalledWith(1);
    expect(mockProps.setExpandedHourIndex).toHaveBeenCalledWith(null);
    expect(mockProps.setSelectedApiCondition).toHaveBeenCalledWith(
      "Partly Cloudy (1003)"
    );
  });

  test("applies correct box-shadow style on hover", () => {
    render(<DailyForecast {...mockProps} />);
    const secondDay = screen.getByText("Wed").closest(".weatherDay")!;
    fireEvent.mouseEnter(secondDay);
    expect(secondDay).toHaveStyle("box-shadow: 0 -6px 0 red, 0 6px 0 white");
    fireEvent.mouseLeave(secondDay);
    expect(secondDay).toHaveStyle("box-shadow: inset 0 -6px 0 red");
  });
});
