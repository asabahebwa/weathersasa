import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader Component", () => {
  test("renders loading message", () => {
    render(<Loader />);
    const loadingMessage = screen.getByText(/Loading weather data.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  test("renders loading container", () => {
    render(<Loader />);
    const loadingContainer = screen.getByTestId("loading-container");
    expect(loadingContainer).toBeInTheDocument();
  });
});
