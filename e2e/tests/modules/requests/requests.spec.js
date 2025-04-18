import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, RequestsPage } from "../../../pages";
import { testRequest } from '../../../support/constants/constants';

let basePage;
let requestsPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Requests - Casos de prueba relacionados a la vista de Requerimientos");
  await allure.suite("Requests");
  await allure.tags("e2e", "requests");
  basePage = new BasePage(page);
  requestsPage = new RequestsPage(page);
});

test("@requests - Validar que la tabla  de Solicitudes tenga al menos un registro", async ({page}) => {
  await allure.story("Transacciones desplegadas en la tabla");
  await allure.step(`Step 1 - Validación de Transacciones mostradas en la tabla`,async () => {
      await page.goto(`${process.env.BASEURL}/requests`);
      await page.waitForURL("/requests");
      const requestsCount = await requestsPage.getTableRowsCount();
      expect(requestsCount).toBeGreaterThan(0);
    }
  );
});

test("@requests - Validar que la tabla contenga los encabezados correctos", async ({page}) => {
  await allure.story("Encabezados en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    const expectedHeaders = [
      "ID", 
      "Creation at", 
      "Request channel", 
      "Type", 
      "Experience", 
      "Departure", 
      "Destination", 
      "Packages", 
      "Length", 
      "Meals", 
      "Approach", 
      "Budget", 
      "Department", 
      "Contact name", 
      "Email",
      "Phone",
      "Status"
    ];
    const actualHeaders = await requestsPage.getTableHeaders();
    expect(actualHeaders).toEqual(expectedHeaders);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por ID", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(1, testRequest.id);
    }
  );
});

test.skip("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Dia de Creación", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterByDateAndAssert(2, testRequest.createdAt);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Canal de Solicitud", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(3, testRequest.requestChannel);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Tipo", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(4, testRequest.type);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Experiencia", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(5, testRequest.experience);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Lugar de Salida", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(6, testRequest.departure);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Destino", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(7, testRequest.destination);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Paquetes/equipaje", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(8, testRequest.packages);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Duración", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(9, testRequest.lenght);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Alimentos", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(10, testRequest.meals);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por tipo de Viaje", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(11, testRequest.approach);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Presupuesto", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(12, testRequest.budget);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Departamento", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(13, testRequest.department);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Nombre de Contacto", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(14, testRequest.contactName);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Email", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(15, testRequest.email);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Telefono", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(16, testRequest.phone);
    }
  );
});

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Estado", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.filterTableByColumnAndAssert(17, testRequest.status);
    }
  );
});

