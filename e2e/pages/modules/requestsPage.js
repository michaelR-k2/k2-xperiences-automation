import { locator, page, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class RequestsPage extends BasePage {
  constructor(page) {
    super(page);
    //Form creation Locators.
    this.statusButton = page.locator('label:text("Status")').locator('..').locator('button');
    this.requestChannelButton = page.locator('label:text("Request channel")').locator('..').locator('button');
    this.requestTypeButton = page.locator('label:text("Type")').locator('..').locator('button');
    this.requestTravelApproachButton =  page.locator('label:text("Travel Approach")').locator('..').locator('button');
    this.searchInput = page.locator('input[placeholder="Search ..."]');
    this.requestDepartureCountryInput = page.locator('label:text("Departure country")').locator('..').locator('input');
    this.requestDestinationCountryInput = page.locator('label:text("Destination country")').locator('..').locator('input');
    this.requestTravelStartDateInput = page.locator('input[placeholder="Estimate travel start date"]');
    this.requestTravelEndDateInput = page.locator('input[placeholder="Estimate travel end date"]');
    this.datepicker = page.locator('.react-datepicker[role="dialog"]');
    this.requestPackagesButton =  page.locator('label:text("Packages")').locator('..').locator('button');
    this.requestLengthButton =  page.locator('label:text("Length")').locator('..').locator('button');
    this.requestMealsButton =  page.locator('label:text("Meals")').locator('..').locator('button');
    this.requestBudgetButton =  page.locator('label:text("Budget")').locator('..').locator('button');
    this.requestSpecialRequestsTextarea =  page.locator('label:text("Special requests")').locator('..').locator('textarea');
    //Edit Request Button.
    this.editRequestButton = page.locator('button:has-text("Edit request")');
  }

  async openCreatedRequest(){
    await this.page.locator('tbody tr').first().locator('button').click();
    const actionsMenu = this.page.locator('div[role="menu"]', { hasText: 'Actions' });
    await actionsMenu.waitFor({ state: 'visible' });
    await this.page.locator('a[role="menuitem"]', { hasText: 'View' }).click();
    await this.page.waitForTimeout(1500);
  }

  async createNewRequest(requestInfo) {
    await this.fillContactInfoSection(requestInfo.contactInfo);
    await this.statusButton.click();
    await this.page.locator('div[data-radix-popper-content-wrapper] div', { hasText: new RegExp(`^${requestInfo.status}$`, 'i') }).click();
    await this.requestChannelButton.click();
    await (await this.selectDropdownOption(requestInfo.request_channel)).click();
    await this.requestTypeButton.click();
    await this.page.locator('div[data-radix-popper-content-wrapper] div', { hasText: new RegExp(`^${requestInfo.type}$`, 'i') }).click();
    await this.requestTravelApproachButton.click();
    await this.searchInput.fill(requestInfo.travel_approach);
    await this.dropdownContainer.locator('div.overflow-hidden > div[role="listbox"]', { hasText: new RegExp(`^${requestInfo.travel_approach}$`, 'i') }).first().click();
    await this.page.click('body'); 
    await this.requestDepartureCountryInput.fill(requestInfo.departure_country); 
    await this.requestDepartureCountryInput.press('Enter');
    await this.page.click('body'); 
    await this.requestDestinationCountryInput.fill(requestInfo.destination_country);
    await this.requestDestinationCountryInput.press('Enter');
    await this.page.click('body'); 
    await this.requestTravelEndDateInput.click();
    await expect(this.datepicker).toBeVisible();
    await this.page.click('body');
    await this.requestPackagesButton.click();
    await this.page.locator('div[data-radix-popper-content-wrapper] div', { hasText: new RegExp(`^${requestInfo.packages}$`, 'i') }).click();
    await this.requestLengthButton.click();
    await this.page.locator('div[data-radix-popper-content-wrapper] div', { hasText: new RegExp(`^${requestInfo.length}$`, 'i') }).click();
    await this.requestMealsButton.click();
    await this.searchInput.fill(requestInfo.meals);
    await this.dropdownContainer.locator('div.overflow-hidden > div[role="listbox"]', { hasText: new RegExp(`^${requestInfo.meals}$`, 'i') }).first().click();
    await this.page.click('body');
    await this.requestBudgetButton.click();
    await this.page.locator('div[data-radix-popper-content-wrapper] div', { hasText: new RegExp(`^${requestInfo.budget}$`, 'i') }).click();
    await this.requestSpecialRequestsTextarea.fill(requestInfo.special_request);
    await this.submitButton.click();
  };

  async editRequest (requestInfo) {
    await this.contactInfoEmail.fill(requestInfo.email);
    await this.generalPhoneInput.first().fill(requestInfo.phone);
    await this.contactInfoName.fill(`${requestInfo.name} - Edited`);
    await this.submitButton.click();
  }
}