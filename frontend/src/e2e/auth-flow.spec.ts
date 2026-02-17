import { test, expect } from '@playwright/test';

test('should allow a new user to complete full auth flow', async ({ page }) => {
  const ts = Date.now();
  const username = `e2euser${ts}`;
  const email = `e2e+${ts}@example.com`;
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
    await page.getByRole('button', { name: username }).click();

    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    await page.getByRole('button', { name: 'Logout' }).click();
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
