import { test, expect } from '@playwright/test';

test('Footer component is visible and contains correct text', async ({ page }) => {
  await page.goto('/');

  const footer = page.locator('footer.footer');

  await expect(footer).toBeVisible();

  await expect(footer.locator('h2')).toHaveText('HACKERNEWS.');
});