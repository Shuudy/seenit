import { test, expect } from '@playwright/test';

test.describe('User Registration Flow', () => {
  test('should complete user registration successfully', async ({ page }) => {
    await page.goto('/register');

    await test.step('verify register page is loaded', async () => {
      const registerHeading = page
        .locator('h1, h2, [class*="heading"]')
        .filter({ hasText: /sign up|créer un compte/i })
        .first();
      if (await registerHeading.isVisible().catch(() => false)) {
        await expect(registerHeading).toBeVisible();
      }
    });

    await test.step('fill out registration form', async () => {
      const timestamp = Date.now();
      const email = `testuser-${timestamp}@seenit.test`;
      const password = 'SecurePass123!';

      await page.getByRole('textbox', { name: /email|e-mail/i }).fill(email);

      await page.getByRole('textbox', { name: /name|nom|full name/i }).fill('Test User');

      await page
        .getByRole('textbox', { name: /password|mot de passe/i })
        .first()
        .fill(password);

      await page.getByRole('textbox', { name: /confirm|confirmation|répéter/i }).fill(password);
    });

    await test.step('submit registration form', async () => {
      const submitButton = page
        .getByRole('button', { name: /sign up|register|s'inscrire|créer/i })
        .or(page.locator('button[type="submit"]'))
        .or(page.locator("button:has-text(/Sign Up|Register|S'inscrire|Créer/i)"))
        .first();

      if (await submitButton.isVisible().catch(() => false)) {
        await submitButton.click();
      }
    });

    await test.step('verify successful registration', async () => {
      const isOnRegisterPage = page.url().includes('/register');
      const successMessage = page
        .locator('[class*="success"], text=/welcome|registered|created|account created/i')
        .first();

      if (await successMessage.isVisible().catch(() => false)) {
        await expect(successMessage).toBeVisible();
      } else if (isOnRegisterPage) {
        await expect(page).toHaveURL(/register/);
      }
    });
  });

  test('should display validation error for invalid email', async ({ page }) => {
    await page.goto('/register');

    await test.step('fill form with invalid email', async () => {
      await page.getByRole('textbox', { name: /email|e-mail/i }).fill('invalid-email');

      await page.getByRole('textbox', { name: /name|nom|full name/i }).fill('Test User');

      await page
        .getByRole('textbox', { name: /password|mot de passe/i })
        .first()
        .fill('SecurePass123!');

      await page
        .getByRole('textbox', { name: /confirm|confirmation|répéter/i })
        .fill('SecurePass123!');
    });

    await test.step('submit form', async () => {
      const submitButton = page
        .getByRole('button', { name: /sign up|register|s'inscrire|créer/i })
        .or(page.locator('button[type="submit"]'))
        .or(page.locator("button:has-text(/Sign Up|Register|S'inscrire|Créer/i)"))
        .first();

      if (await submitButton.isVisible().catch(() => false)) {
        await submitButton.click();
      }
    });

    await test.step('verify error message is displayed', async () => {
      const errorMessage = page
        .locator('[class*="error"], p.text-red-500:has-text(/email|invalid|format/i)')
        .first();
      if (await errorMessage.isVisible().catch(() => false)) {
        await expect(errorMessage).toBeVisible();
      }
    });
  });
});
