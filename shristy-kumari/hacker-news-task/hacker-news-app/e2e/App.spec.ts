import { test, expect } from '@playwright/test';

test.describe('App Component', () => {
  test('renders header, story cards, and footer', async ({ page }) => {
    await page.goto('/');

    // Check header
    await expect(page.locator('header.header')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hacker News' })).toBeVisible();

    await page.locator('.spinner').waitFor({ state: 'hidden' });

    const storyCards = page.locator('.story-card');
    await expect(storyCards.first()).toBeVisible();

    const footer = page.locator('footer.footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('h2')).toHaveText('HACKERNEWS.');

  });

  test('switches between New and Past tabs correctly', async ({ page }) => {
    await page.goto('/');

    await page.locator('.spinner').waitFor({ state: 'hidden' });

    const initialTitles = await page.locator('.story-title').allTextContents();

    await page.getByRole('button', { name: 'Past' }).click();
    await page.locator('.spinner').waitFor({ state: 'hidden' });

    const newTitles = await page.locator('.story-title').allTextContents();

    expect(newTitles).not.toEqual(initialTitles);
  });

  test('"Load More" loads additional stories', async ({ page }) => {
    await page.goto('/');
    await page.locator('.spinner').waitFor({ state: 'hidden' });

    const initialCount = await page.locator('.story-card').count();

    const loadMoreBtn = page.getByRole('button', { name: /Load More/i });
    await loadMoreBtn.click();
    await page.waitForTimeout(2000);

    const newCount = await page.locator('.story-card').count();
    console.log(`Initial: ${initialCount}, After Load More: ${newCount}`);

    expect(newCount).toBeGreaterThan(initialCount);
  });
});
