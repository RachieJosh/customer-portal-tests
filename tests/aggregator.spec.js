import { test, expect } from '@playwright/test';
import { type } from 'os';
function getTestData() {
  const ts = Date.now();
  const sectors = ['Technology', 'Healthcare', 'Finance', 'Education', 'Agriculture', 'Manufacturing', 'Retail', 'Real Estate', 'Transportation', 'Energy', 'Other'];
  return {
    email: `amaka_${ts}@mailinator.com`,
    phone: `090${ts.toString().slice(-8)}`,
    companyName: `Valeria`,
    sector: sectors[Math.floor(Math.random() * sectors.length)]
  };
}

 test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await page.getByText('Register as Aggregator').click();
    });

test.describe('Aggregator Registration - Positive Tests', () => {
    test('TC_AGG_001 - Successful registration with all valid required fields', async ({ page }) => {
        const { email, phone, companyName, sector } = getTestData();
        await page.getByPlaceholder('Full name').fill('Amara Okafor');
        await page.getByPlaceholder('Company Name').fill(companyName);
        await page.getByPlaceholder('Phone Number').fill(phone);
        await page.fill('input[placeholder="Password"]', 'SecurePass123!');
        await page.getByRole("combobox").click();
        await page.getByRole('option', { name: sector }).click();
        await page.getByPlaceholder('email').fill(email);
        await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
        expect(page.getByRole('button', { name: 'Create Account' })).toBeEnabled();
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.locator('text=Account created successfully! Redirecting to login...')).toBeVisible({ timeout: 50000 });
        await expect(page.locator('text=Welcome Back')).toBeVisible({ timeout: 50000 });
    });

    test('TC_AGG_002 - Toggle between Aggregator and Customer registration forms', async ({ page }) => {
        await page.getByText('Register as Customer').click();
        await expect(page).toHaveURL('/signup');
        await page.getByText('Register as Aggregator').click();
        await expect(page).toHaveURL('/signup/aggregator');
    
    });

    test('TC_AGG_003 - Password visibility toggle works correctly', async ({ page }) => {
        const passwordField = page.getByPlaceholder('Password').first();
        const toggleBtn = passwordField.locator('..').locator('button');
        await passwordField.fill('SecurePass123!');
        await expect(passwordField).toHaveAttribute('type', 'password');
        // To show password
        await toggleBtn.click();
        await expect(passwordField).toHaveAttribute('type', 'text');
        // To hide password again
        await toggleBtn.click();
        await expect(passwordField).toHaveAttribute('type', 'password');
    });

    });

    test.describe('Aggregator Registration - Negative Tests', () => {
        test('TC_AGG_004 - Submit form with all fields empty', async ({ page }) => {
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_005 - Submit form with invalid email format', async ({ page }) => {
            const { phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill('amaraokafor@@.gmail.com');
            await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });
    });