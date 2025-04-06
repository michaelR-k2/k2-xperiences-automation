import { locator, page, expect } from "@playwright/test";

export default class TripUsersPage {
  constructor(page) {
    this.page = page;
    // 📄 Locators de la tabla
    this.usersTable = page.locator("table tbody");
    this.allUsers = this.usersTable.locator("tr");
    this.tableHeaders = page.locator("table thead tr th div span");
    // 🔄 Paginación
    this.rowsPerPageButton = page.locator("button[role='combobox']");
    this.paginationNext = page.locator("button[aria-label='Next page']");
    this.paginationPrev = page.locator("button[aria-label='Previous page']");
  }

  async getUserCount() {
    await this.page.waitForSelector("table tbody tr", {state: "attached"});
    return await this.allUsers.count();
    
  }
  async getTableHeaders() {
    await this.tableHeaders.first().waitFor({ state: "visible" });
    return await this.tableHeaders.allTextContents();
  }
}
