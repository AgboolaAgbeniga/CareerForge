import { test, expect } from '@playwright/test';
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') });

test.describe('Recruiter End-to-End Flow', () => {
  const testEmail = `recruiter-${Date.now()}@gmail.com`;
  const testPassword = 'Password123!#';

  test('should register, complete onboarding, view candidate matches, and export report', async ({ page }) => {
    let registeredUserId = '';

    // Forward browser console logs to Node.js console
    page.on('console', msg => console.log(`[BROWSER LOG] [${msg.type()}] ${msg.text()}`));
    page.on('pageerror', err => console.error(`[BROWSER EXCEPTION] ${err.message}`));
    page.on('request', req => console.log(`[BROWSER REQUEST] [${req.method()}] ${req.url()}`));

    // Intercept Supabase Auth token request to bypass email verification check
    await page.route(/\/auth\/v1\/token/, async (route) => {
      const request = route.request();
      console.log(`[TEST STAGE] Intercepted Token Request: ${request.url()} (registeredUserId is "${registeredUserId}")`);
      if (registeredUserId) {
        console.log(`[TEST STAGE] Fulfilling token request with mock-token-${registeredUserId}`);
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            access_token: `mock-token-${registeredUserId}`,
            token_type: 'bearer',
            expires_in: 3600,
            refresh_token: 'mock-refresh-token',
            user: {
              id: registeredUserId,
              email: testEmail,
              role: 'authenticated'
            }
          })
        });
      } else {
        console.warn(`[TEST STAGE] WARNING: registeredUserId is empty during token request! Continuing to actual server...`);
        await route.continue();
      }
    });

    // 1. Sign Up
    await page.goto('/auth/signup');
    await page.click('label[id="role-recruiter-label"]');
    await page.fill('#signup-firstName', 'Sarah');
    await page.fill('#signup-lastName', 'Connor');
    await page.fill('#signup-email', testEmail);
    await page.fill('#signup-password', testPassword);
    await page.fill('#signup-confirmPassword', testPassword);
    
    // Submit
    await page.click('button[type="submit"]');

    // Expect signup success message
    await expect(page.locator('text=Account created!')).toBeVisible({ timeout: 10000 });

    // Query database to get the user ID for this email
    const dbClient = new Client({
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Jesuschrist@2@localhost:5432/careerforge'
    });
    await dbClient.connect();
    const dbRes = await dbClient.query('SELECT id FROM users WHERE email = $1', [testEmail]);
    registeredUserId = dbRes.rows[0]?.id || '';
    await dbClient.end();
    
    console.log(`[TEST STAGE] Queried database for ${testEmail}, found registeredUserId: ${registeredUserId}`);

    // Wait for redirect to login page
    await page.waitForURL('**/auth/login', { timeout: 10000 });

    // 2. Log In
    await page.fill('#login-email', testEmail);
    await page.fill('#login-password', testPassword);
    await page.click('button[type="submit"]');

    // Onboarding
    await page.waitForURL('**/recruiter/onboarding', { timeout: 10000 });
    await expect(page.locator('text=Welcome to CareerForge!')).toBeVisible();

    // Step 1: Org Details
    await page.fill('input[placeholder="e.g. Acme Corporation"]', 'TechCorp');
    await page.selectOption('select:has(option:has-text("Technology"))', { label: 'Technology' });
    await page.selectOption('select:has(option:has-text("1-50 Employees"))', { label: '1-50 Employees' });
    await page.click('button:has-text("Continue")');

    // Step 2: Hiring Goals
    await expect(page.locator('text=Hiring Goals')).toBeVisible({ timeout: 10000 });
    await page.click('label:has-text("Engineering") input[type="checkbox"]');
    await page.click('label:has-text("Product") input[type="checkbox"]');
    await page.selectOption('select:has(option:has-text("1-10 Hires"))', { label: '1-10 Hires' });
    await page.click('button:has-text("Continue")');

    // Step 3: Complete Onboarding
    await expect(page.locator('text=Team Setup')).toBeVisible({ timeout: 10000 });
    await page.click('button:has-text("Complete Setup")');

    // Dashboard
    await page.waitForURL('**/recruiter/recruiter-dashboard', { timeout: 10000 });
    await expect(page.locator('h1:has-text("Welcome back, Sarah Connor")')).toBeVisible({ timeout: 15000 });


    // 3. Post a Job
    await page.goto('/recruiter/post-job');
    await expect(page.locator('text=Post a Job')).toBeVisible();
    await page.fill('input[placeholder="e.g. Senior Product Designer"]', 'Senior DevOps Engineer');
    await page.fill('input[placeholder="e.g. Acme Corp"]', 'TechCorp');
    await page.selectOption('select:has(option:has-text("Remote"))', { label: 'Remote' });
    await page.selectOption('select:has(option:has-text("Full-time"))', { label: 'Full-time' });
    await page.fill('input[placeholder="Min"]', '130000');
    await page.fill('input[placeholder="Max"]', '170000');
    await page.fill('textarea[placeholder="Describe the role..."]', 'We are looking for a DevOps engineer with Kubernetes and Terraform experience.');
    
    // Preview Card checks
    await expect(page.locator('text=Senior DevOps Engineer')).toBeVisible();
    await expect(page.locator('text=TechCorp')).toBeVisible();

    // 4. Candidate Matching & XLSX Export
    await page.goto('/recruiter/candidate-matching');
    await expect(page.locator('text=Top AI Matches')).toBeVisible();
    await expect(page.locator('text=Sarah Chen').first()).toBeVisible();

    // Download XLSX batch report
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Export Match Report")');
    const download = await downloadPromise;

    // Verify downloaded file name matches pattern
    expect(download.suggestedFilename()).toContain('MatchReport_');
    expect(download.suggestedFilename()).toContain('.xlsx');
  });
});
