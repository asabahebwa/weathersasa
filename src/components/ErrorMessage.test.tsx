import { screen, render } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("Error Message Component", () => {
  const mockText = "Network error occurred";

  test("renders error container", () => {
    render(<ErrorMessage text={mockText} />);
    const errorContainer = screen.getByTestId("error-container");
    expect(errorContainer).toBeInTheDocument();
  });

  test("renders error message with provided text", () => {
    render(<ErrorMessage text={mockText} />);
    const errorMessage = screen.getByText(
      "Sorry, we failed to load weather data."
    );
    expect(errorMessage).toBeInTheDocument();
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });
});
