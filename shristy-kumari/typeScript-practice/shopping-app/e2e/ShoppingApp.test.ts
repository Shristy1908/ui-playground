import { test, expect } from "@playwright/test";

test.describe("Shopping Cart App E2E", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	// App - General Behavior
	test("loads and displays products", async ({ page }) => {
		await expect(page.getByText(/Shopping Cart/i)).toBeVisible();
		await expect(page.getByRole("textbox", { name: /search/i })).toBeVisible();
		const productCount = await page.locator(".product-card").count();
		expect(productCount).toBeGreaterThan(0);
	});

	// Navbar
	test("Navbar displays logo and toggles cart", async ({ page }) => {
		await expect(page.locator(".logo")).toBeVisible();
		await expect(page.getByText("SHOPPING CART")).toBeVisible();

		await page.locator("button.add-to-cart").first().click();
		await page.locator(".cart-icon").click();
		await expect(page.locator(".cart-dropdown")).toBeVisible();
		await expect(page.locator(".cart-item")).toHaveCount(1);
	});

// Sidebar - Category Filter
test("filters products by category", async ({ page }) => {
	await page.getByLabel("Electronics").check();
	const productCards = page.locator(".product-card");
	const productCount = await productCards.count();
	expect(productCount).toBeGreaterThan(0);
  
	// Check that each visible product card contains the 'Electronics' category
	for (let i = 0; i < productCount; i++) {
	  const categoryText = await productCards.nth(i).locator(".product-category").textContent();
	  expect(categoryText).toMatch(/Electronics/i);
	}
  });
  
	// Sidebar - Price Filter
	test("filters products by price", async ({ page }) => {
		await page.getByLabel("Under $50").check();
		const prices = await page.locator(".product-price").allTextContents();
		for (const price of prices) {
			const num = parseFloat(price.replace("$", ""));
			expect(num).toBeLessThanOrEqual(50);
		}
	});

	//Sidebar - Rating Filter
	test("filters products by rating", async ({ page }) => {
		// Locate the first rating radio input (4 stars & up)
		const ratingInputs = await page.locator('input[name="rating"]');
		await ratingInputs.nth(0).check(); // index 0 is for 4 stars
		await page.waitForTimeout(1500);
	  
		const products = await page.locator(".product-card");
		const productCount = await products.count();
		expect(productCount).toBeGreaterThan(0);
	  });
	  
	  // Sidebar - Clear Filters
	  test("clears all filters", async ({ page }) => {
		const clearButton = await page.getByRole("button", { name: /clear filters/i });
		await expect(clearButton).toBeVisible();
		await clearButton.click();
	  
		await page.waitForTimeout(1000);
		const products = await page.locator(".product-card");
		const count = await products.count();
		expect(count).toBeGreaterThan(0); // Use plain expect here
	  });

	// Search
	test("search filters product list", async ({ page }) => {
		const searchInput = await page.getByRole("textbox", { name: /search/i });
		await searchInput.fill("ssd");
	  
		await page.waitForTimeout(1500); // wait for results to update
	  
		const productCards = await page.locator(".product-card");
		const count = await productCards.count();
		console.log("Search result count:", count);
	  
		for (let i = 0; i < count; i++) {
		  const name = await productCards.nth(i).locator(".product-name").textContent();
		  console.log("Product name:", name);
		  expect(name?.toLowerCase()).toContain("ssd");
		}
	  });
	   
	  
	// ProductCard - Add to Cart
	test("adds item to cart", async ({ page }) => {
		await page.locator("button.add-to-cart").first().click();
		await expect(page.locator(".cart-count")).toHaveText("1");

		await page.locator("button.add-to-cart").first().click();
		await expect(page.locator(".cart-count")).toHaveText("2");

		await page.locator(".cart-icon").click();
		await expect(page.locator(".cart-dropdown")).toContainText("Quantity: 2");
	});

	// ProductCard - Renders Details
	test("product card displays full product info", async ({ page }) => {
		const product = page.locator(".product-card").first();
		await expect(product.locator(".product-name")).toBeVisible();
		await expect(product.locator(".product-description")).toBeVisible();
		await expect(product.locator(".product-price")).toBeVisible();
		await expect(product.locator("button.buy-now")).toBeVisible();
		await expect(product.locator("button.add-to-cart")).toBeVisible();
	});
});
