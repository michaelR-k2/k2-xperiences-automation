import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, ProjectsPage } from "../../../pages";

let basePage;
let projectsPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Projects - Casos de prueba relacionados a la vista de Proyectos");
  await allure.suite("Projects");
  await allure.tags("e2e", "projects");
  basePage = new BasePage(page);
  projectsPage = new ProjectsPage(page);
});