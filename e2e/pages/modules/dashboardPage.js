import { locator, page, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    // 📊 Locators de métricas
    this.totalRevenue = page.locator('div.p-6.pb-2 h3', { hasText: 'Total Revenue' }).locator("..");
    this.subscriptions = page.locator('div.p-6.pb-2 h3', { hasText: 'Subscriptions' }).locator("..");
    this.sales = page.locator('div.p-6.pb-2 h3', { hasText: 'Sales' }).locator("..");
    this.activeNow = page.locator('div.p-6.pb-2 h3', { hasText: 'Active Now' }).locator("..");
    // 📄 Locators de transacciones
    this.transactionsTable = page.locator("table tbody");
    this.allTransactions = page.locator("table tbody tr");
    this.transactionRows = this.transactionsTable.locator("tr");
    // 🔗 Botón "View All"
    this.viewAllButton = page.locator(
      'a[href="/requests"]:has-text("View All")'
    );
  }

  async goToDashboard() {
    await this.page.goto(`${process.env.BASEURL}/dashboard`);
  }
  async getTotalRevenue() {
    return await this.totalRevenueValue.textContent();
  }
  async getSubscriptions() {
    return await this.subscriptionsValue.textContent();
  }
  async getSales() {
    return await this.salesValue.textContent();
  }
  async getActiveNow() {
    return await this.activeNowValue.textContent();
  }
  async getTransactionCount() {
    await this.page.waitForSelector("table tbody", { state: "attached" });
    await this.page.waitForSelector("table tbody tr", { state: "visible" });
    return await this.page.locator("table tbody tr").count();
  }
  async clickViewAll() {
    await this.viewAllButton.click();
    await this.page.waitForURL("/requests");
  }
}
