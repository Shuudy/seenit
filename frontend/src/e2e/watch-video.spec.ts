import { test, expect } from '@playwright/test';

test.describe('Watch Video - Critical User Journey', () => {
  test('should view a video and see video details', async ({ page }) => {
    await page.goto('/');

    await test.step('navigate to home page and find video', async () => {
      await page.waitForLoadState('networkidle');

      const videoLink = page.locator('a[href^="/watch/"]').first();
      await videoLink.scrollIntoViewIfNeeded();
      await expect(videoLink).toBeVisible();
    });

    await test.step('click on video to watch', async () => {
      await page.locator('a[href^="/watch/"]').first().click();
    });

    await test.step('verify video page is loaded', async () => {
      await expect(page).toHaveURL(/\/watch\/\d+/);

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      const videoPlayer = page.locator('div[class*="aspect-video"]').first();
      await expect(videoPlayer).toBeVisible();

      const videoImage = page.locator('img[alt]').first();
      await expect(videoImage).toBeVisible();
    });

    await test.step('verify video metadata is displayed', async () => {
      await expect(page.getByText(/views/i).first()).toBeVisible();

      await expect(page.locator('a[href^="/channel/"]').first()).toBeVisible();
    });
  });

  test('should display related videos', async ({ page }) => {
    await page.goto('/');

    await test.step('navigate to a video', async () => {
      await page.locator('a[href^="/watch/"]').first().click();
    });

    await test.step('verify related videos are displayed', async () => {
      await expect(page).toHaveURL(/\/watch\/\d+/);

      const recommendationsHeading = page.getByText(/recommendations/i);
      await expect(recommendationsHeading).toBeVisible();
    });
  });

  test('should track video view count', async ({ page }) => {
    await page.goto('/');

    await test.step('click on video', async () => {
      await page.locator('a[href^="/watch/"]').first().click();
    });

    await test.step('verify video is being watched', async () => {
      await expect(page).toHaveURL(/\/watch\/\d+/);

      await page.waitForTimeout(2000);

      await expect(page.getByText(/views/i).first()).toBeVisible();
    });
  });
});
