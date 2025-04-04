import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { BasePage, LoginPage } from "../pages";

let loginPage;
let basePage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Login - Casos de prueba relacionados a inicio de Sesión");
  await allure.suite("Login");
  await allure.tags("e2e", "login");
  loginPage = new LoginPage(page);
  basePage = new BasePage(page);
  await context.clearCookies();
  await context.clearPermissions();
  await allure.step(`Step 1 - La pagina de inicio de Sesión se carga correctamente en el Navegador.`, async () => {
      await loginPage.goToLoginPage();
      expect(await basePage.getCurrentUrl()).toContain(process.env.BASEURL);
    }
  );
});

test("@login - Verificación de inicio de sesion con usuario existente", async ({ page }) => {
  await allure.step(`Step 2 - Validacion con Usuario y contraseña Validos`, async () => {
    await page.getByRole("textbox", { name: "Email" }).click();
    await page.getByRole("textbox", { name: "Email" }).fill(process.env.USER_EMAIL);
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill(process.env.USER_PASSWORD);
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByRole("main")).toContainText("Transactions");
    await expect(page.getByRole("main")).toContainText("Recent Sales");
  });
});


