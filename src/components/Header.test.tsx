import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { Place } from "../services/fetchPlace";

const mockCities: Place[] = [
  {
    country: "Uganda",
    id: 123456,
    lat: 0.3,
    lon: 32.6,
    name: "Kampala",
    region: "Central Region",
    url: "kampala-central-region-uganda",
  },
  {
    country: "Kenya",
    id: 1314375,
    lat: -1.28,
    lon: 36.82,
    name: "Nairobi",
    region: "Nairobi Area",
    url: "nairobi-nairobi-area-kenya",
  },
];

describe("Header Component", () => {
  const mockSetAutocompleteCities = jest.fn();
  const mockSetSelectedCity = jest.fn();
  const mockSetCoordinates = jest.fn();
  const mockSetLoading = jest.fn();
  const mockHandleCityChange = jest.fn();

  const defaultProps = {
    city: "",
    handleCityChange: mockHandleCityChange,
    autocompleteCities: mockCities,
    setAutocompleteCities: mockSetAutocompleteCities,
    setSelectedCity: mockSetSelectedCity,
    cities: mockCities,
    setCoordinates: mockSetCoordinates,
    setLoading: mockSetLoading,
    autocompleteErr: null,
  };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

  test("renders header with input and title", () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByTestId("header-container")).toBeInTheDocument();
    expect(
      screen.getAllByPlaceholderText(/enter a city/i).length
    ).toBeGreaterThan(0);
  });
});
