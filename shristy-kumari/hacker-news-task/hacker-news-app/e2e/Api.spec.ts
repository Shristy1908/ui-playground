import { test, expect } from '@playwright/test';

test.describe('StoryCard Component', () => {
  test('renders a story card with title, description, and meta info', async ({ page }) => {
    // Intercept the API call and return mocked story data
    await page.route('**/item/*.json', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 123,
          title: 'Mocked Hacker News Title',
          text: 'Mocked story content for testing.',
          time: Math.floor(Date.now() / 1000) - 60 * 5, // 5 minutes ago
          descendants: 12,
          url: 'https://example.com',
        }),
      });
    });

    // Intercept story list (e.g. newstories) as well
    await page.route('**/newstories.json', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([123]), // return our mocked ID
      });
    });

    // Visit root path to trigger the fetch
    await page.goto('/');

    // Wait for story card to load
    const storyCard = page.locator('.story-card').first();

    await expect(storyCard.locator('.story-title')).toBeVisible();
    await expect(storyCard.locator('.story-title')).toHaveText('Mocked Hacker News Title');

    await expect(storyCard.locator('.story-description')).toBeVisible();
    await expect(storyCard.locator('.meta-item')).toHaveCount(2);
    await expect(storyCard).toHaveAttribute('href', 'https://example.com');
  });
});
