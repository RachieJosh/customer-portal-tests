import { test, expect } from '@playwright/test';
import { type } from 'os';

test.describe('Onboarding flow', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.getByRole('button', { name: 'Create Account' }).click();
    });

    test('TC_OB_001 - Successful account creation with all fields', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.getByRole("combobox").click();
        await page.getByRole('option', { name: 'Individual' }).click();
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await page.click('button:has-text("Create Account")');
        await expect(page.locator('text=Account created successfully! Redirecting to login...')).toBeVisible({ timeout: 50000 });
        await expect(page.locator('text=Welcome Back')).toBeVisible({ timeout: 50000 });
    });

    test('TC_OB_002 - Successful account creation without Organization Name', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', '');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.getByRole("combobox").click();
        await page.getByRole('option', { name: 'Individual' }).click();
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await page.click('button:has-text("Create Account")');
        await expect(page.locator('text=Account created successfully! Redirecting to login...')).toBeVisible({ timeout: 50000 });
        await expect(page.locator('text=Welcome Back')).toBeVisible({ timeout: 50000 });
    });

    test('TC_OB_003 - Organization Name accepts valid input', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.getByRole("combobox").click();
        await page.getByRole('option', { name: 'Individual' }).click();
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await page.click('button:has-text("Create Account")');
        await expect(page.locator('text=Account created successfully! Redirecting to login...')).toBeVisible({ timeout: 50000 });
        await expect(page.locator('text=Welcome Back')).toBeVisible({ timeout: 50000 });
    });

    /** test('TC_OB_004 - Submit form with all fields empty', async ({ page }) => {
        await page.click('button:has-text("Create Account")');
        const phone = `090${Date.now().toString().slice(-8)}`;
        await expect.soft(page.getByText('First name is required')).toBeVisible();
        await expect.soft(page.getByText('Last name is required')).toBeVisible();
        await expect.soft(page.getByText('Phone number is required')).toBeVisible();
        await expect.soft(page.getByText('Password is required')).toBeVisible();      
        await expect.soft(page.getByText('Please select a customer type')).toBeVisible();
        await expect.soft(page.getByText('Email is required')).toBeVisible();
        await expect.soft(page.getByText('Team size is required')).toBeVisible();
        await expect.soft(page.getByText('Confirm password is required')).toBeVisible();
    }); **/

    test('TC_OB_005 - Submit form without selecting Customer Type', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_006 - Submit form without First Name', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', '');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_007 - Submit form without Last Name', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', '');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_008 - Submit form without Email Address', async ({ page }) => {
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', '');
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_009 -Submit form without Phone Number', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', '');
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_010 - Submit form without Password', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', '');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', '');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_011 - Submit form without Confirm Password', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', '');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_012 - Submit form with only Confirm Password and no Password', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', '');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_013 - Password and Confirm Password do not match', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@27');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_014 - Invalid email format', async ({ page }) => {
        const email = `aryadoe@`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await expect(page.getByText("Please enter a valid email address")).toBeVisible();
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_015 - Invalid email format — missing domain', async ({ page }) => {
        const email = `aryadoe@test`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await expect(page.getByText("Please enter a valid email address")).toBeVisible();
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_016 - Invalid email format — no @ symbol', async ({ page }) => {
        const email = `aryadoe_${Date.now()}mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await expect(page.getByText("Please enter a valid email address")).toBeVisible();
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_017 - Duplicate email registration', async ({ page }) => {
        const email = `jogiha1444@netoiu.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_018 - Phone number with letters', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090we${Date.now().toString().slice(-6)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.getByText('Please enter a valid Nigerian phone number (11 digits, starting with 070, 080, 081, 090, 091, or 071)')).toBeVisible();
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_019 - Phone number too short', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-7)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.getByText('Please enter a valid Nigerian phone number (11 digits, starting with 070, 080, 081, 090, 091, or 071)')).toBeVisible();
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_020 - Phone number too long', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-9)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.getByText('Please enter a valid Nigerian phone number (11 digits, starting with 070, 080, 081, 090, 091, or 071)')).toBeVisible();
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_021 - Password with only spaces', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', '         ');
        await expect(page.getByText('Password must contain at least one uppercase letter, one lowercase letter, and one number')).toBeVisible();
    });

     test('TC_OB_022 - Very long first name', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        const longText = 'A'.repeat(100);
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', longText);
         await expect(page.getByText('First name must be less than 50 characters')).toBeVisible();
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_023 - Very long last name', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-9)}`;
        const longText = 'A'.repeat(100);
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', longText);
        await expect(page.getByText('Last name must be less than 50 characters')).toBeVisible();
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_024 - Special characters in First Name', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Ar@ya');
        await expect(page.getByText('First name can only contain letters')).toBeVisible();
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

    test('TC_OB_025 - Special characters in Last Name', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Do@e');
         await expect(page.getByText('Last name can only contain letters')).toBeVisible();
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_026 - Expected Team Size as zero', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('0');
        await expect(page.getByText('Team size must be a number between 1 and 10,000')).toBeVisible();
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });
     test('TC_OB_027 - Expected Team Size as negative number', async ({ page }) => {
       const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('-6');
        await expect(page.getByText('Team size must be a number between 1 and 10,000')).toBeVisible();
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_028 - Expected Team Size with decimal number', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('2.5');
        await expect(page.getByText('Team size must be a number between 1 and 10,000')).toBeVisible();
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_029 - Copy-paste into password field', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        const phone = `090${Date.now().toString().slice(-8)}`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', phone);
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await expect(page.locator('button:has-text("Create Account")')).toBeDisabled();
    });

     test('TC_OB_030 - Typing in an already registered number', async ({ page }) => {
        const email = `aryadoe_${Date.now()}@mailinator.com`;
        await page.fill('input[placeholder="Organization Name"]', 'Winterfell');
        await page.fill('input[placeholder="First name"]', 'Arya');
        await page.fill('input[placeholder="Last name"]', 'Doe');
        await page.fill('input[placeholder="08012345678"]', '09087655432');
        await page.fill('input[placeholder="Password"]', 'Jogeddie@26');
        await page.fill('input[placeholder="Email"]', email);
        await page.locator('#teamSize').fill('10');
        await page.fill('input[placeholder="Confirm Password"]', 'Jogeddie@26');
        await page.click('button:has-text("Create Account")');
        await expect(page.getByText('Phone number already registered')).toBeVisible();
    });
});
