import { screen, render } from "@testing-library/react";
import MenuBar from "./MenuBar";

describe("MenuBar Component", () => {
  test("renders the menu bar container", () => {
    render(<MenuBar />);
    expect(screen.getByTestId("menu-bar-container")).toBeInTheDocument();
  });
  test("renders the sign in text", () => {
    render(<MenuBar />);
    const signInText = screen.getByText("Sign in");
    expect(signInText).toBeInTheDocument();
  });
  test("renders the logo with correct classes", () => {
    render(<MenuBar />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("logo");
  });
});
