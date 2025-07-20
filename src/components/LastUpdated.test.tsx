import { screen, render } from "@testing-library/react";
import LastUpdated from "./LastUpdated";

const renderCompoennt = () => {
  const mockForecastData = {
    forecast: true,
    current: {
      last_updated: "2025-07-20 14:00",
    },
  };
  render(<LastUpdated forecastData={mockForecastData} />);
};

describe("LastUpdated Component", () => {
  test("renders last updated text", async () => {
    renderCompoennt();
    const lastUpdatedContainer = await screen.findByTestId("last-updated");
    expect(lastUpdatedContainer).toBeInTheDocument();
    expect(screen.getByText("Last updated")).toBeInTheDocument();
  });
  test("renders last updated time", () => {
    renderCompoennt();
    expect(screen.getByText("2025-07-20 at 14:00")).toBeInTheDocument();
  });

  test("returns null when no last updated data is provided", () => {
    render(<LastUpdated forecastData={{ current: {} }} />);
    const container = screen.queryByTestId("last-updated");
    expect(container).not.toBeInTheDocument();
  });
});
