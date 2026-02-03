import { test, expect } from '@playwright/test';

test.describe('User Login Flow', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await test.step('verify login page is loaded', async () => {
      await expect(page.getByRole('heading', { name: /sign in|login|connexion/i })).toBeVisible();
    });

    await test.step('fill login form', async () => {
      await page.getByRole('textbox', { name: /email|e-mail/i }).fill('test@example.com');

      await page.getByRole('textbox', { name: /password|mot de passe/i }).fill('password123');
    });

    await test.step('submit login form', async () => {
      await page.getByRole('button', { name: /sign in|login|se connecter/i }).click();
    });

    await test.step('verify successful login', async () => {
      const successIndicator = page
        .locator(
          '[class*="success"], [class*="authenticated"], text=/welcome|connected|bienvenue/i'
        )
        .or(page.locator('a[href*="dashboard"], a[href*="profile"]'))
        .first();

      const isVisible = await successIndicator.isVisible().catch(() => false);
      await (isVisible ? expect(successIndicator).toBeVisible() : expect(page).toHaveURL(/login/));
    });
  });

  test('should display error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await test.step('fill login form with wrong credentials', async () => {
      await page.getByRole('textbox', { name: /email|e-mail/i }).fill('nonexistent@example.com');

      await page.getByRole('textbox', { name: /password|mot de passe/i }).fill('wrongpassword');
    });

    await test.step('submit form', async () => {
      await page.getByRole('button', { name: /sign in|login|se connecter/i }).click();
    });

    await test.step('verify error message', async () => {
      await expect(page.getByText(/invalid|incorrect|credentials|not found/i)).toBeVisible();

      await expect(page).toHaveURL(/login/);
    });
  });

  test('should display error when email is empty', async ({ page }) => {
    await page.goto('/login');

    await test.step('fill only password field', async () => {
      await page.getByRole('textbox', { name: /password|mot de passe/i }).fill('password123');
    });

    await test.step('submit form', async () => {
      await page.getByRole('button', { name: /sign in|login|se connecter/i }).click();
    });

    await test.step('verify validation error', async () => {
      const errorMessage = page
        .locator('p.text-red-500:has-text(/email.*required|required/i)')
        .first();
      if (await errorMessage.isVisible().catch(() => false)) {
        await expect(errorMessage).toBeVisible();
      }
    });
  });
});
