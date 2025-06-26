import { expect } from '@playwright/test';

export default class BasePage {
  constructor(page) {
    this.page = page;
    //Navigation - Left side Menu 
    this.dashboardLink = page.locator('nav a[href*="/dashboard"]');
    this.requestsLink = page.locator('nav a[href*="/requests"]');
    this.projectsLink = page.locator('nav a[href*="/projects"]');
    this.experiencesLink = page.locator('nav a[href*="/experiences"]');
    this.vendorsLink = page.locator('nav a[href*="/vendors"]');
    this.tripUsersLink = page.locator('nav a[href*="/trip-users"]');
    this.filesLink = page.locator('nav a[href*="/files"]');
    this.tableHeaders = page.locator("table thead tr th div span");
    //General Table Locators.
    this.table = page.locator("table tbody");
    this.alltableItems = this.table.locator("tr");
    //Contact Phone Locators.
    this.selectPhoneButton = page.locator('div.PhoneInput  > button[aria-haspopup="dialog"]');
    this.generalPhoneInput = page.locator('input[placeholder="Enter contact phone"]');
    //General Contact Info Locators.
    this.departmentSelect = page.locator('button:has-text("Select Department")');
    this.contactInfoEmail = page.locator('input[placeholder="Enter the contact email"]');
    this.contactInfoName = page.locator('input[placeholder="Contact name"]');
    //Projects Contact Info Locators.
    this.projectContactInfoEmail = page.locator('input[placeholder="Project contact email"]');
    this.ProjectContactInfoName = page.locator('input[placeholder="Project contact name"]');
    //Dropdown inputs general locators.
    this.dropdownContainer = page.locator('div[data-side="bottom"]');
    //General Submit Button
    this.submitButton = page.locator('button[type="submit"]');
    //Pagination
    this.rowsNumberSelector = page.getByText('Rows per page').locator('..').locator('button[role="combobox"]');
  }

  async getFirstIdFromTable(idColumnIndex) {
    const firstIdCell = this.page.locator(`table tbody tr:first-child td:nth-child(${idColumnIndex})`);
    const idText = await firstIdCell.innerText();
    return idText.trim();
  };

  async getTotalPagesCount(){
    const paginationText = await this.page.locator('text=Page 1 of').textContent();
    const totalPages = parseInt(paginationText?.match(/of (\d+)/)?.[1] || '1');
    return totalPages;
  };

  async changeRowsPerPage(count) {
    await this.rowsNumberSelector.click();
    await this.page.getByRole('option', { name: `${count}` }).click();
    await this.page.waitForTimeout(1500);
  };

  async goToNextPage() {
    const nextButton = this.page.getByRole('button', { name: 'Go to next page' });
    if (await nextButton.isEnabled()) {
      nextButton.click()
      await this.page.waitForTimeout(200);
      nextButton.click();
    }
  };
  
  async goToPreviousPage() {
    const prevButton = this.page.getByRole('button', { name: 'Go to previous page' });
    if (await prevButton.isEnabled()) {
      prevButton.click();
    }
  };
  
  async goToFirstPage() {
    const firstButton = this.page.getByRole('button', { name: 'Go to first page' });
    if (await firstButton.isEnabled()) {
      firstButton.click()
    }
  };
  
  async goToLastPage() {
    const lastButton = this.page.getByRole('button', { name: 'Go to last page' });
    if (await lastButton.isEnabled()) {
      lastButton.click()
      await this.page.waitForTimeout(200);
      lastButton.click();
    }
  };

  async selectDropdownOption(optionText) {
    return this.page.locator('div[data-radix-popper-content-wrapper]', { hasText: optionText });
  };

  async selectSecundaryDropdownOption(optionText) {
    return this.page.locator('div.flex.cursor-pointer span', { hasText: optionText });
  };

  async fillContactInfoSection(contactData){
    await this.departmentSelect.click();
    await (await this.selectDropdownOption(contactData.department)).click();
    await this.contactInfoEmail.fill(contactData.email);
    await this.generalPhoneInput.first().fill(contactData.phone);
    await this.contactInfoName.fill(contactData.name);
  };

  async fillProjectsContactInfoSection(projectContactData){
    await this.projectContactInfoEmail.fill(projectContactData.email);
    await this.generalPhoneInput.nth(1).fill(projectContactData.phone);
    await this.ProjectContactInfoName.fill(projectContactData.name);
  };

  async getCurrentUrl() {
    return this.page.url();
  };

  async getTableHeaders() {
    await this.tableHeaders.first().waitFor({ state: "visible" });
    return await this.tableHeaders.allTextContents();
  };

  async getTableRowsCount() {
    await this.page.waitForSelector("table tbody tr", {state: "attached"});
    return await this.alltableItems.count(); 
  };

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
    await this.page.locator(`button`).filter({ hasText: new RegExp(`^${day.toString()}$`) }).first().click();
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
    await this.page.waitForTimeout(2500); 
    const matchingCells = await this.page.locator(`tbody tr td:nth-child(${columnIndex + 1})`).allInnerTexts();

    const found = matchingCells.some(text => text.trim().includes(valueToFilter));
    expect(found).toBeTruthy();
  }

  delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
}
