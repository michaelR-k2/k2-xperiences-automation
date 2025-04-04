import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, DashboardPage } from "../../../pages";

let basePage;
let dashboardPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Dashboard - Casos de prueba relacionados al dashboard");
  await allure.suite("Dashboard");
  await allure.tags("e2e", "dashboard");
  basePage = new BasePage(page);
  dashboardPage = new DashboardPage(page);
});