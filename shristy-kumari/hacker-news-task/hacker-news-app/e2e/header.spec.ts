// e2e/Header.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Header Component', () => {
  test('renders the header and displays correct title', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header.header');
    await expect(header).toBeVisible();

    const heading = page.getByRole('heading', { name: 'Hacker News.' });
    await expect(heading).toBeVisible();
  });
});
