import { locator, page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export default class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goToLoginPage() {
    await this.page.goto(`${process.env.BASEURL}/login`);
  }
  async loginAs(user) {
    await this.emailTextBox.type(user.email);
    await this.nextButton.click();
    await this.passwordTextBox.fill(user.password);
    await this.loginButton.click();
  }
}
