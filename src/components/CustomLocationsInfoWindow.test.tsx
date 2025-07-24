import { render, screen } from "@testing-library/react";
import CustomLocationsInfoWindow from "./CustomLocationsInfoWindow";

jest.mock("@vis.gl/react-google-maps", () => ({
  AdvancedMarker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-marker">{children}</div>
  ),
  useAdvancedMarkerRef: () => [null],
}));

describe("CustomLocationsInfoWindow component", () => {
  const poi = {
    query: {
      custom_id: "Kampala",
      location: { lat: 0.3476, lon: 32.5825 },
      forecast: {
        forecastday: [
          {
            day: {
              maxtemp_c: 28.9,
            },
          },
          {
            day: {
              maxtemp_c: 30.5,
            },
          },
        ],
      },
    },
  };

  const getTempColor = (temp: number) => {
    if (temp > 30) return "red";
    if (temp > 25) return "orange";
    return "blue";
  };

  test("renders the location key and temperature", () => {
    render(
      <CustomLocationsInfoWindow
        poi={poi}
        getTempColor={getTempColor}
        selectedDayIndex={0}
      />
    );

    expect(screen.getByText("Kampala")).toBeInTheDocument();
    expect(screen.getByText("28")).toBeInTheDocument(); // truncated maxtemp_c
  });

  it("applies correct background color based on temperature", () => {
    render(
      <CustomLocationsInfoWindow
        poi={poi}
        getTempColor={getTempColor}
        selectedDayIndex={0}
      />
    );

    const tempColorDiv = screen.getByTestId("temp-color-box");

    // `orange` maps to rgb(255, 165, 0)
    expect(tempColorDiv).toHaveStyle("background-color: rgb(255, 165, 0)");
  });
});
