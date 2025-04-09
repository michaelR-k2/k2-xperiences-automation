import { locator, page, expect } from "@playwright/test";

export default class VendorsPage {
  constructor(page) {
    this.page = page;
    this.createVendorButton = page.locator('div.w-full.flex.flex-col.sm\\:flex-row.sm\\:items-center > button.app-button');
    this.nameInput = page.locator('input#name');
    this.selectCountryButton = page.locator('div:has(label[for="location"]) > button');
    this.searchCountryInput = page.locator('input[placeholder="Search country..."]');
    this.dropdownContainer = page.locator('div[data-side="bottom"]');
    this.selectServicesButton = page.locator('div:has(label[for="services"]) > button');
    this.searchServiceInput = page.locator('input[placeholder="Search country..."]');
    this.searchPhoneButton = page.locator('div.PhoneInput  > button[aria-haspopup="dialog"]');
  }

  async createVendor(vendorData) {
    await this.nameInput.fill(vendorData.name);
    await this.selectCountryButton.click();
    await this.searchCountryInput.fill(vendorData.location);
    await this.dropdownContainer.locator('div.overflow-hidden > div span.text-sm', { hasText: new RegExp(`^${vendorData.location}$`, 'i') }).click();
    await this.selectServicesButton.click();
    /*
    for (const service of vendorData.services) {
      await this.searchServiceInput.fill(service);
      await this.dropdownContainer
        .locator('div.overflow-hidden > div[role="listbox"]', { hasText: new RegExp(`^${service}$`, 'i') })
        .click();
    }
    */
  }
  async editVendor(vendorData) {
    await this.nameInput.fill(`${vendorData.name} - Edited`);
    await this.selectCountryButton.click();
    await this.searchCountryInput.fill(vendorData.location);
    await this.dropdownContainer.locator('div.overflow-hidden > span.text-sm', { hasText: new RegExp(`^${vendorData.location}$`, 'i') }).click();
    await this.selectServicesButton.click();
    /*
    for (const service of vendorData.services) {
      await this.selectServicesButton.click();
      await this.searchServiceInput.fill(service);
      await this.dropdownContainer
        .locator('div.overflow-hidden > div[role="listbox"]', { hasText: new RegExp(`^${service}$`, 'i') })
        .click();
    }
    */
  }
}