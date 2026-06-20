import { test, expect } from '@playwright/test';

test.describe('Auth Login Flow', () => {
  test('should display login page and perform validations', async ({ page }) => {
    // Navigate to login page
    await page.goto('/auth/login');

    // Check title and labels
    await expect(page.locator('text=Welcome back')).toBeVisible();
    await expect(page.locator('label[for="login-email"]')).toBeVisible();
    await expect(page.locator('label[for="login-password"]')).toBeVisible();

    // Check submit button is visible
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();

    // Fill in invalid credentials
    await page.fill('#login-email', 'invalid-email-format');
    await page.fill('#login-password', 'short');
    await submitButton.click();

    // Expect validation errors
    await expect(page.locator('text=Please enter a valid email address').first()).toBeVisible();

    // Clear and fill with valid-looking but incorrect credentials
    await page.fill('#login-email', 'nonexistent@careerforge.com');
    await page.fill('#login-password', 'WrongPassword123');
    await submitButton.click();

    // Expect server error message banner
    await expect(page.locator('role=alert')).toBeVisible();
    await expect(page.locator('text=Incorrect email or password')).toBeVisible();
  });
});
