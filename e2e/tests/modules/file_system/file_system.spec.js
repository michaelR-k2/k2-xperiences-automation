import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, FileSystemPage } from "../../../pages";

let basePage;
let file_systemPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("File System - Casos de prueba relacionados a la vista de Archivos del Sistema");
  await allure.suite("File_system");
  await allure.tags("e2e", "file_system");
  basePage = new BasePage(page);
  file_systemPage = new FileSystemPage(page);
});