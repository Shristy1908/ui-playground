import { test, expect } from "@playwright/test";

test.describe("Shopping Cart App", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:5173/"); 
	});

	test("should load and display products", async ({ page }) => {
		const productCount = await page.locator(".product-card").count();
		expect(productCount).toBeGreaterThan(0);
	});

	test("should filter by category", async ({ page }) => {
		await page.getByLabel("Electronics").check();
		const categories = await page.locator(".product-type").allTextContents();
		expect(categories.every((text) => /Electronics/i.test(text))).toBe(true);
	});

	test("should filter by price range", async ({ page }) => {
		await page.getByLabel("Under $50").check();
		const prices = await page.locator(".product-price").allTextContents();
		prices.forEach((price) => {
			const amount = parseFloat(price.replace("$", ""));
			expect(amount).toBeLessThanOrEqual(50);
		});
	});

	test("should filter by rating", async ({ page }) => {
		await page.getByLabel(/4.*Up/i).check();
		const ratingStars = await page.locator(".product-rating .stars").allTextContents();
		expect(ratingStars.length).toBeGreaterThan(0); 
	});

	test("should search for a product", async ({ page }) => {
		await page.getByPlaceholder("Search products...").fill("bag");
		const titles = await page.locator(".product-name").allTextContents();
		expect(titles.some((title) => /bag/i.test(title))).toBe(true);
	});

	test("should clear filters", async ({ page }) => {
		await page.getByLabel("Jewelry").check();
		await page.getByText("Clear Filters").click();
		const selectedCategory = await page.getByLabel("All Categories").isChecked();
		expect(selectedCategory).toBe(true);
	});

	test("should add item to cart and reflect in cart icon", async ({ page }) => {
		await page.locator(".add-to-cart").first().click();
		const cartCount = await page.locator(".cart-count").textContent();
		expect(parseInt(cartCount!)).toBe(1);
	});

	test("should open cart dropdown and show added item", async ({ page }) => {
		await page.locator(".add-to-cart").first().click();
		await page.locator(".cart-icon").click();
		await expect(page.locator(".cart-dropdown")).toBeVisible();
		await expect(page.locator(".cart-item")).toHaveCount(1);
	});
});
