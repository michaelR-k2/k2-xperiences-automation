import { locator, page, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class ExperiencesPage extends BasePage {
  constructor(page) {
    super(page);

  }

  async openEditExperienceByName(experience){
    const row = await this.page.locator('tbody tr', { hasText: experience }).first();
    const idCell = await row.locator('td').nth(1);
    const id = await idCell.textContent();
    return id?.trim();
  };
}
