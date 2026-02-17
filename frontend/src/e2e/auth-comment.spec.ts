import { test, expect } from '@playwright/test';

test('user can login, open a video and post a comment', async ({ page }) => {
  const username = 'testuser';
  const email = 'test@example.com';
  const password = 'password';
  const commentText = `E2E comment ${Date.now()}`;

  await test.step('user logs in', async () => {
    await page.goto('/login');

    await page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

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
