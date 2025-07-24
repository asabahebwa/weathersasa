import { render, screen } from "@testing-library/react";
import Location from "./Location";

describe("Location Component", () => {
  test("renders location component with correct city", () => {
    render(<Location selectedCity="New York, NY, USA" />);
    const container = screen.getByTestId("location");
    expect(container).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  test("renders default city 'London' when selectedCity is empty", () => {
    render(<Location selectedCity="" />);
    expect(screen.getByTestId("location")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
  });

  test("renders trimmed city correctly", () => {
    render(<Location selectedCity="  Tokyo , Japan" />);
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
  });
});
