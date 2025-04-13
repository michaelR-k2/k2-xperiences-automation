import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, TripUsersPage } from "../../../pages";

let basePage;
let trip_usersPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Trip Users - Casos de prueba relacionados a la vista de Usuarios de Viaje");
  await allure.feature("Trip Users");
  await allure.suite("Trip_users");
  await allure.tags("e2e", "trip_users");
  basePage = new BasePage(page);
  trip_usersPage = new TripUsersPage(page);
});

test("@trip_users - Validar que la tabla de usuarios de Viajes tenga al menos un usuario", async ({page}) => {
  await allure.story("Transacciones desplegadas en la tabla");
  await allure.step(`Step 1 - Validación de Transacciones mostradas en la tabla`,async () => {
      await page.goto(`${process.env.BASEURL}/trip-users`);
      const userCount = await trip_usersPage.getUserCount();
      expect(userCount).toBeGreaterThan(0);
    }
  );
});

test("@trip_users - Validar que la tabla contenga los encabezados correctos", async ({page}) => {
  await allure.story("Encabezados en la tabla de usuarios de Viajes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla`,async () => {
    await page.goto(`${process.env.BASEURL}/trip-users`);
    const expectedHeaders = ["ID", "name", "Email", "Identification", "Address", "Country", "Phone", "Birthdate"];
    const actualHeaders = await trip_usersPage.getTableHeaders();
    expect(actualHeaders).toEqual(expectedHeaders);
    }
  );
});

// Pendiente de Casos de Prueba relacionados a Paginación 

