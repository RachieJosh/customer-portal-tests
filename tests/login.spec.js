import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://dev-app.plax.ng/login');
    });

    test('TC_LG_001 - Successful login with valid credentials', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]','Jogeddie@26');
        await page.click('button:has-text("Login")');
        await expect(page).toHaveURL('https://dev-app.plax.ng/customer', { timeout: 40000 });
    });

    test('TC_LG_004 - Password visiblity toogle works', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]','Jogeddie@26');
        await page.locator('input[type="password"] + button').click();
        await expect(page.locator('input[type="text"]')).toBeVisible();
    });

    test('TC_LG_005 - Login with empty email field', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', '');
        await page.fill('input[type="password"]','Jogeddie@26');
        await expect(page.locator('button:has-text("Login")')).toBeDisabled();
    });

    test('TC_LG_006 - Login with empty password field', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]', '');
        await expect(page.locator('button:has-text("Login")')).toBeDisabled();
    });

     test('TC_LG_007 - Email field shows validation error when cleared after input', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[placeholder="m@example.com"]', '');
        await expect(page.getByText('Email is required')).toBeVisible();
    });

    test('TC_LG_008 - Password field shows validation error when cleared after input', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]','Jogeddie@26');
        await page.fill('input[type="password"]', '');
        await expect(page.getByText('Password is required')).toBeVisible();
    });

    test('TC_LG_009 - Login with both fields empty', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', '');
        await page.fill('input[type="password"]','');
        await expect(page.locator('button:has-text("Login")')).toBeDisabled();
    });

    test('TC_LG_010 - Login with invalid email format', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jog@');
        await page.fill('input[type="password"]','Jogeddie@26');
        await expect(page.getByText('Please enter a valid email address')).toBeVisible();
        await expect(page.locator('button:has-text("Login")')).toBeDisabled();
    });

    test('TC_LG_011 - Login with unregistered email', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'notexist@test.com');
        await page.fill('input[type="password"]','Jogeddie@26');
        await page.click('button:has-text("Login")');
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });

    test('TC_LG_012 - Login with wrong password', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]','Jogeddie@233');
        await page.click('button:has-text("Login")');
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });

    test('TC_LG_013 - Login with correct email and wrong case password', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]','JOGEDDIE@26');
        await page.click('button:has-text("Login")');
        // wait for loading state to disappear
        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });

    test('TC_LG_014 - Login with email in uppercase', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'JOGIHA1444@NETIOU.COM');
        await page.fill('input[type="password"]','Jogeddie@26');
        await page.click('button:has-text("Login")');
        // wait for loading state to disappear
        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });

    test('TC_LG_015 - Login with spaces in email field', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', ' jog @ test.co m');
        await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    });

    test('TC_LG_016 - Login with spaces in password field', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]','jog eddi e@ 26');
        await page.click('button:has-text("Login")');
        // wait for loading state to disappear
        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });

    test('TC_LG_017 - Login with SQL added in email field', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', "' OR '1'='1");
        await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    });

    test('TC_LG_018 - Login with SQL added in password field', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]', "' OR '1'='1'");
        await page.click('button:has-text("Login")');
        // wait for loading state to disappear
        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });

    test('TC_LG_019 - Login with very long email', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu.com');
        await page.fill('input[type="password"]','Jogeddie@26');
        await page.click('button:has-text("Login")');
        // wait for loading state to disappear
        await expect(page.getByText('Please enter an email address')).toBeVisible({ timeout: 15000 });
    });

    test('TC_LG_020 - Login with very long password', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]','Jogedddddddddddddddddddddddddddddddddddddddddddddie@26');
        await page.click('button:has-text("Login")');
        // wait for loading state to disappear
        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });

    test('TC_LG_021 - Multiple failed login attempts', async ({ page }) => {
        for (let i = 0; i < 5; i++) {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]', 'WrongPass@1');
        await page.click('button:has-text("Login")');
        await expect(page.getByText('Invalid credentials')).toBeVisible({ timeout: 50000 });
        }
        await expect(page.getByText('Account locked')).toBeVisible();
    });

    test('TC_LG_022 - Contact Admin link is clickable', async ({ page }) => {
        await expect(page.getByText('Contact Admin')).toBeVisible();
    });

    test('TC_LG_023 - Browser back button after successful login', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]', 'Jogeddie@26');
        await page.click('button:has-text("Login")');
        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
        await expect(page).toHaveURL('https://dev-app.plax.ng/customer', { timeout: 40000});
        await page.goBack();
        await expect(page).toHaveURL('https://dev-app.plax.ng/login');
    });

    test('TC_LG_024 - Browser forward button after successful login', async ({ page }) => {
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]', 'Jogeddie@26');
        await page.click('button:has-text("Login")');
        await expect(page).toHaveURL('https://dev-app.plax.ng/customer', { timeout: 40000});
        await page.goBack();
        await expect(page).toHaveURL('https://dev-app.plax.ng/login');
        await page.goForward();
        await expect(page).toHaveURL('https://dev-app.plax.ng/customer', { timeout: 40000});
    });
});
