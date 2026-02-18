import { test, expect } from '@playwright/test';

test('toggles language and updates page translations', async ({ page }) => {
  await test.step('shows English translations by default', async () => {
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'EN', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Trending' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  });

  await test.step('switches to French and updates the UI', async () => {
    await page.getByRole('button', { name: 'EN', exact: true }).click();

    await expect(page.getByRole('button', { name: 'FR', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tous' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tendances' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Accueil' })).toBeVisible();
  });

  await test.step('persists the selected language across reloads', async () => {
    await page.reload();

    await expect(page.getByRole('button', { name: 'FR', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tous' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Accueil' })).toBeVisible();
  });
});
