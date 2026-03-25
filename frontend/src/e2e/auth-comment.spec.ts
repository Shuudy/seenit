import { test, expect } from '@playwright/test';
import { uniqueId } from '@/e2e/utilities';

test('user can register, open a video and post a comment', async ({ page }) => {
  const id = uniqueId();
  const username = `e2euser_${id}`;
  const email = `e2e+${id}@example.com`;
  const password = 'Password123!';
  const commentText = `E2E comment ${id}`;

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

  let firstVideoTitle: string;

  await test.step('user opens the first video', async () => {
    const firstVideoHeading = page.getByRole('heading', { level: 3 }).first();

    // Get the video title before clicking
    const titleText = await firstVideoHeading.textContent();
    firstVideoTitle = titleText?.trim() ?? '';

    await firstVideoHeading.click();

    await expect(page.getByRole('heading', { name: firstVideoTitle })).toBeVisible();
  });

  await test.step('user posts a comment', async () => {
    const commentInput = page.getByRole('textbox', { name: 'Add a comment...' });
    await commentInput.fill(commentText);

    await page.getByRole('button', { name: 'Comment' }).click();

    const latestComment = page.getByRole('list').getByRole('listitem').first();
    await expect(latestComment.getByText(commentText)).toBeVisible();
    await expect(latestComment.getByRole('link', { name: username, exact: true })).toBeVisible();
  });
});
