import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, TripUsersPage } from "../../../pages";

let basePage;
let trip_usersPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Trip Users - Casos de prueba relacionados a la vista de Usuarios de Viaje");
  await allure.suite("Trip_users");
  await allure.tags("e2e", "trip_users");
  basePage = new BasePage(page);
  trip_usersPage = new TripUsersPage(page);
});