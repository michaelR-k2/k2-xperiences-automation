import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, RequestsPage } from "../../../pages";

let basePage;
let requestsPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Requests - Casos de prueba relacionados a la vista de Requerimientos");
  await allure.suite("Requests");
  await allure.tags("e2e", "requests");
  basePage = new BasePage(page);
  requestsPage = new RequestsPage(page);
});