import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, TripUsersPage } from "../../../pages";
import { testTripUser } from '../../../support/constants/constants';

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
      const userCount = await trip_usersPage.getTableRowsCount();
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

test("@trip_users - Validar que la tabla de de Usuarios de Viaje pueda ser filtrada por ID", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla Usuarios de Viaje");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/trip-users`);
    await page.waitForURL("/trip-users");
    await trip_usersPage.filterTableByColumnAndAssert(1, testTripUser.id);
    }
  );
});

test("@trip_users - Validar que la tabla de de Usuarios de Viaje pueda ser filtrada por Nombre", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla Usuarios de Viaje");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/trip-users`);
    await page.waitForURL("/trip-users");
    await trip_usersPage.filterTableByColumnAndAssert(2, testTripUser.name);
    }
  );
});

test("@trip_users - Validar que la tabla de de Usuarios de Viaje pueda ser filtrada por Email", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla Usuarios de Viaje");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/trip-users`);
    await page.waitForURL("/trip-users");
    await trip_usersPage.filterTableByColumnAndAssert(3, testTripUser.email);
    }
  );
});

test("@trip_users - Validar que la tabla de de Usuarios de Viaje pueda ser filtrada por Identificación", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla Usuarios de Viaje");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/trip-users`);
    await page.waitForURL("/trip-users");
    await trip_usersPage.filterTableByColumnAndAssert(4, testTripUser.identification);
    }
  );
});

test("@trip_users - Validar que la tabla de de Usuarios de Viaje pueda ser filtrada por Pais", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla Usuarios de Viaje");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/trip-users`);
    await page.waitForURL("/trip-users");
    await trip_usersPage.filterTableByColumnAndAssert(6, testTripUser.country);
    }
  );
});

test("@trip_users - Validar que la tabla de de Usuarios de Viaje pueda ser filtrada por telefono", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla Usuarios de Viaje");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/trip-users`);
    await page.waitForURL("/trip-users");
    await trip_usersPage.filterTableByColumnAndAssert(7, testTripUser.phone);
    }
  );
});

test("@trip_users - Validar que la tabla de de Usuarios de Viaje pueda ser filtrada por Fecha de Cumpleaños", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla Usuarios de Viaje");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/trip-users`);
    await page.waitForURL("/trip-users");
    await trip_usersPage.filterByDateAndAssert(8, testTripUser.birthDate);
    }
  );
});

// Pendiente de Casos de Prueba relacionados a Paginación 

