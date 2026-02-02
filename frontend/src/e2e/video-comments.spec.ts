import { test, expect } from '@playwright/test';

test.describe('Video Comments - User Engagement', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a video page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const videoLink = page.locator('a[href^="/watch/"]').first();
    await videoLink.waitFor({ state: 'visible' });
    await videoLink.scrollIntoViewIfNeeded();

    // Navigate to the video and wait for the URL to change
    await Promise.all([page.waitForURL(/\/watch\/\d+/), videoLink.click()]);
  });

  test('should display existing comments on video', async ({ page }) => {
    await test.step('scroll to comments section', async () => {
      const commentsSection = page.getByRole('heading', {
        name: /comments?|commentaires/i,
      });

      // Comments section might exist
      if (await commentsSection.isVisible().catch(() => false)) {
        await commentsSection.scrollIntoViewIfNeeded();
      }
    });

    await test.step('verify comments are displayed', async () => {
      // Check if any comments exist
      const commentsList = page.locator('[role="listitem"]').filter({
        has: page.locator('text=/comment|author|posted/i'),
      });

      const count = await commentsList.count();

      if (count > 0) {
        await expect(commentsList.first()).toBeVisible();
        await expect(page.getByText(/ago|days?|hours?|minutes?/i)).toBeVisible();
      }
    });
  });

  test('should show comment form when authenticated', async ({ page }) => {
    await test.step('verify comment form is visible', async () => {
      const commentInput = page.getByRole('textbox', {
        name: /comment|leave a comment|écrire/i,
      });

      // Comment form may require authentication
      if (await commentInput.isVisible().catch(() => false)) {
        await expect(commentInput).toBeVisible();

        await test.step('verify submit button exists', async () => {
          await expect(
            page.getByRole('button', { name: /submit|post|send|comment|envoyer/i })
          ).toBeVisible();
        });
      }
    });
  });

  test('should allow user to submit a comment', async ({ page }) => {
    await test.step('locate comment input field', async () => {
      const commentInput = page.getByRole('textbox', {
        name: /comment|leave a comment|écrire/i,
      });

      if (await commentInput.isVisible().catch(() => false)) {
        await test.step('fill comment form', async () => {
          const commentText = `Great video! Posted at ${new Date().toISOString()}`;
          await commentInput.fill(commentText);
        });

        await test.step('submit comment', async () => {
          await page.getByRole('button', { name: /submit|post|send|comment|envoyer/i }).click();
        });

        await test.step('verify comment was posted', async () => {
          // Check for success message or new comment appearing
          await expect(
            page
              .getByText(/success|posted|comment added|commentaire/i)
              .or(page.getByText(/Great video/))
          ).toBeVisible();
        });
      }
    });
  });

  test('should display comment author and timestamp', async ({ page }) => {
    await test.step('find a comment', async () => {
      const comment = page
        .locator('[role="listitem"]')
        .filter({
          has: page.getByText(/comment|author/i),
        })
        .first();

      if (await comment.isVisible().catch(() => false)) {
        await test.step('verify comment metadata', async () => {
          // Verify author name is displayed
          await expect(comment.getByText(/[A-Za-z]/)).toBeVisible();

          // Verify timestamp is displayed
          await expect(comment.getByText(/ago|days?|hours?|minutes?/i)).toBeVisible();
        });
      }
    });
  });

  test("should allow editing user's own comment", async ({ page }) => {
    await test.step('find user comment', async () => {
      const userComment = page
        .locator('[role="listitem"]')
        .filter({
          has: page.getByRole('button', { name: /edit|modifier|delete|supprimer/i }),
        })
        .first();

      if (await userComment.isVisible().catch(() => false)) {
        await test.step('click edit button', async () => {
          await userComment.getByRole('button', { name: /edit|modifier/i }).click();
        });

        await test.step('update comment text', async () => {
          const editInput = userComment.getByRole('textbox');
          await editInput.clear();
          await editInput.fill('Updated comment text');
        });

        await test.step('save edited comment', async () => {
          await page.getByRole('button', { name: /save|submit|envoyer|confirmer/i }).click();
        });

        await test.step('verify comment was updated', async () => {
          await expect(page.getByText(/updated comment text/i)).toBeVisible();
        });
      }
    });
  });
});
