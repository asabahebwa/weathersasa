import { screen, render } from "@testing-library/react";
import FooterHeading from "./FooterHeading";
import { type ForecastState } from "../store/forecast";

describe("FooterHeading Component", () => {
  test("renders footer heading with correct text", () => {
    const mockForecastData = {
      forecast: true,
      location: {
        tz_id: "America/New_York",
      },
    };
    render(<FooterHeading forecastData={mockForecastData} />);
    const headingText = screen.getByText("Weathersasa in association with");
    expect(headingText).toBeInTheDocument();
  });
  test("renders DTN link and heading text", () => {
    const mockForecastData = {
      forecast: true,
      location: {
        tz_id: "America/New_York",
      },
    };
    render(<FooterHeading forecastData={mockForecastData} />);
    expect(
      screen.getByText("Weathersasa in association with")
    ).toBeInTheDocument();

    const dtnLink = screen.getByRole("link", { name: "DTN" });
    expect(dtnLink).toHaveAttribute("href", "https://www.dtn.com/");
  });
  test("displays correct timezone text", () => {
    const mockForecastData = {
      forecast: true,
      location: {
        tz_id: "America/New_York",
      },
    };
    render(<FooterHeading forecastData={mockForecastData} />);
    expect(
      screen.getByText(/All times are Eastern Daylight Time/)
    ).toBeInTheDocument();
  });
  test("returns null when forecastData is missing", () => {
    const { container } = render(
      <FooterHeading forecastData={{} as ForecastState} />
    );
    expect(container.firstChild).toBeNull();
  });
  test("returns null when forecastData.forecast is falsy", () => {
    const badData = {
      forecast: null,
      location: {
        tz_id: "America/New_York",
      },
    } as unknown as ForecastState;

    const { container } = render(<FooterHeading forecastData={badData} />);
    expect(container.firstChild).toBeNull();
  });
});
