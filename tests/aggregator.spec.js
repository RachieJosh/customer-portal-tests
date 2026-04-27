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
        await expect(page.locator('text=Please login to your account')).toBeVisible({ timeout: 60000 });
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
            await page.getByPlaceholder('email').fill('amaraokafor@@mail.com');
            await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_006 - Submit form with mismatched Password and Confirm Password', async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'DifferentPass123!');
            await expect(page.locator('text=Passwords do not match')).toBeVisible();
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_007 - Submit form with Password and an empty Confirm Password', async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', '');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_008 - Submit form with phone number containing non-numeric characters', async ({ page }) => {
            const { email, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill('0803-ABC-4567');
            await expect(page.locator('text=Please enter a valid Nigerian phone number (e.g., 08012345678)')).toBeVisible();
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test("TC_AGG_009 - Verify that system don/'t accept wrong phone number prefixes (060,050,040,020)", async ({ page }) => {
            const { email, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill('06012345678');
            await expect(page.locator('text=Please enter a valid Nigerian phone number (e.g., 08012345678)')).toBeVisible();
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test("TC_AGG_010 - Submit form with a weak password (no special characters)", async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'password123');
            await expect(page.locator('text=Password must contain at least one lowercase letter, one uppercase letter, and one number')).toBeVisible();
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'password123');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_011 - Register with already existing email', async ({ page }) => {
            const { phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill('jogiha1444@netoiu.com');
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await page.getByRole('button', { name: 'Create Account' }).click();
            await expect(page.locator('text=User with this email already exists')).toBeVisible();
        });

        test('TC_AGG_012 - Register with already existing phone number', async ({ page }) => {
            const { email, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill('09076875223');
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await page.getByRole('button', { name: 'Create Account' }).click();
            await expect(page.locator('text=This phone number is already registered.')).toBeVisible();
        });

        test('TC_AGG_013 - Submit form with no industry sector selected', async ({ page }) => {
            const { email, phone, companyName } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

    test.describe('Aggregator Registration - Edge Case Tests', () => {
        test('TC_AGG_004 - Submit form with all fields empty', async ({ page }) => {
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_014 - Submit form with full name field with only spaces', async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill(' ');
            await expect(page.locator('text=Full name must be at least 2 characters')).toBeVisible();
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_015 - Submit form with full name field with special characters included', async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara @Okafor!');
            await expect(page.locator('text=Name must contain only letters and spaces')).toBeVisible();
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_016 - Submit form with full name field having 1 character', async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('A');
            await expect(page.locator('text=Full name must be at least 2 characters')).toBeVisible();
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_017 - Submit form with company name field with only spaces', async ({ page }) => {
            const { email, phone, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill('  ');
            await expect(page.locator('text=Company name must be at least 2 characters')).toBeVisible();
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
       });

        test('TC_AGG_018 - Submit form with company name field having special characters included', async ({ page }) => {
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill('@Valeria!');
            await expect(page.locator('text=Company name contains invalid characters')).toBeVisible();
            const { email, phone, sector } = getTestData();
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_019 - Submit form with company name field having 1 character', async ({ page }) => {
            const { email, phone, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill('V');
            await expect(page.locator('text=Company name must be at least 2 characters')).toBeVisible();
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_020 - Submit form with password at minimum character boundary', async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'Ab@12346!');
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'Ab@12346!');
            expect(page.getByRole('button', { name: 'Create Account' })).toBeEnabled();
            await page.getByRole('button', { name: 'Create Account' }).click();
            await expect(page.locator('text=Account created successfully! Redirecting to login...')).toBeVisible({ timeout: 50000 });
            await expect(page.locator('text=Please login to your account')).toBeVisible({ timeout: 60000 });
        });

        test('TC_AGG_021 - Submit form with password field having only special characters', async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', '@#$%^&*@');
            await expect(page.locator('text=Password must contain at lßeast one lowercase letter, one uppercase letter, and one number')).toBeVisible();
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', '@#$%^&*@');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_022 - Submit form with password field not up to 8 characters', async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'Pas123!');
            await expect(page.locator('text=Password must be at least 8 characters')).toBeVisible();
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', 'Pas123!');
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

         /** This are defects:
          
        test('TC_AGG_023 - Submit form with password field having trailing spaces', async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', 'SecurePass123!    ')
            await expect(page.locator('text=Password must contain at least one lowercase letter, one uppercase letter, and one number')).toBeVisible();
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', ' SecurePass123!'    ); 
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });

        test('TC_AGG_024 - Submit form with password field having leading spaces', async ({ page }) => {
            const { email, phone, companyName, sector } = getTestData();
            await page.getByPlaceholder('Full name').fill('Amara Okafor');
            await page.getByPlaceholder('Company Name').fill(companyName);
            await page.getByPlaceholder('Phone Number').fill(phone);
            await page.fill('input[placeholder="Password"]', '    SecurePass123!');
            await expect(page.locator('text=Password must contain at least one lowercase letter, one uppercase letter, and one number')).toBeVisible();
            await page.getByRole("combobox").click();
            await page.getByRole('option', { name: sector }).click();
            await page.getByPlaceholder('email').fill(email);
            await page.fill('input[name="confirmPassword"]', '    SecurePass123!'); 
            await expect(page.getByRole('button', { name: 'Create Account' })).toBeDisabled();
        });
        */
    });

 });