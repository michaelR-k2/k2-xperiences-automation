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
    this.tableHeaders = page.locator("table thead tr th div span");
    this.table = page.locator("table tbody");
    this.alltableItems = this.table.locator("tr");
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async getTableHeaders() {
    await this.tableHeaders.first().waitFor({ state: "visible" });
    return await this.tableHeaders.allTextContents();
  }

  async getTableRowsCount() {
    await this.page.waitForSelector("table tbody tr", {state: "attached"});
    return await this.alltableItems.count(); 
  }

  async filterByDateAndAssert(columnIndex, dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    const columnSelector = `thead tr th:nth-child(${columnIndex + 1})`;
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
  
      await this.page.waitForTimeout(1000);
    }
    await this.page.locator(`button:has-text("${day}")`).first().click();
    await this.page.waitForTimeout(1000);
    await this.page.locator('body').click();
    const matchingCells = await this.page.locator(`tbody tr td:nth-child(${columnIndex + 1})`).allInnerTexts();
    
    const found = matchingCells.some(text => text.trim() === dateString);
    expect(found).toBeTruthy();
  };

  async filterTableByColumnAndAssert(columnIndex, valueToFilter) {
    const filterInput = this.page.locator(`thead tr th:nth-child(${columnIndex + 1}) input`);
    await filterInput.fill(valueToFilter);
    await this.page.waitForTimeout(2500); 
    const matchingCells = await this.page.locator(`tbody tr td:nth-child(${columnIndex + 1})`).allInnerTexts();

    const found = matchingCells.some(text => text.trim().includes(valueToFilter));
    expect(found).toBeTruthy();
  }

  async filterTableByStatusAndAssert(columnIndex, valueToFilter) {
    const filterInput = this.page.locator(`thead tr th:nth-child(${columnIndex + 1}) button[role="combobox"]`);
    await filterInput.click();
    const regex = new RegExp(`^${valueToFilter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
    await this.page.locator('div[data-radix-popper-content-wrapper]').getByText(regex).click();
    await this.page.waitForTimeout(1000); 
    const matchingCells = await this.page.locator(`tbody tr td:nth-child(${columnIndex + 1})`).allInnerTexts();

    const found = matchingCells.some(text => text.trim().includes(valueToFilter));
    expect(found).toBeTruthy();
  }

  delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
}
