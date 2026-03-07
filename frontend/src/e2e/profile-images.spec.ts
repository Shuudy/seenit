import { test, expect } from '@playwright/test';

const tinyPng = {
  name: 'tiny.png',
  mimeType: 'image/png',
  buffer: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=',
    'base64'
  ),
};

test('user can register and update profile images', async ({ page }) => {
  const ts = Date.now();
  const username = `e2euser${ts}`;
  const email = `e2e+${ts}@example.com`;
  const password = 'Password123!';
  let initialBannerSource: string | undefined;
  let initialAvatarSource: string | undefined;

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

  await test.step('open dashboard profile tab', async () => {
    await page.goto('/dashboard');

    // Check that the profile tab is visible
    await expect(page.getByRole('button', { name: 'Profile', exact: true })).toBeVisible();
  });

  await test.step('upload banner and avatar', async () => {
    const bannerImg = page.getByRole('img', { name: 'Banner' });
    const avatarImg = page.getByRole('img', { name: 'Profile picture' });

    initialBannerSource = (await bannerImg.getAttribute('src')) ?? undefined;
    initialAvatarSource = (await avatarImg.getAttribute('src')) ?? undefined;

    await page.getByLabel('Edit').nth(0).setInputFiles(tinyPng);
    await expect(bannerImg).not.toHaveAttribute('src', initialBannerSource ?? '');

    await page.getByLabel('Edit').nth(1).setInputFiles(tinyPng);
    await expect(avatarImg).not.toHaveAttribute('src', initialAvatarSource ?? '');

    const saveButton = page.getByRole('button', { name: 'Save profile images' });
    await saveButton.click();

    await expect(saveButton).toBeEnabled();
  });

  await test.step('verify profile images persist after reload', async () => {
    const bannerImg = page.getByRole('img', { name: 'Banner' });
    const avatarImg = page.getByRole('img', { name: 'Profile picture' });

    await page.reload();

    await expect(bannerImg).not.toHaveAttribute('src', initialBannerSource ?? '');
    await expect(avatarImg).not.toHaveAttribute('src', initialAvatarSource ?? '');
  });
});
