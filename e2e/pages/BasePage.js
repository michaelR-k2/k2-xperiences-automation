import { expect } from '@playwright/test';

export default class BasePage {
  constructor(page) {
    this.page = page;
    this.dashboardLink = page.locator('nav a[href*="/dashboard"]');
    this.requestsLink = page.locator('nav a[href*="/requests"]');
    this.projectsLink = page.locator('nav a[href*="/projects"]');
    this.experiencesLink = page.locator('nav a[href*="/experiences"]');
    this.vendorsLink = page.locator('nav a[href*="/vendors"]');
    this.tripUsersLink = page.locator('nav a[href*="/trip-users"]');
    this.filesLink = page.locator('nav a[href*="/files"]');
  }

  async getCurrentUrl() {
    return this.page.url();
  }
  delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
}
