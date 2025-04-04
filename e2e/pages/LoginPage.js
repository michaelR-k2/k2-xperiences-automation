import { locator, page, expect } from "@playwright/test";

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.submitButton = page.locator('button:has-text("Submit")');
    this.errorMessage = page.locator('p.text-sm.font-medium.text-destructive.mt-2');
  }

  async goToLoginPage() {
    await this.page.goto(`${process.env.BASEURL}/login`);
  }
  async loginToXperiences() {
    await this.emailInput.fill(process.env.USER_EMAIL);
    await this.passwordInput.fill(process.env.USER_PASSWORD);
    await this.submitButton.click();
  }
  async loginWithInvalidEmail(user){
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(process.env.USER_PASSWORD);
    await this.submitButton.click();
  }
  async loginWithInvalidPassword(user){
    await this.emailInput.fill(process.env.USER_EMAIL);
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
  }
  async loginWithEmptyEmail(user){
    await this.emailInput.fill('');
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
  }
  async loginWithEmptyPassword(user){
    await this.emailInput.fill(process.env.USER_EMAIL);
    await this.passwordInput.fill('');
    await this.submitButton.click();
  }
}
