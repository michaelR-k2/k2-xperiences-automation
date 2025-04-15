import { locator, page, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class FileSystemPage extends BasePage {
  constructor(page) {
    super(page);

  }
}