import { locator, page, expect } from "@playwright/test";

export default class VendorsPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('input#name');
    this.selectCountryButton = page.locator('div:has(label[for="location"]) > button');
    this.searchCountryInput = page.locator('input[placeholder="Search country..."]');
    this.dropdownContainer = page.locator('div[data-side="bottom"]');
    this.selectServicesButton = page.locator('div:has(label[for="services"]) > button');
    this.searchServiceInput = page.locator('input[placeholder="Search ..."]');
    this.contactVendorNameInput = page.locator('input[placeholder="Enter Contact vendor name"]');
    this.emailInput = page.locator('input[placeholder="Enter vendor email"]');
    this.selectPhoneButton = page.locator('div.PhoneInput  > button[aria-haspopup="dialog"]');
    this.phoneInput = page.locator('input[placeholder="Your phone"]');
    this.websiteInput = page.locator('input[placeholder="Enter vendor website"]');
    this.vendorDescription = page.locator('textarea[placeholder="Enter vendor description"]');
    this.vendorNotes = page.locator('textarea#comments');
    this.submitButton = page.locator('button[type="submit"]');
    this.statusDropdown = page.locator('div select');
    this.vendorsTable = page.locator("table tbody");
    this.allVendors = this.vendorsTable.locator("tr");
    this.tableHeaders = page.locator("table thead tr th div span");
  }

  async openEditVendorByName(vendorName){
      const row = await this.page.locator('tbody tr', { hasText: vendorName }).first();
      const idCell = await row.locator('td').nth(1);
      const id = await idCell.textContent();
      return id?.trim();
  };
  async getVendorRowTable(vendorName) {
    return this.page.locator('tbody tr td:nth-child(3)', { hasText: vendorName });
  };
  async getVendorsCount() {
    await this.page.waitForSelector("table tbody tr", {state: "attached"});
    return await this.allVendors.count(); 
  }
  async getTableHeaders() {
    await this.tableHeaders.first().waitFor({ state: "visible" });
    return await this.tableHeaders.allTextContents();
  }
  async createVendor(vendorData) {
    await this.nameInput.fill(vendorData.name);
    await this.selectCountryButton.click();
    await this.searchCountryInput.fill(vendorData.location);
    await this.dropdownContainer.locator('div.overflow-hidden > div span.text-sm', { hasText: new RegExp(`^${vendorData.location}$`, 'i') }).click();
    await this.selectServicesButton.click();
    for (const service of vendorData.services) {
      await this.searchServiceInput.fill(service);
      await this.dropdownContainer
        .locator('div.overflow-hidden > div[role="listbox"]', { hasText: new RegExp(`^${service}$`, 'i') })
        .click();
    }
    await this.page.click('body'); 
    await this.statusDropdown.selectOption(vendorData.status.toLowerCase());
    await this.contactVendorNameInput.fill(vendorData.contactVendorName);
    await this.emailInput.fill(vendorData.email);
    await this.selectPhoneButton.click();
    await this.searchCountryInput.fill(vendorData.location);
    await this.dropdownContainer.locator('div.overflow-hidden > div span.flex-1.text-sm', { hasText: new RegExp(`^${vendorData.location}$`, 'i') }).click();
    await this.phoneInput.fill(vendorData.phone);
    await this.websiteInput.fill(vendorData.website);
    await this.vendorDescription.fill(vendorData.vendorDescription);
    await this.vendorNotes.fill(vendorData.InternalNotes);
    await this.submitButton.click();
  }

  async editVendor(vendorData) {
    await this.selectCountryButton.click();
    await this.searchCountryInput.fill(vendorData.location);
    await this.page.click('body'); 
    await this.vendorDescription.fill(vendorData.vendorDescription);
    await this.vendorNotes.fill(vendorData.InternalNotes);
    await this.submitButton.click();
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
        await this.page.locator('button:has-text("<")').click();
      } else {
        await this.page.locator('button:has-text(">")').click();
      }
  
      await this.page.waitForTimeout(200);
    }
    await this.page.locator(`button:has-text("${day}")`).first().click();
    await this.page.waitForTimeout(500);
    await this.page.locator('body').click();
    const matchingCells = await this.page.locator(`tbody tr td:nth-child(${columnIndex + 1})`).allInnerTexts();
    
    const found = matchingCells.some(text => text.trim() === dateString);
    expect(found).toBeTruthy();
  };

  async filterTableByColumnAndAssert(columnIndex, valueToFilter) {
    const filterInput = this.page.locator(`thead tr th:nth-child(${columnIndex + 1}) input`);
    await filterInput.fill(valueToFilter);
    await this.page.waitForTimeout(500); 
    const matchingCells = await this.page.locator(`tbody tr td:nth-child(${columnIndex + 1})`).allInnerTexts();

    const found = matchingCells.some(text => text.trim() === valueToFilter);
    expect(found).toBeTruthy();
  }
}