import { test, expect } from "@playwright/test";

test.describe("Hacker News App E2E", () => {
	test("should render UI components and handle interactions correctly", async ({
		page,
	}) => {
		// ─────────────────────────────────────────────
		// Header Component
		// ─────────────────────────────────────────────
		await page.goto("/");
		const header = page.locator("header.header");
		await expect(header).toBeVisible();

		const heading = page.locator("header.header h1");
		await expect(heading).toContainText("Hacker");
		await expect(heading).toContainText("News");

		// ─────────────────────────────────────────────
		// Footer Component
		// ─────────────────────────────────────────────
		const footer = page.locator("footer.footer");
		await expect(footer).toBeVisible();
		await expect(footer.locator("h2")).toHaveText("HACKERNEWS.");

		// ─────────────────────────────────────────────
		// StoryCard Component (real data)
		// ─────────────────────────────────────────────
		await page.locator(".spinner").waitFor({ state: "hidden" });
		const storyCard = page.locator(".story-card").first();
		await expect(storyCard).toBeVisible();
		await expect(storyCard.locator(".story-title")).toBeVisible();
		await expect(storyCard.locator(".story-description")).toBeVisible();
		await expect(storyCard.locator(".meta-item")).toHaveCount(2);

		// ─────────────────────────────────────────────
		// Tabs - Switch from New to Past
		// ─────────────────────────────────────────────
		const initialTitles = await page.locator(".story-title").allTextContents();

		await page.getByRole("button", { name: "Past" }).click();
		await page.locator(".spinner").waitFor({ state: "hidden" });
		const newTitles = await page.locator(".story-title").allTextContents();

		expect(newTitles.join()).not.toBe(initialTitles.join());

		// ─────────────────────────────────────────────
		// Click on StoryCard → navigates to story URL
		// ─────────────────────────────────────────────
		const [newPage] = await Promise.all([
			page.context().waitForEvent("page"), 
			page.locator(".story-card").first().click(), 
		]);

		await newPage.waitForLoadState();
		expect(newPage.url()).toContain("http"); 
		await newPage.close(); 

		// ─────────────────────────────────────────────
		// "Load More" functionality
		// ─────────────────────────────────────────────
		const initialCount = await page.locator(".story-card").count();
		await page.getByRole("button", { name: /Load More/i }).click();
		await page.locator(".spinner").waitFor({ state: "hidden" });
		await page.waitForTimeout(1000);
		const newCount = await page.locator(".story-card").count();
		console.log(`Initial: ${initialCount}, After Load More: ${newCount}`);
		expect(newCount).toBeGreaterThan(initialCount);

		// ─────────────────────────────────────────────
		// StoryCard with Mocked Data
		// ─────────────────────────────────────────────
		await page.route("**/item/*.json", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify({
					id: 123,
					title: "Mocked Hacker News Title",
					text: "Mocked story content for testing.",
					time: Math.floor(Date.now() / 1000) - 60 * 5,
					descendants: 12,
					url: "https://example.com",
				}),
			});
		});

		await page.route("**/newstories.json", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify([123]),
			});
		});

		await page.goto("/");
		await page.locator(".spinner").waitFor({ state: "hidden" });

		await expect(page.locator(".story-title")).toHaveText(
			"Mocked Hacker News Title"
		);
		await expect(page.locator(".story-description")).toBeVisible();
		await expect(page.locator(".meta-item")).toHaveCount(2);
		await expect(page.locator(".story-card")).toHaveAttribute(
			"href",
			"https://example.com"
		);
	});
});
