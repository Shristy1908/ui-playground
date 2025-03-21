import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import StoryCardsComponent from "../Components/StoryCardsComponent";
import { vi } from "vitest";
import * as Api from "../Utils/Api";

// Mock data
const mockStories = Array.from({ length: 10 }, (_, i) => ({
	id: i,
	title: `Test Story ${i + 1}`,
	url: `https://example.com/story${i + 1}`,
	score: 100,
	by: "testuser",
	time: Date.now(),
	descendants: 5,
	type: "story",
}));

const generateStories = (count: number) =>
	Array.from({ length: count }, (_, i) => ({
		id: i + 1,
		title: `Test Story ${i + 1}`,
		time: Date.now(),
		descendants: 5,
		url: `https://example.com/story${i + 1}`,
	}));

// Mock API methods
vi.mock("../Utils/Api", () => ({
	getNewStories: vi.fn(() => Promise.resolve(mockStories.map((s) => s.id))),
	getBestStories: vi.fn(() => Promise.resolve(mockStories.map((s) => s.id))),
	getStories: vi.fn((id: number) => Promise.resolve(mockStories[id])),
}));

describe("StoryCardsComponent", () => {
	test("renders loading spinner initially", async () => {
		render(<StoryCardsComponent />);
		// Check for spinner by class
		const spinner = document.querySelector(".spinner");
		expect(spinner).toBeInTheDocument();

		// Wait for spinner to disappear
		await waitFor(() => {
			expect(document.querySelector(".spinner")).not.toBeInTheDocument();
		});
	});
	test("renders a list of stories", async () => {
		render(<StoryCardsComponent />);
		await waitFor(() => {
			expect(screen.getByText("Test Story 1")).toBeInTheDocument();
		});
	});

	test("switches to past stories when 'Past' tab is clicked", async () => {
		render(<StoryCardsComponent />);
		const pastTab = screen.getByText("Past");
		fireEvent.click(pastTab);

		await waitFor(() => {
			expect(screen.getByText("Test Story 1")).toBeInTheDocument();
		});
	});

	test("loads more stories when 'Load More' is clicked", async () => {
		const mockStoryIds = [...Array(30).keys()].map((i) => i + 1);
		const mockStories = generateStories(30);

		vi.spyOn(Api, "getNewStories").mockResolvedValue(mockStoryIds);
		vi.spyOn(Api, "getStories").mockImplementation(
			async (id: number) => mockStories.find((story) => story.id === id)!
		);

		render(<StoryCardsComponent />);

		// Wait for initial 10 stories
		await waitFor(() => {
			const cards = document.querySelectorAll(".story-card");
			expect(cards.length).toBe(10);
		});

		const loadMoreBtn = screen.getByText(/Load More/i);
		fireEvent.click(loadMoreBtn);

		// Wait until 20 stories are rendered
		await waitFor(() => {
			const cards = document.querySelectorAll(".story-card");
			expect(cards.length).toBe(20);
		});

		// Optional: check that getStories was called 20 times
		expect(Api.getStories).toHaveBeenCalledTimes(20);
	});
});
