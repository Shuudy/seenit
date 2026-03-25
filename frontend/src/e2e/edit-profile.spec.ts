import { test, expect } from '@playwright/test';
import { uniqueId } from '@/e2e/utilities';

test('user can register, update profile, and see changes persist', async ({ page }) => {
  const id = uniqueId();
  const username = `e2euser_${id}`;
  const email = `e2e+${id}@example.com`;
  const password = 'Password123!';

  const updatedUsername = `e2e_updated_${id}`;
  const updatedEmail = `e2e_updated+${id}@example.com`;
  const updatedBio = `Updated bio ${id}`;

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

    // Check that the profile tab is visible
    await expect(page.getByRole('button', { name: 'Profile', exact: true })).toBeVisible();

    await page.getByRole('textbox', { name: 'Username' }).fill(updatedUsername);
    await page.getByRole('textbox', { name: 'Email' }).fill(updatedEmail);
    await page.getByRole('textbox', { name: 'Bio' }).fill(updatedBio);

    const saveButton = page.getByRole('button', { name: 'Save profile', exact: true });
    await saveButton.click();

    // Check for success toast message
    await expect(
      page.getByRole('alert').filter({ hasText: 'Your profile has been updated successfully.' })
    ).toBeVisible();

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
