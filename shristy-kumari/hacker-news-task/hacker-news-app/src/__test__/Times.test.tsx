import { describe, it, expect } from "vitest";
import { getRelativeTime } from "../Utils/Times";

describe("getRelativeTime", () => {
	const now = Date.now();

	it("returns 'Just now' for less than 1 minute ago", () => {
		const timestamp = Math.floor((now - 10 * 1000) / 1000); // 10 seconds ago
		expect(getRelativeTime(timestamp)).toBe("Just now");
	});

	it("returns 'x minutes ago' for less than 60 minutes", () => {
		const timestamp = Math.floor((now - 5 * 60 * 1000) / 1000); // 5 minutes ago
		expect(getRelativeTime(timestamp)).toBe("5 mins ago");

		const timestampSingular = Math.floor((now - 60 * 1000) / 1000); // 1 minute ago
		expect(getRelativeTime(timestampSingular)).toBe("1 min ago");
	});

	it("returns 'x hours ago' for less than 24 hours", () => {
		const timestamp = Math.floor((now - 3 * 60 * 60 * 1000) / 1000); // 3 hours ago
		expect(getRelativeTime(timestamp)).toBe("3 hours ago");

		const timestampSingular = Math.floor((now - 60 * 60 * 1000) / 1000); // 1 hour ago
		expect(getRelativeTime(timestampSingular)).toBe("1 hour ago");
	});

	it("returns 'x days ago' for more than 24 hours", () => {
		const timestamp = Math.floor((now - 2 * 24 * 60 * 60 * 1000) / 1000); // 2 days ago
		expect(getRelativeTime(timestamp)).toBe("2 days ago");

		const timestampSingular = Math.floor((now - 24 * 60 * 60 * 1000) / 1000); // 1 day ago
		expect(getRelativeTime(timestampSingular)).toBe("1 day ago");
	});
});
