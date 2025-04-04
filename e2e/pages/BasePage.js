import { expect } from '@playwright/test';

export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  async getCurrentUrl() {
    return this.page.url();
  }
  delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
}
