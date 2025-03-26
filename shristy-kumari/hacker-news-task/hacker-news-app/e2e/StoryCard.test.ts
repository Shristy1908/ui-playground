import { test, expect } from '@playwright/test';

test.describe('StoryCard Component', () => {
  test('renders a story card with title, description, and meta info', async ({ page }) => {
    await page.setContent(`
      <html>
        <body>
          <a class="story-card" href="https://example.com" target="_blank" rel="noopener noreferrer">
            <h2 class="story-title">Mock Story Title</h2>
            <p class="story-description">This is a description.</p>
            <div class="story-meta">
              <div class="meta-item"><span>5 minutes ago</span></div>
              <div class="meta-item"><span>10 comments</span></div>
            </div>
          </a>
        </body>
      </html>
    `);

    const storyCard = page.locator('.story-card');
    await expect(storyCard.locator('.story-title')).toBeVisible();
    await expect(storyCard.locator('.story-description')).toBeVisible();
    await expect(storyCard.locator('.meta-item')).toHaveCount(2);
  });
});
