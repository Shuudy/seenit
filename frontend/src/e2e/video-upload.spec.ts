import { test, expect } from '@playwright/test';
import path from 'node:path';

import { uniqueId } from '@/e2e/utilities';

test('user can register and upload a video', async ({ page }) => {
  const id = uniqueId();
  const username = `e2euser_${id}`;
  const email = `e2e+${id}@example.com`;
  const password = 'Password123!';

  const videoTitle = `My E2E Video ${id}`;
  const videoDescription = `This is a test description for video ${id}`;
  // eslint-disable-next-line unicorn/prefer-module
  const videoPath = path.resolve(__dirname, 'fixtures/test-video.mp4');

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

  await test.step('navigate to upload form', async () => {
    await page.goto('/dashboard');

    await page.getByRole('button', { name: 'Upload a video', exact: true }).click();
  });

  await test.step('user fills out video upload form and submits', async () => {
    await page.getByRole('textbox', { name: 'Video title' }).fill(videoTitle);
    await page.getByRole('textbox', { name: 'Description' }).fill(videoDescription);

    await page.getByRole('button', { name: 'Video file' }).setInputFiles(videoPath);

    const uploadButton = page.getByRole('button', { name: 'Upload', exact: true });
    await uploadButton.click();

    // Check for success toast message
    await expect(
      page.getByRole('alert').filter({ hasText: 'The video has been uploaded successfully.' })
    ).toBeVisible();

    // Wait for the UI to settle: the button is disabled while saving
    await expect(uploadButton).toBeEnabled();
  });

  await test.step('verify uploaded video appears in video list', async () => {
    // Navigate back to the dashboard main page
    await page.goto('/');

    const uploadedVideoTitle = page.getByRole('heading', { name: videoTitle });
    await expect(uploadedVideoTitle).toBeVisible();
  });
});
