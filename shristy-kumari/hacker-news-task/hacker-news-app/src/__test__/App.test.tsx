import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import App from "../App";

vi.mock("../Components/Header", () => ({
	default: () => <header>Mock Header</header>,
}));

vi.mock("../Components/Footer", () => ({
	default: () => <footer>Mock Footer</footer>,
}));

vi.mock("../Components/StoryCardsComponent", () => ({
	default: () => <div>Mock StoryCardsContainer</div>,
}));

describe("App component", () => {
	test("renders without crashing and displays all main components", () => {
		render(<App />);

		expect(screen.getByText("Mock Header")).toBeInTheDocument();
		expect(screen.getByText("Mock Footer")).toBeInTheDocument();
		expect(screen.getByText("Mock StoryCardsContainer")).toBeInTheDocument();
	});
});
