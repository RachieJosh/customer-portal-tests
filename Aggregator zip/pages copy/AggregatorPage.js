export class AggregatorPage {
  constructor(page) {
    this.page = page;
    this.fullNameInput = page.getByPlaceholder('Full name');
    this.companyNameInput = page.getByPlaceholder('Company Name');
    this.phoneInput = page.getByPlaceholder('Phone Number');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    this.emailInput = page.getByPlaceholder('email');
    this.sectorDropdown = page.getByRole('combobox');
    this.createAccountBtn = page.getByRole('button', { name: 'Create Account' });
    this.passwordField = page.getByPlaceholder('Password').first();
    this.passwordToggleBtn = page.getByPlaceholder('Password').first().locator('..').locator('button');
  }

  async navigate() {
    await this.page.goto('/login');
    await this.createAccountBtn.click();
    await this.page.getByText('Register as Aggregator').click();
  }

  async fillForm({ fullName, companyName, phone, password, sector, email }) {
    await this.fullNameInput.fill(fullName);
    await this.companyNameInput.fill(companyName);
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.sectorDropdown.click();
    await this.page.getByRole('option', { name: sector }).click();
    await this.emailInput.fill(email);
    await this.confirmPasswordInput.fill(password);
  }

  async submitForm() {
    await this.createAccountBtn.click();
  }
}