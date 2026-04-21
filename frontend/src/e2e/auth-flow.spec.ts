import { test, expect } from '@playwright/test';

import { uniqueId } from '@/e2e/utilities';

test('should allow a new user to complete full auth flow', async ({ page }) => {
  const id = uniqueId();
  const username = `e2euser_${id}`;
  const email = `e2e+${id}@example.com`;
  const password = 'Password123!';

  await test.step('user registers a new account', async () => {
    await page.goto(`/register`);

    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
    await page.getByRole('textbox', { name: 'Confirm password' }).fill(password);

    await page.getByRole('button', { name: 'Create account' }).click();

    // Profile button
    await expect(page.getByRole('button', { name: username })).toBeVisible();
  });

  await test.step('user is logged in and can log out', async () => {
    // Click profile button to open dropdown
    const profileButton = page.getByRole('button', { name: username });
    await profileButton.click();

    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(profileButton).toBeHidden();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
  });

  await test.step('user can log back in with the new account', async () => {
    await page.goto(`/login`);
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Profile button
    await expect(page.getByRole('button', { name: username })).toBeVisible();
  });
});
