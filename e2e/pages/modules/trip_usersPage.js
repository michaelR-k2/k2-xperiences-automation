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
  async filterByDateAndAssert(columnIndex, dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    const columnSelector = `thead tr th:nth-child(${columnIndex})`;
    await this.page.locator(`${columnSelector} button[aria-haspopup="dialog"]`).click();
    const getCurrentMonthYear = async () => {
      const header = await this.page.locator('[role="dialog"] >> text=/^[A-Z][a-z]+ \\d{4}$/').textContent();
      const [currentMonthName, currentYear] = header.split(' ');
      const currentMonth = new Date(`${currentMonthName} 1, 2000`).getMonth() + 1;
      return { currentMonth, currentYear: parseInt(currentYear) };
    };
    while (true) {
      const { currentMonth, currentYear } = await getCurrentMonthYear();
      if (currentMonth === month && currentYear === year) break;
  
      if (currentYear > year || (currentYear === year && currentMonth > month)) {
        await this.page.locator('button[aria-label="Go to the Previous Month"]').click();
      } else {
        await this.page.locator('button[aria-label="Go to the Next Month"]').click();
      }
  
      await this.page.waitForTimeout(200);
    }
    await this.page.locator(`button:has-text("${day}")`).first().click();
    await this.page.waitForTimeout(500);
    await this.page.locator('body').click();
    const matchingCells = await this.page.locator(`tbody tr td:nth-child(${columnIndex})`).allInnerTexts();
    
    const found = matchingCells.some(text => text.trim() === dateString);
    expect(found).toBeTruthy();
  };

  async filterTableByColumnAndAssert(columnIndex, valueToFilter) {
    const filterInput = this.page.locator(`thead tr th:nth-child(${columnIndex}) input`);
    await filterInput.fill(valueToFilter);
    await this.page.waitForTimeout(2500); 
    const matchingCells = await this.page.locator(`tbody tr td:nth-child(${columnIndex})`).allInnerTexts();

    const found = matchingCells.some(text => text.trim() === valueToFilter);
    expect(found).toBeTruthy();
  }
}
