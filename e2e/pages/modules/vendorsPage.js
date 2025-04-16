import { locator, page, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class VendorsPage extends BasePage {
  constructor(page) {
    super(page);
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
}