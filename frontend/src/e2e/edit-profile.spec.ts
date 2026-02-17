import { test, expect } from '@playwright/test';

test('user can register, update profile, and see changes persist', async ({ page }) => {
  const ts = Date.now();
  const username = `e2euser${ts}`;
  const email = `e2e+${ts}@example.com`;
  const password = 'Password123!';

  const updatedUsername = `e2e_updated_${ts}`;
  const updatedEmail = `e2e+${ts}@example.com`;
  const updatedBio = `Updated bio ${ts}`;

  await test.step('user registers a new account', async () => {
    await page.goto('/register');

    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
    await page.getByRole('textbox', { name: 'Confirm password' }).fill(password);

    await page.getByRole('button', { name: 'Create account' }).click();

    // Profile button
    await expect(page.getByRole('button', { name: username })).toBeVisible();
  });

  await test.step('user updates profile', async () => {
    await page.goto('/dashboard');

    await page.getByRole('textbox', { name: 'Username' }).fill(updatedUsername);
    await page.getByRole('textbox', { name: 'Email' }).fill(updatedEmail);
    await page.getByRole('textbox', { name: 'Bio' }).fill(updatedBio);

    const saveButton = page.getByRole('button', { name: 'Save' }).nth(1);
    await saveButton.click();

    // Wait for the UI to settle: the button is disabled while saving
    await expect(saveButton).toBeEnabled();
  });

  await test.step('verify profile changes persist', async () => {
    await page.reload();

    await expect(page.getByRole('textbox', { name: 'Username' })).toHaveValue(updatedUsername);
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(updatedEmail);
    await expect(page.getByRole('textbox', { name: 'Bio' })).toHaveValue(updatedBio);

    // Profile button
    await expect(page.getByRole('button', { name: updatedUsername })).toBeVisible();
  });
});
