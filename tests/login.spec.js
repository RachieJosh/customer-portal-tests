import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {

    test('TC_LG_001 - Successful login with valid credentials', async ({ page }) => {
        await page.goto('https://dev-app.plax.ng/login');
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]','Jogeddie@26');
        await page.click('button:has-text("Login")');
        await expect(page).toHaveURL('https://dev-app.plax.ng/customer', { timeout: 40000 });
    });

    test('TC_LG_004 - Password visiblity toogle works', async ({ page }) => {
        await page.goto('https://dev-app.plax.ng/login');
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]','Jogeddie@26');
        await page.locator('input[type="password"] + button').click();
        await expect(page.locator('input[type="text"]')).toBeVisible();
    });

    test('TC_LG_005 - Login with empty email field', async ({ page }) => {
        await page.goto('https://dev-app.plax.ng/login');
        await page.fill('input[placeholder="m@example.com"]', '');
        await page.fill('input[type="password"]','Jogeddie@26');
        await expect(page.locator('button:has-text("Login")')).toBeDisabled();
    });

    test('TC_LG_006 - Login with empty password field', async ({ page }) => {
        await page.goto('https://dev-app.plax.ng/login');
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]', '');
        await expect(page.locator('button:has-text("Login")')).toBeDisabled();
    });

     test('TC_LG_007 - Email field shows validation error when cleared after input', async ({ page }) => {
        await page.goto('https://dev-app.plax.ng/login');
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[placeholder="m@example.com"]', '');
        await expect(page.locator('Email is required')).toBeVisible;
    });

    test('TC_LG_007 - Password field shows validation error when cleared after input', async ({ page }) => {
        await page.goto('https://dev-app.plax.ng/login');
        await page.fill('input[placeholder="m@example.com"]', 'jogiha1444@netoiu.com');
        await page.fill('input[type="password"]','Jogeddie@26');
        await page.fill('input[type="password"]', '');
        await expect(page.locator('Password is required')).toBeVisible;
    });
});
