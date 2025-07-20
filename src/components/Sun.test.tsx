import { screen, render } from "@testing-library/react";
import Sun from "./Sun";

describe("Sun Component", () => {
  const mockForecastData = {
    forecast: {
      forecastday: [
        {
          astro: {
            sunrise: "06:00 AM",
            sunset: "06:00 PM",
          },
        },
      ],
    },
  };

  test("renders sunrise and sunset times", () => {
    render(<Sun forecastData={mockForecastData} selectedDayIndex={0} />);

    expect(screen.getByText("Sunrise 06:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Sunset 06:00 PM")).toBeInTheDocument();
  });
  test("returns null when forecastData is empty", () => {
    render(<Sun forecastData={{}} selectedDayIndex={0} />);
    const container = screen.queryByTestId("sun");
    expect(container).not.toBeInTheDocument();
  });
});
