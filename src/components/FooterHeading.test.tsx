import { screen, render } from "@testing-library/react";
import FooterHeading from "./FooterHeading";

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
});
