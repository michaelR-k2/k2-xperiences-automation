import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, VendorsPage } from "../../../pages";
import { countires, services } from '../../../support/constants/constants';

function getRandomServices(serviceList) {
  let shuffled = serviceList.sort(() => 0.5 - Math.random());
  let count = Math.floor(Math.random() * serviceList.length) + 1;
  return shuffled.slice(0, count);
};

function generateCleanName() {
  let fullName = faker.person.fullName();
  return fullName.replace(/[^a-zA-Z\s]/g, "");
}

let basePage;
let vendorsPage;
let vendorData = {
  name: generateCleanName(),
  location: countires[Math.floor(Math.random() * countires.length)],
  services: getRandomServices(services),
  status: "active",
  contactVendorName: generateCleanName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number("### ### ####"),
  website: faker.internet.url(),
  vendorDescription: faker.lorem.sentence(),
  InternalNotes: faker.lorem.sentence(),
};

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Vendors - Casos de prueba relacionados a la vista de Vendedores");
  await allure.suite("Vendors");
  await allure.tags("e2e", "vendors");
  basePage = new BasePage(page);
  vendorsPage = new VendorsPage(page);
});


test("@vendors - Verificación del flujo de Creación de un Proveedor nuevo", async ({ page }) => {
  await allure.story('Se crea un Proovedor de forma Exitosa');
  await allure.step(`Step 1 - Creación de un nuevo Proveedor`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors/create`);
    await page.waitForURL("/vendors/create");
    await vendorsPage.createVendor(vendorData);
  });
});