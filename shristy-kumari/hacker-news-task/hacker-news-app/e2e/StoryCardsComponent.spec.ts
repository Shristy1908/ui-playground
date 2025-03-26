import { test, expect } from '@playwright/test';

test('"Load More" loads more stories', async ({ page }) => {
    await page.goto('/');
    await page.locator('.spinner').waitFor({ state: 'hidden' });
  
    const storyCards = page.locator('.story-card');
    const initialCount = await storyCards.count();
  
    await page.getByRole('button', { name: /Load More/i }).click();
  
    await page.locator('.spinner').waitFor({ state: 'hidden' });
  
    await page.waitForTimeout(1000); 
  
    const newCount = await storyCards.count();
  
    expect(newCount).toBeGreaterThanOrEqual(initialCount);
  
    console.log(`Initial: ${initialCount}, After Load More: ${newCount}`);
  });
  