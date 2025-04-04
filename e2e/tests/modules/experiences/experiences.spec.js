import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, ExperiencesPage } from "../../../pages";

let basePage;
let experiencesPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Experiences - Casos de prueba relacionados a la vista de Experiencias");
  await allure.suite("Experiences");
  await allure.tags("e2e", "experiences");
  basePage = new BasePage(page);
  experiencesPage = new ExperiencesPage(page);
});