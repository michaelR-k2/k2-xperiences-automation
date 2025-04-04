import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, LoginPage } from "../pages";

let loginPage;
let basePage;
let user = { 
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12, memorable: true }),
};

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
    await loginPage.loginToXperiences();
    await page.waitForSelector('a[href*="/dashboard"]', { state: 'visible' });
    expect(await basePage.getCurrentUrl()).toContain(`${process.env.BASEURL}/dashboard`);
  });
});

test("@login - Verificación de inicio de sesion con usuario inexistente/invalido", async ({ page }) => {
  await allure.step(`Step 2 - Validacion con Email incorrecto`, async () => {
    await loginPage.loginWithInvalidEmail(user);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("These credentials do not match our records.");
  });
});

test("@login - Verificación de inicio de sesion con usuario existente pero contraseña incorrecta", async ({ page }) => {
  await allure.step(`Step 2 - Validacion con COntraseña Incorrecta`, async () => {
    await loginPage.loginWithInvalidPassword(user);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("These credentials do not match our records.");
  });
});

test("@login - Verificación de mensajes para valores requeridos (Email)", async ({ page }) => {
  await allure.step(`Step 2 - Validacion de campos vacios para el Email`, async () => {
    await loginPage.loginWithEmptyEmail(user);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("The email field is required.");
  });
});

test("@login - Verificación de mensajes para valores requeridos (Password)", async ({ page }) => {
  await allure.step(`Step 2 - Validacion de campos vacios para la contraseña`, async () => {
    await loginPage.loginWithEmptyPassword(user);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("The password field is required.");
  });
});


