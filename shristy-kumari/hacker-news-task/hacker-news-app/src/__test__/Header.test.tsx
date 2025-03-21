import { render, screen } from "@testing-library/react";
import Header from "../Components/Header";

describe("Header Component", () => {
  test("renders the header element", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  test("renders 'HACKER' inside a span with class 'brand-text'", () => {
    render(<Header />);
    const hackerSpan = screen.getByText("HACKER");
    expect(hackerSpan).toBeInTheDocument();
    expect(hackerSpan).toHaveClass("brand-text");
  });

  test("renders 'NEWS' directly after 'HACKER'", () => {
    render(<Header />);
    const news = screen.getByText("NEWS");
    expect(news).toBeInTheDocument();
  });

  test("renders '.' inside a span with class 'brand-text'", () => {
    render(<Header />);
    const dot = screen.getByText(".");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass("brand-text");
  });
});
