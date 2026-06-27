import { test, expect } from '@playwright/test';
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') });

test.describe('Job Seeker End-to-End Flow', () => {
  const testEmail = `seeker-${Date.now()}@gmail.com`;
  const testPassword = 'Password123!#';

  test('should register, complete onboarding, view dashboard, and co-author resume', async ({ page }) => {
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
    await page.click('label[id="role-jobseeker-label"]');
    await page.fill('#signup-firstName', 'John');
    await page.fill('#signup-lastName', 'Doe');
    await page.fill('#signup-email', testEmail);
    await page.fill('#signup-password', testPassword);
    await page.fill('#signup-confirmPassword', testPassword);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Expect signup success message or redirect
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

    // Wait for redirect to login page (should be auto-directed)
    await page.waitForURL('**/auth/login', { timeout: 10000 });

    // 2. Log In
    await page.fill('#login-email', testEmail);
    await page.fill('#login-password', testPassword);
    await page.click('button[type="submit"]');

    // Onboarding welcome page
    await page.waitForURL('**/job-seeker/onboarding-welcome', { timeout: 10000 });
    await expect(page.locator('text=Welcome, John')).toBeVisible();

    // 3. Step 1: Upload Resume
    await page.click('text=Upload Resume');
    // Staging the resume text file by directly targeting the hidden input element
    await page.setInputFiles('input[type="file"]', path.join(__dirname, '..', 'fixtures', 'test-resume.txt'));


    // Upload & Analyze
    await page.click('text=Analyze & Optimize');
    
    // Wait for step 2 (should advance after processing)
    await expect(page.locator('text=Profile Strength')).toBeVisible({ timeout: 15000 });

    // 4. Step 2: Complete Profile
    await page.fill('input[placeholder="e.g. Software Engineer"]', 'Software Engineer');
    await page.fill('textarea[placeholder="Tell us about your professional background..."]', 'Experienced Software Engineer with a passion for web technologies.');
    await page.click('button:has-text("Next")');

    // 5. Step 3: Job Preferences
    await expect(page.locator('text=Job Preferences')).toBeVisible({ timeout: 10000 });
    await page.selectOption('select', 'Hybrid');
    await page.fill('input[placeholder*="San Francisco"]', 'New York');
    await page.click('button:has-text("Save Preferences")');

    // 6. Step 4: Launch
    await expect(page.locator('text=Enable AI Career Coach').first()).toBeVisible({ timeout: 10000 });
    await page.click('button:has-text("Launch")');

    // Should redirect to dashboard
    await page.waitForURL('**/job-seeker/dashboard', { timeout: 10000 });
    await expect(page.locator('h1:has-text("Welcome back, John Doe")')).toBeVisible({ timeout: 15000 });


    // 7. Go to Guided Resume Builder co-authoring workspace
    await page.goto('/job-seeker/ai-resume-builder');
    await expect(page.locator('text=Guided Resume Co-Writer')).toBeVisible();

    // Initialize new co-writer session
    await page.fill('input[placeholder="e.g. Senior Frontend Architect, Staff Product Manager"]', 'Senior DevOps Engineer');
    await page.selectOption('select', { label: 'Senior (7-10 yrs)' });
    await page.fill('textarea[placeholder*="Built automated pipelines"]', 'Migrated all legacy workloads to Kubernetes, automated CI/CD.');
    await page.click('button:has-text("Launch Copilot")');

    // Stage 1: Clarifying Interview Q&A
    await expect(page.locator('text=Context Interview').first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('text=Question 1 of 4')).toBeVisible();

    // Answer Q1
    await page.fill('input[placeholder="Type your response here..."]', 'Primarily Kubernetes, AWS, Helm, Terraform, and Python.');
    await page.press('input[placeholder="Type your response here..."]', 'Enter');

    // Answer Q2
    await expect(page.locator('text=Question 2 of 4')).toBeVisible({ timeout: 10000 });
    await page.fill('input[placeholder="Type your response here..."]', 'AWS EKS cluster migration and infrastructure as code.');
    await page.press('input[placeholder="Type your response here..."]', 'Enter');

    // Answer Q3
    await expect(page.locator('text=Question 3 of 4')).toBeVisible({ timeout: 10000 });
    await page.fill('input[placeholder="Type your response here..."]', 'Managed infrastructure for a engineering department of 45 devs.');
    await page.press('input[placeholder="Type your response here..."]', 'Enter');

    // Answer Q4
    await expect(page.locator('text=Question 4 of 4')).toBeVisible({ timeout: 10000 });
    await page.fill('input[placeholder="Type your response here..."]', 'Certified Kubernetes Administrator (CKA).');
    await page.press('input[placeholder="Type your response here..."]', 'Enter');

    // Stage 2: Section-by-section live drafting
    await expect(page.locator('text=Drafting: summary')).toBeVisible({ timeout: 20000 });
    await page.click('button:has-text("Approve & Continue")');

    await expect(page.locator('text=Drafting: skills')).toBeVisible({ timeout: 15000 });
    await page.click('button:has-text("Approve & Continue")');

    await expect(page.locator('text=Drafting: experience')).toBeVisible({ timeout: 15000 });
    await page.click('button:has-text("Approve & Continue")');

    await expect(page.locator('text=Drafting: education')).toBeVisible({ timeout: 15000 });
    await page.click('button:has-text("Approve & Continue")');

    // Stage 3: Simulated ATS / Recruiter review
    await expect(page.locator('text=Simulated Recruiter Review')).toBeVisible({ timeout: 25000 });
    await expect(page.locator('text=ATS Score')).toBeVisible();
    await expect(page.locator('text=Key Strengths')).toBeVisible();

    // Finish session
    await page.click('button:has-text("Finish Resume")');
    await expect(page.locator('text=Initialize New Writer Session')).toBeVisible({ timeout: 10000 });
  });
});
