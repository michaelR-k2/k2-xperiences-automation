import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, ExperiencesPage } from "../../../pages";
import { testExperience, itinerarios } from '../../../support/constants/constants';

let basePage;
let experiencesPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Experiences - Casos de prueba relacionados a la vista de Experiencias");
  await allure.suite("Experiences");
  await allure.tags("e2e", "experiences");
  basePage = new BasePage(page);
  experiencesPage = new ExperiencesPage(page);
});

test("@experiences - Validar que la tabla  de Experiencias tenga al menos un registro", async ({page}) => {
  await allure.story("Transacciones desplegadas en la tabla");
  await allure.step(`Step 1 - Validación de Transacciones mostradas en la tabla`,async () => {
      await page.goto(`${process.env.BASEURL}/experiences`);
      await page.waitForURL("/experiences");
      const experiencesCount = await experiencesPage.getTableRowsCount();
      expect(experiencesCount).toBeGreaterThan(0);
    }
  );
});

test("@experiences - Validar que la tabla de experiencias pueda ser filtrada por ID", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/experiences`);
    await page.waitForURL("/experiences");
    await experiencesPage.filterTableByColumnAndAssert(1, testExperience.id);
    }
  );
});

test("@experiences - Validar que la tabla de experiencias pueda ser filtrada por Dia de Creación", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/experiences`);
    await page.waitForURL("/experiences");
    await experiencesPage.filterByDateAndAssert(2, testExperience.createdAt);
    }
  );
});

test("@experiences - Validar que la tabla de experiencias pueda ser filtrada por Nombre de Experiencia", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/experiences`);
    await page.waitForURL("/experiences");
    await experiencesPage.filterTableByColumnAndAssert(3, testExperience.name);
    }
  );
});

test("@experiences - Validar que la tabla de experiencias pueda ser filtrada por Destino", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/experiences`);
    await page.waitForURL("/experiences");
    await experiencesPage.filterTableByColumnAndAssert(4, testExperience.destination);
    }
  );
});

test("@experiences - Validar que la tabla de experiencias pueda ser filtrada por Valor inicial", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/experiences`);
    await page.waitForURL("/experiences");
    await experiencesPage.filterTableByColumnAndAssert(7, testExperience.startingAt);
    }
  );
});

test("@experiences - Validar que la tabla de experiencias pueda ser filtrada por el estado de la Experiencia", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/experiences`);
    await page.waitForURL("/experiences");
    await experiencesPage.filterTableByStatusAndAssert(8, testExperience.status);
    }
  );
});



test.skip("@experiences - Verificación del flujo de Edición de una Experiencia", async ({ page }) => {
  await allure.story('Se Edita una Experiencia de forma Exitosa');
  await allure.step(`Step 1 - Edición del registro de una experiencia`, async () => {
    await page.goto(`${process.env.BASEURL}/experiences`);
    await page.waitForURL("/experiences");
    const experienceId = await experiencesPage.openEditExperienceByName(testExperience.name);
    await page.goto(`${process.env.BASEURL}/experiences/${experienceId}/edit`);
    await page.waitForURL(`/experiences/${experienceId}/edit`);
    await experiencesPage.editExperience(testExperience);
    await page.goto(`${process.env.BASEURL}/experiences`);
    await page.waitForURL("/experiences");
    await expect(await vendorsPage.getVendorRowTable(testExperience.name)).toHaveText(testExperience.name);
  });
});
