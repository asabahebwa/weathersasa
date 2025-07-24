import { render, screen } from "@testing-library/react";
import MenuBar from "./MenuBar";

describe("MenuBar Component", () => {
  beforeEach(() => {
    render(<MenuBar />);
  });

  test("renders the menu bar container", () => {
    expect(screen.getByTestId("menu-bar-container")).toBeInTheDocument();
  });

  test("renders the sign in text", () => {
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  test("renders the logo with correct classes", () => {
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("logo");
  });

  test("renders nav links", () => {
    expect(screen.getAllByText("Home")).toHaveLength(2);
    expect(screen.getAllByText("Blog")).toHaveLength(2);
    expect(screen.getAllByText("Visualizations")).toHaveLength(2);
    expect(screen.getAllByText("Contact")).toHaveLength(2);
  });

  test("renders all social icons with correct labels", () => {
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Threads")).toBeInTheDocument();
    expect(screen.getByLabelText("xTwitter")).toBeInTheDocument();
  });
});
