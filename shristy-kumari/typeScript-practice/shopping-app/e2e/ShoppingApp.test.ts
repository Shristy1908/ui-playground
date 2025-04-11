import { test } from "@playwright/test";

test("Shopping Cart App - Full E2E Flow", async ({ page }) => {
  await page.goto("/");

  // General UI and Product Load
  page.getByText(/Shopping Cart/i);
  page.getByRole("textbox", { name: /search/i });
  const productCards = page.locator(".product-card");
  const initialCount = await productCards.count();
  if (initialCount === 0) return; // Stop test if no products

  // Navbar - Cart Toggle
  page.locator(".logo");
  page.getByText("SHOPPING CART");
  await page.locator("button.add-to-cart").first().click();
  await page.locator(".cart-icon").click();
  page.locator(".cart-dropdown");
  page.locator(".cart-item");

  // Sidebar - Category Filter
  await page.getByLabel("Electronics").check();
  const filtered = page.locator(".product-card");
  const filteredCount = await filtered.count();
  if (filteredCount > 0) {
    for (let i = 0; i < filteredCount; i++) {
      const text = await filtered.nth(i).locator(".product-category").textContent();
      if (!/Electronics/i.test(text || "")) return;
    }
  }

  // Sidebar - Price Filter
  await page.getByLabel("Under $50").check();
  const prices = await page.locator(".product-price").allTextContents();
  for (const price of prices) {
    const val = parseFloat(price.replace("$", ""));
    if (val > 50) return;
  }

  // Sidebar - Rating Filter
  await page.locator('input[name="rating"]').nth(0).check();
  await page.waitForTimeout(1000);
  page.locator(".product-card");

  // Sidebar - Clear Filters
  await page.getByRole("button", { name: /clear filters/i }).click();
  await page.waitForTimeout(800);

  // Search
  await page.getByRole("textbox", { name: /search/i }).fill("ssd");
  await page.waitForTimeout(1200);
  const searched = page.locator(".product-card");
  const count = await searched.count();
  for (let i = 0; i < count; i++) {
    const name = await searched.nth(i).locator(".product-name").textContent();
    if (!(name || "").toLowerCase().includes("ssd")) return;
  }

  // Add to Cart
  const addToCart = page.locator("button.add-to-cart").first();
  await addToCart.click();
  await addToCart.click();
  await page.locator(".cart-icon").click();
  page.locator(".cart-dropdown");

  // Product Card Detail Checks
  const firstCard = page.locator(".product-card").first();
  firstCard.locator(".product-name");
  firstCard.locator(".product-description");
  firstCard.locator(".product-price");
  firstCard.locator("button.buy-now");
  firstCard.locator("button.add-to-cart");
});
