import { test, expect } from '@playwright/test';

test('home page search with no results', async ({ page }) => {
  await page.goto('/');

  await test.step('view videos on home page', async () => {
    await expect(page.locator('a[href^="/watch/"]').first()).toBeVisible();
  });

  await test.step('search for a video', async () => {
    await page.getByRole('textbox', { name: /search/i }).fill('the');
    await page.getByRole('textbox', { name: /search/i }).press('Enter');
  });

  await test.step('view search results', async () => {
    await expect(page).toHaveURL(/q=the/);

    await expect(page.getByText('No results for "the"')).toBeVisible();
    await expect(page.getByText('Try another search or explore our categories.')).toBeVisible();
  });
});
