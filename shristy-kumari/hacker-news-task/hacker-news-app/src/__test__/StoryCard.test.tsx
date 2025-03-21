import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import StoryCard from "../Components/StoryCard";
import { Story } from "../Utils/Types";
import * as TimeUtils from "../Utils/Times"; 

describe("StoryCard", () => {
	const mockStory: Story = {
		id: 1,
		title: "Test Story",
		url: "https://example.com/story",
		time: Date.now() / 1000,
		descendants: 5,
		by: "author",
		score: 100,
		type: "story",
		text: "This is a test story."
	};

	beforeEach(() => {
		// Mock getRelativeTime to return a fixed string
		vi.spyOn(TimeUtils, "getRelativeTime").mockReturnValue("2 hours ago");
	});

	test("renders story title, description, time and comments", () => {
		render(<StoryCard story={mockStory} />);

		expect(screen.getByText("Test Story")).toBeInTheDocument();
		expect(screen.getByText("This is a test story.")).toBeInTheDocument();
		expect(screen.getByText("2 hours ago")).toBeInTheDocument();
		expect(screen.getByText(/5 comments/)).toBeInTheDocument();

		const link = screen.getByRole("link", { name: /Test Story/i });
		expect(link).toHaveAttribute("href", "https://example.com/story");
		expect(link).toHaveAttribute("target", "_blank");
	});

	test("renders fallback description when text is missing", () => {
		const storyWithoutText = { ...mockStory, text: undefined };
		render(<StoryCard story={storyWithoutText} />);

		expect(screen.getByText("Visit the link to read more...")).toBeInTheDocument();
	});
});
