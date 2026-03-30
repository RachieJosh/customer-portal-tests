import { test, expect } from '@playwright/test';

test.describe('Onboarding flow', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://dev-app.plax.ng/login');
    });

    test('Successful account creation with all fields', async ({ page }) => {
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', '09067890546');
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.getByText('Customer Type').click;
        awa
        await page.fill('input[placeholder="Email"]', );
        await page.fill('input[id="teamSize"]','');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
    });


});
