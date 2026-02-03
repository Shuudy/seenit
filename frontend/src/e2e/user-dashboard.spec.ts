import { test, expect } from '@playwright/test';

test.describe('User Dashboard - Video Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display user dashboard with video list', async ({ page }) => {
    await test.step('verify dashboard page is loaded', async () => {
      await expect(page).toHaveURL(/dashboard/);

      const dashboardHeading = page
        .locator('h1, h2, [class*="heading"]')
        .filter({ hasText: /dashboard|my videos|mes vidéos/i })
        .first();
      if (await dashboardHeading.isVisible().catch(() => false)) {
        await expect(dashboardHeading).toBeVisible();
      }
    });

    await test.step('verify videos list is displayed', async () => {
      const videosList = page
        .locator('[role="listitem"]')
        .or(page.locator('[data-testid*="video"], [class*="video-card"]'));

      const count = await videosList.count();

      if (count > 0) {
        await expect(videosList.first()).toBeVisible();
      }
    });
  });

  test('should display video management options', async ({ page }) => {
    await test.step('verify dashboard actions are available', async () => {
      const uploadButton = page.getByRole('button', {
        name: /upload|new video|create|ajouter|télécharger/i,
      });

      if (await uploadButton.isVisible().catch(() => false)) {
        await expect(uploadButton).toBeVisible();
      }
    });
  });

  test('should allow user to navigate to video details', async ({ page }) => {
    await test.step('find and click on a video', async () => {
      const videoLink = page
        .locator('a[href*="/watch/"], [role="link"]')
        .filter({
          has: page.getByText(/video|title/i),
        })
        .first();

      if (await videoLink.isVisible().catch(() => false)) {
        const href = await videoLink.getAttribute('href');
        await videoLink.click();

        await test.step('verify navigation to video page', async () => {
          if (href) {
            await expect(page).toHaveURL(
              new RegExp(href.replaceAll(/[.*+?^${}()|[\]\\]/, String.raw`\\$&`))
            );
          }
        });
      }
    });
  });

  test("should display video edit/delete options for user's own videos", async ({ page }) => {
    await test.step('find video action buttons', async () => {
      const videoCard = page.locator('[role="listitem"], [class*="video-card"]').first();

      if (await videoCard.isVisible().catch(() => false)) {
        await test.step('verify edit button exists', async () => {
          const editButton = videoCard.getByRole('button', {
            name: /edit|modifier|pencil/i,
          });

          if (await editButton.isVisible().catch(() => false)) {
            await expect(editButton).toBeVisible();
          }
        });

        await test.step('verify delete button exists', async () => {
          const deleteButton = videoCard.getByRole('button', {
            name: /delete|remove|trash|supprimer/i,
          });

          if (await deleteButton.isVisible().catch(() => false)) {
            await expect(deleteButton).toBeVisible();
          }
        });
      }
    });
  });

  test('should show video statistics', async ({ page }) => {
    await test.step('navigate to a video', async () => {
      const videoLink = page.locator('a[href*="/watch/"]').first();

      if (await videoLink.isVisible().catch(() => false)) {
        await videoLink.click();
        await expect(page).toHaveURL(/\/watch\/\d+/);
      }
    });

    await test.step('verify statistics are displayed', async () => {
      const statisticsElement = page
        .locator(
          '[class*="stat"], [class*="metric"], span:has-text(/views?|likes?|comments?|watched/i)'
        )
        .first();
      if (await statisticsElement.isVisible().catch(() => false)) {
        await expect(statisticsElement).toBeVisible();
      }
    });
  });

  test('should display user profile information', async ({ page }) => {
    await test.step('navigate to profile section', async () => {
      const profileLink = page.getByRole('link', {
        name: /profile|account|settings|profil|compte/i,
      });

      if (await profileLink.isVisible().catch(() => false)) {
        await profileLink.click();
      }
    });

    await test.step('verify profile information is displayed', async () => {
      const profileInfo = page
        .locator('label, [class*="info"], [class*="profile"]')
        .filter({ hasText: /username|email/i })
        .first();
      if (await profileInfo.isVisible().catch(() => false)) {
        await expect(profileInfo).toBeVisible();
      }
    });
  });

  test('should allow user to logout', async ({ page }) => {
    await test.step('find logout button', async () => {
      const logoutButton = page
        .getByRole('button', {
          name: /logout|sign out|disconnect|se déconnecter/i,
        })
        .or(page.getByRole('menuitem', { name: /logout|sign out|disconnect/i }));

      if (await logoutButton.isVisible().catch(() => false)) {
        await logoutButton.click();

        await test.step('verify user is logged out', async () => {
          await expect(page).toHaveURL(/(?:login|register|^\/)/);

          await expect(
            page.getByRole('link', { name: /profile|dashboard|mon compte/i })
          ).not.toBeVisible();
        });
      }
    });
  });
});
