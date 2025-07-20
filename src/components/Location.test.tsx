import { screen, render } from "@testing-library/react";
import Location from "./Location";

describe("Location Component", () => {
  const mockedSelectedCity = "New York, NY, USA";

  test("renders location details", () => {
    render(<Location selectedCity={mockedSelectedCity} />);
    const location = screen.getByTestId("location");
    expect(location).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  test("renders the location component even when selectedCity is empty", () => {
    render(<Location selectedCity={""} />);
    const container = screen.queryByTestId("location");
    expect(container).toBeInTheDocument();
  });
  test("renders default city when selectedCity is empty", () => {
    render(<Location selectedCity={""} />);
    expect(screen.getByText("London")).toBeInTheDocument();
  });
});
