import { screen, render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("renders footer container", () => {
    render(<Footer />);
    const footerContainer = screen.getByTestId("footer-container");
    expect(footerContainer).toBeInTheDocument();
  });
  test("renders brand name and slogan", () => {
    render(<Footer />);
    expect(screen.getByText("weathersasa")).toBeInTheDocument();
    expect(
      screen.getByText("next-generation weather intelligence")
    ).toBeInTheDocument();
  });

  test("renders social media icons with correct links", () => {
    render(<Footer />);
    const socialIcons = screen.getAllByRole("link");
    expect(socialIcons).toHaveLength(4);
    expect(socialIcons[0]).toHaveAttribute("href", "https://x.com");
    expect(socialIcons[1]).toHaveAttribute("href", "https://facebook.com");
    expect(socialIcons[2]).toHaveAttribute("href", "https://instagram.com");
    expect(socialIcons[3]).toHaveAttribute("href", "https://bluesky.com");
  });
  test("renders logo with correct classes", () => {
    render(<Footer />);
    const logo = screen.getByText("weathersasa");
    expect(logo).toHaveClass("brand-name");
    expect(screen.getByText("W")).toHaveClass("logo-w");
    expect(screen.getByText("S")).toHaveClass("logo-s");
  });
});
