import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, DashboardPage } from "../../../pages";

let basePage;
let dashboardPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Dashboard - Casos de prueba relacionados al dashboard");
  await allure.feature("Dashboard");
  await allure.suite("Dashboard");
  await allure.tags("e2e", "dashboard");
  basePage = new BasePage(page);
  dashboardPage = new DashboardPage(page);
});

test("@Dashboard - La vista debe mostrar todas las métricas principales", async ({ page }) => {
  await allure.story( "Todas las metricas son visibles desde la vista del dashboard");
  await allure.step(`Step 1 - Aserciones relacionadas a las tarjetas de Metricas del Dashboard`, async () => {
      await page.goto(`${process.env.BASEURL}/dashboard`);
      await expect(dashboardPage.totalRevenue).toBeVisible();
      await expect(dashboardPage.subscriptions).toBeVisible();
      await expect(dashboardPage.sales).toBeVisible();
      await expect(dashboardPage.activeNow).toBeVisible();
      await expect(dashboardPage.transactionsTable).toBeVisible();
    }
  );
});

test("@Dashboard - Verificar que al hacer click en View All redireccione correctamente a la vista de Requerimientos", async ({ page }) => {
  await allure.story( "Redirección a la vista de Requerimientos");
  await allure.step(`Step 1 - Validación del funcionamiento del boton View all `, async () => {
      await page.goto(`${process.env.BASEURL}/dashboard`);
      await dashboardPage.clickViewAll();
      await expect(page).toHaveURL(`${process.env.BASEURL}/requests`);
    }
  );
});

test("@Dashboard - Debe mostrar al menos una transacción en la tabla de transacciones", async ({ page }) => {
  await allure.story( "Transacciones desplegadas en la tabla");
  await allure.step(`Step 1 - Validación de Transacciones mostradas en la tabla`, async () => {
      await page.goto(`${process.env.BASEURL}/dashboard`);
      const transactions = await dashboardPage.getTransactionCount();
      await expect(transactions).toBeGreaterThan(0);
    }
  );
});
