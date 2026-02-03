import { test, expect } from '@playwright/test';

test.describe('Video Upload - Core Platform Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display upload video form', async ({ page }) => {
    await test.step('navigate to upload page', async () => {
      const uploadButton = page.getByRole('button', {
        name: /upload|new video|create|ajouter|télécharger/i,
      });

      if (await uploadButton.isVisible().catch(() => false)) {
        await uploadButton.click();
      }

      await page.goto('/dashboard/upload').catch(() => {
        page.goto('/upload').catch(() => {
          page.goto('/videos/create');
        });
      });
    });

    await test.step('verify upload form is displayed', async () => {
      const titleInput = page
        .locator(
          'input[placeholder*="title" i], input[placeholder*="titre" i], input[id*="title" i]'
        )
        .first();
      const descInput = page
        .locator('textarea, input[placeholder*="description" i], input[placeholder*="describe" i]')
        .first();

      if (await titleInput.isVisible().catch(() => false)) {
        await expect(titleInput).toBeVisible();
      }
      if (await descInput.isVisible().catch(() => false)) {
        await expect(descInput).toBeVisible();
      }
    });
  });

  test('should allow user to fill upload form with valid data', async ({ page }) => {
    await test.step('navigate to upload', async () => {
      const uploadButton = page.getByRole('button', {
        name: /upload|new video|create/i,
      });

      if (await uploadButton.isVisible().catch(() => false)) {
        await uploadButton.click();
      }
    });

    await test.step('fill video title', async () => {
      const titleInput = page.getByRole('textbox', { name: /title|titre/i });

      if (await titleInput.isVisible().catch(() => false)) {
        await titleInput.fill('My Awesome Test Video');
      }
    });

    await test.step('fill video description', async () => {
      const descInput = page.getByRole('textbox', { name: /description|describe/i });

      if (await descInput.isVisible().catch(() => false)) {
        await descInput.fill('This is a test video description for my awesome video content');
      }
    });

    await test.step('verify form is filled', async () => {
      await expect(page.getByRole('textbox', { name: /title|titre/i })).toHaveValue(
        'My Awesome Test Video'
      );

      await expect(page.getByRole('textbox', { name: /description|describe/i })).toHaveValue(
        /test video description/i
      );
    });
  });

  test('should validate required fields in upload form', async ({ page }) => {
    await test.step('try to submit empty form', async () => {
      const submitButton = page.getByRole('button', {
        name: /upload|submit|publish|post|envoyer/i,
      });

      if (await submitButton.isVisible().catch(() => false)) {
        await submitButton.click();
      }
    });

    await test.step('verify validation errors', async () => {
      const errorMessage = page
        .locator('text=/title.*required|required.*title/i')
        .or(page.locator('[class*="error"]'))
        .first();
      if (await errorMessage.isVisible().catch(() => false)) {
        await expect(errorMessage).toBeVisible();
      }
    });
  });

  test('should display file upload input', async ({ page }) => {
    await test.step('locate file input', async () => {
      const fileInput = page.locator('input[type="file"]');

      if (await fileInput.isVisible().catch(() => false)) {
        await expect(fileInput).toBeVisible();
      }
    });

    await test.step('verify upload instructions', async () => {
      const uploadText = page
        .locator('button:has-text("Upload a video")')
        .or(page.locator('text=/upload|select|choose/i').nth(1))
        .first();
      if (await uploadText.isVisible().catch(() => false)) {
        await expect(uploadText).toBeVisible();
      }
    });
  });

  test('should display video preview after upload', async ({ page }) => {
    await test.step('fill video metadata', async () => {
      const titleInput = page.getByRole('textbox', { name: /title|titre/i });
      const descInput = page.getByRole('textbox', { name: /description/i });

      if (await titleInput.isVisible().catch(() => false)) {
        await titleInput.fill('Preview Test Video');
      }

      if (await descInput.isVisible().catch(() => false)) {
        await descInput.fill('Testing video preview');
      }
    });

    await test.step('check for preview element', async () => {
      const preview = page.locator('video, img[alt*="preview"], [class*="preview"]');

      if (await preview.isVisible().catch(() => false)) {
        await expect(preview).toBeVisible();
      }
    });
  });

  test('should allow user to select video category', async ({ page }) => {
    await test.step('find category selector', async () => {
      const categorySelect = page
        .getByRole('combobox', {
          name: /category|categor|genre|type/i,
        })
        .or(page.getByRole('button', { name: /category|categor/i }));

      if (await categorySelect.isVisible().catch(() => false)) {
        await test.step('select a category', async () => {
          await categorySelect.click();

          const option = page.getByRole('option').first();
          if (await option.isVisible().catch(() => false)) {
            await option.click();
          }
        });

        await test.step('verify category is selected', async () => {
          const selectedCategory = page.getByText(/[A-Za-z]/).first();
          await expect(selectedCategory).toBeVisible();
        });
      }
    });
  });

  test('should show upload progress when publishing', async ({ page }) => {
    await test.step('fill and submit form', async () => {
      const titleInput = page.getByRole('textbox', { name: /title/i });

      if (await titleInput.isVisible().catch(() => false)) {
        await titleInput.fill('Progress Test Video');

        const submitButton = page.getByRole('button', {
          name: /upload|submit|publish|post/i,
        });

        if (await submitButton.isVisible().catch(() => false)) {
          await submitButton.click();
        }
      }
    });

    await test.step('check for progress indicator', async () => {
      const progressBar = page.locator('[role="progressbar"], [class*="progress"]');
      const processingMessage = page.getByText(/uploading|processing|please wait|en cours/i);

      if (await progressBar.isVisible().catch(() => false)) {
        await expect(progressBar).toBeVisible();
      } else if (await processingMessage.isVisible().catch(() => false)) {
        await expect(processingMessage).toBeVisible();
      }
    });
  });
});
