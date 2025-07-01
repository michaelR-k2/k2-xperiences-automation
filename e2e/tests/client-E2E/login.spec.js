import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, LoginPage } from "../../pages";

const imaps = require("imap-simple");
const { simpleParser } = require("mailparser");

let loginPage;
let basePage;
let user = { 
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12, memorable: true }),
};
const config = {
  imap: {
    user: 'mrios@k2con.com',
    password: 'm3354rMUZ24D!',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 3000
  }
};

/*
async function leerTokenGmail() {
  const connection = await imaps.connect(config);
  await connection.openBox('INBOX');

  const searchCriteria = ['UNSEEN'];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: true };

  const results = await connection.search(searchCriteria, fetchOptions);

  for (const res of results.reverse()) {
    const parsed = await simpleParser(res.parts.find(p => p.which === 'TEXT').body);
    const match = parsed.text.match(/\b\d{6}\b/);
    if (match) return match[0];
  }

  return null;
}


test.beforeEach(async ({ page, context }) => {
  await allure.epic("Login de Clientes - Casos de prueba relacionados a inicio de Sesión");
  await allure.feature('Inicio de sesión Clientes');
  await allure.suite("Login");
  await allure.tags("e2e", "login");
  loginPage = new LoginPage(page);
  basePage = new BasePage(page);
  await context.clearCookies();
  await context.clearPermissions();
  await allure.step(`Step 1 - La pagina de inicio de Sesión se carga correctamente en el Navegador.`, async () => {
      await loginPage.goToClientLoginPage();
      expect(await basePage.getCurrentUrl()).toContain(process.env.BASEURL);
    }
  );
});

test.skip("@login - Verificación de inicio de sesion con usuario existente", async ({ page }) => {
  await allure.story('El usuario Inicia sesion de manera exitosa');
  await allure.step(`Step 2 - Validacion con Usuario y contraseña Validos`, async () => {
    await loginPage.loginToXperiences();
    await page.waitForSelector('a[href*="/dashboard"]', { state: 'visible' });
    expect(await basePage.getCurrentUrl()).toContain(`${process.env.BASEURL}/dashboard`);
  });
});

*/
