import { render, screen } from "@testing-library/react";
import CustomLocationInfoWindow from "../components/CustomLocationInfoWindow";
import { Location } from "../services/forecast";

jest.mock("@vis.gl/react-google-maps", () => ({
  AdvancedMarker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-advanced-marker">{children}</div>
  ),
  useAdvancedMarkerRef: () => [null],
}));

describe("CustomLocationInfoWindow", () => {
  const mockPoi: Location = {
    key: "Kampala",
    location: { lat: 0.3476, lng: 32.5825 },
  };

  const getTempColor = (temp: number) => (temp > 30 ? "red" : "blue");

  test("renders the location key and temperature", () => {
    render(
      <CustomLocationInfoWindow
        poi={mockPoi}
        selectedLocationTemperature={35}
        getTempColor={getTempColor}
      />
    );

    expect(screen.getByText("Kampala")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
  });

  test("applies correct background color based on temperature", () => {
    render(
      <CustomLocationInfoWindow
        poi={mockPoi}
        selectedLocationTemperature={35}
        getTempColor={getTempColor}
      />
    );

    const tempColorDiv = screen.getByTestId("temp-color-box");
    expect(tempColorDiv).toHaveStyle("background-color: rgb(255, 0, 0)");
  });
});
