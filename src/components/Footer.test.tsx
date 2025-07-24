import { screen, render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test("renders footer container", () => {
    const footerContainer = screen.getByTestId("footer-container");
    expect(footerContainer).toBeInTheDocument();
  });

  test("renders brand logo and name", () => {
    expect(screen.getByText("weathersasa")).toHaveClass("brand-name");
    expect(screen.getByText("W")).toHaveClass("logo-w");
    expect(screen.getByText("S")).toHaveClass("logo-s");
  });

  test("renders brand slogan", () => {
    expect(
      screen.getByText("next-generation weather intelligence")
    ).toBeInTheDocument();
  });

  test("renders all social media icons with correct links", () => {
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(4);

    expect(links[0]).toHaveAttribute("href", "https://x.com");
    expect(links[0]).toHaveAccessibleName("xTwitter");

    expect(links[1]).toHaveAttribute("href", "https://facebook.com");
    expect(links[1]).toHaveAccessibleName("Facebook");

    expect(links[2]).toHaveAttribute("href", "https://instagram.com");
    expect(links[2]).toHaveAccessibleName("Instagram");

    expect(links[3]).toHaveAttribute("href", "https://bluesky.com");
    expect(links[3]).toHaveAccessibleName("Threads");
  });

  test("renders footer product & services section", () => {
    expect(
      screen.getByText("Products & Services")
    ).toBeInTheDocument();
    expect(screen.getByText("For Business")).toBeInTheDocument();
    expect(screen.getByText("Premium Subscription")).toBeInTheDocument();
  });

  test("renders footer 'More' section", () => {
    expect(screen.getByText("More")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
    expect(screen.getByText("Space and Astronomy")).toBeInTheDocument();
  });

  test("renders trademark and legal footer", () => {
    expect(
      screen.getByText(/© 2025 weathersasa, Inc./i)
    ).toBeInTheDocument();

    expect(screen.getByText("Terms of Use")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Cookie Policy")).toBeInTheDocument();
  });
});
