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
        await page.fill('input[placeholder="m@example.com"]', 'ajogiha1444@netoiu.com');
        await page.fill('input[type="password"]','Jogeddie@26');
        await page.locator('input[type="password"] + button').click();
        await expect(page.locator('input[type="text"]')).toBeVisible();
    });
});