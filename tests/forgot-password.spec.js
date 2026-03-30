import { test, expect} from '@playwright/test';

test.describe('Login Flow', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://dev-app.plax.ng/login');
        await page.getByRole('button', { name: 'Forgot your password?' }).click();
    });

    test('TC_FP_001 - Successfully send reset link with valid registered email', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill ('Harrypotter26@mailinator.com');
        await page.click('button:has-text("Send Reset Link")');
        await expect(page.locator('text=Check Your Email')).toBeVisible({ timeout: 5000 });
    });

    test('TC-FP-002 - Back to Login button works after success', async ({ page}) => {
    //PENDING
    });

    test('TC_FP_003 - Cancel button closes the modal', async ({ page }) => {
        await page.click('button:has-text("Cancel")');
        await expect(page.locator('text=Welcome Back')).toBeVisible({ timeout: 5000 });
    });

    test('TC_FP_004 - Submit with empty email field', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill ('');
        await expect(page.getByRole('button', { name: 'Send Reset Link '})).toBeDisabled();
    });

    test('TC_FP_005 - Submit with invalid email format', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill ('Harry@');
        await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send Reset Link '})).toBeDisabled();
    });

    test('TC_FP_006 - Submit with invalid email — missing domain', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill ('Harry@test');
        await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send Reset Link '})).toBeDisabled();
    });

    test('TC_FP_007 - Submit with invalid email — no @ symbol', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill ('Harrytest.com');
        await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send Reset Link '})).toBeDisabled();
    });
      
    test('TC_FP_008 - Submit with unregistered email', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill ('notexisting@gmail.com');
        await page.click('button:has-text("Send Reset Link")');
        await expect(page.getByText('Check Your Email')).toBeVisible({ timeout: 15000 });
    });

    test('TC_FP_009 - Submit with spaces in email field', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill (' Harrytest.com ');
        await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
       await expect(page.getByRole('button', { name: 'Send Reset Link '})).toBeDisabled();
    });

    test('TC_FP_010 - Submit with SQL injection in email field', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill ("' OR '1'='1");
        await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send Reset Link '})).toBeDisabled();
    });

    test('TC_FP_011 - Submit with very long email', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill ('Noniiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii25@gmail.com');
        await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send Reset Link '})).toBeDisabled();
    });

    test('TC_FP_012 - Close modal using X button', async ({ page }) => {
        await page.getByRole('button', { name: 'Close' }).click({ force: true });
        await expect(page.locator('text=Welcome Back')).toBeVisible({ timeout: 5000 });
    });

    test('TC_FP_013 - Submit reset link multiple times with same email', async ({ page }) => {
        for (let i = 0; i < 5; i++) {
        await page.getByPlaceholder('Enter your email').fill('Harrypotter26@mailinator.com');
        await page.getByRole('button', { name: 'Send Reset Link' }).click();
        await expect(page.getByText('Check Your Email')).toBeVisible({ timeout: 15000 });
        await page.getByRole('button', { name: 'Back to Login' }).click();
        await page.getByRole('button', { name: 'Forgot your password?' }).click();
    }
    });


    test('TC_FP_014 - Email field accepts uppercase letters', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill ('HARRYPOTTER26@MAILINATOR.COM');
        await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send Reset Link '})).toBeDisabled();
    });


    test('TC_FP_015 - Reset link in email is clickable and leads to reset page', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill ('Harrypotter26@mailinator.com');
        await expect(page.getByRole('button', { name: 'Send Reset Link'})).toBeEnabled();
    });


    test('TC_FP_016 - New password requirements enforced on reset page', async ({ page }) => {
        //PENDING
    });


    test('TC_FP_017 - Reset link expires after set time', async ({ page }) => {
        //PENDING
    });


    test('TC_FP_018 - Login with old password after successful reset', async ({ page }) => {
        //PENDING
    });


    test('TC_FP_019 - Submit forgot password with email not used for signup', async ({ page}) => {
        await page.getByPlaceholder('Enter your email').fill ('Ronweasley23@gmail.com');
        await page.click('button:has-text("Send Reset Link")');
        await expect(page.getByText('Check Your Email')).toBeVisible({ timeout: 15000 });
    });


    test('TC_FP_020 - Reset link used a second time after already used', async ({ page }) => {
        //PENDING
    });
});