import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, VendorsPage } from "../../../pages";

let basePage;
let vendorsPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Vendors - Casos de prueba relacionados a la vista de Vendedores");
  await allure.suite("Vendors");
  await allure.tags("e2e", "vendors");
  basePage = new BasePage(page);
  vendorsPage = new VendorsPage(page);
});