import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, RequestsPage, ProjectsPage } from "../../../pages";
import { testRequest, requestCreationTestData } from '../../../support/constants/constants';

let basePage;
let requestsPage;
let projectsPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Requests - Casos de prueba relacionados a la vista de Requerimientos");
  await allure.suite("Requests");
  await allure.tags("e2e", "requests");
  basePage = new BasePage(page);
  requestsPage = new RequestsPage(page);
  projectsPage = new ProjectsPage(page);
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

test('@requests - Validar que el contador de paginas se actualice al modificar el numero de elementos mostrados por pagina', async ({ page }) => {
    await allure.story("Pruebas de paginación");
    await allure.step(`Step 1 - Cambiar el número de Elementos desplegados por pagina y validar el contador de Paginas`,async () => {
      await page.goto(`${process.env.BASEURL}/requests`);
      await page.waitForURL("/requests");
      const originalTotalPages = await requestsPage.getTotalPagesCount();
      await requestsPage.changeRowsPerPage(50);
      const updatedTotalPages = await requestsPage.getTotalPagesCount();
      expect(updatedTotalPages).toBeLessThanOrEqual(originalTotalPages);
    }
  );
});

test('@requests - Validar que se pueda navegar hasta la ultima pagina', async ({ page }) => {
  await allure.story("Pruebas de paginación");
  await allure.step(`Step 1 - hacer click en el boton de ir a la ultima pagina validar el contador de Paginas`, async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    const totalPages = await requestsPage.getTotalPagesCount();
    if (totalPages > 1) {
      await requestsPage.goToLastPage();
      await page.waitForFunction(
        (expectedTotal) => {
          const match = document.body.innerText.match(/Page (\d+) of/);
          return match && parseInt(match[1]) === expectedTotal;
        },
        totalPages
      );
      const paginationText = await page.locator('text=Page').nth(1).textContent();
      expect(paginationText).toContain(`Page ${totalPages} of`);
    }
  });
});

test('@requests - Validar que se pueda navegar a la siguiente pagina', async ({ page }) => {
  await allure.story("Pruebas de paginación");
  await allure.step(`Step 1 - Hacer click en el boton de ir a la siguiente pagina y validar el contador de Paginas`, async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    const totalPages = await requestsPage.getTotalPagesCount();
    if (totalPages > 1) {
      await requestsPage.goToNextPage();
      await page.waitForFunction(
        (expectedTotal) => {
          const match = document.body.innerText.match(/Page (\d+) of/);
          return match && parseInt(match[1]) === expectedTotal;
        },
        2
      );
      const paginationText = await page.locator('text=Page').nth(1).textContent();
      expect(paginationText).toContain(`Page 2 of`);
      }
  });
});

test('@requests - Validar que se pueda navegar hasta la ultima pagina y de regreso a la primera', async ({ page }) => {
  await allure.story("Pruebas de paginación");
  await allure.step(`Step 1 - hacer click en el boton de ir a la ultima pagina validar el contador de Paginas`, async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    const totalPages = await requestsPage.getTotalPagesCount();
    if (totalPages > 1) {
      await requestsPage.goToLastPage();
      await page.waitForFunction(
        (expectedTotal) => {
          const match = document.body.innerText.match(/Page (\d+) of/);
          return match && parseInt(match[1]) === expectedTotal;
        },
        totalPages
      );
      expect(await page.locator('text=Page').nth(1).textContent()).toContain(`Page ${totalPages} of`);
      await requestsPage.goToFirstPage();
      await page.waitForFunction(
        (expectedTotal) => {
          const match = document.body.innerText.match(/Page (\d+) of/);
          return match && parseInt(match[1]) === expectedTotal;
        },
        1
      );
      expect(await page.locator('text=Page').nth(1).textContent()).toContain(`Page 1 of`);
    }
  });
});

test("@requests - Validar el flujo de Creación de una nueva Solicitud (Request)", async ({page}) => {
  await allure.story("Flujo de Creación de una nueva Request/Solicitud");
  await allure.step(`Step 1 - Ir al formulario de Creación y Llenar los campos requeridos`,async () => {
    await page.goto(`${process.env.BASEURL}/requests/create`);
    await page.waitForURL("/requests/create");
    await requestsPage.createNewRequest(requestCreationTestData);
    await requestsPage.openCreatedRequest();
    const specialRequestsSection = page.locator('div.text-sm.font-medium.text-gray-900', { hasText: 'Special requests' });
    const specialRequestsText = await specialRequestsSection.locator('div.text-sm.text-gray-500').textContent();
    expect(specialRequestsText).toContain(requestCreationTestData.special_request);
    }
  );
});

test("@requests - Validar el flujo de Edición de una Solicitud (Request) Existente", async ({page}) => {
  await allure.story("Flujo de Edición de una Request/Solicitud");
  await allure.step(`Step 1 - Ir al formulario de Edición y modificar los campos requeridos`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.openCreatedRequest();
    await requestsPage.editRequestButton.click();
    await requestsPage.editRequest(requestCreationTestData.contactInfo);
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    await requestsPage.openCreatedRequest();
    await requestsPage.editRequestButton.click();
    await expect(requestsPage.contactInfoName).toHaveValue(`${requestCreationTestData.contactInfo.name} - Edited`);
    }
  );
});

test("@requests - Validar que al cambiar el estado de un Request a Aprobado, esté sea visible en la lista de Proyectos", async ({page}) => {
  await allure.story("Validación de Request Aprobados en la vista de Proyectos");
  await allure.step(`Step 1 - Cambiar el estado del request a aprobado`,async () => {
    await page.goto(`${process.env.BASEURL}/requests`);
    await page.waitForURL("/requests");
    const  requestID = await requestsPage.getFirstIdFromTable(2);
    test.info().annotations.push({ type: 'requestID', description: requestID });
    await requestsPage.openCreatedRequest();
    await requestsPage.editRequestButton.click();
    await requestsPage.statusButton.click();
    await page.locator('div[data-radix-popper-content-wrapper] div', { hasText: 'Accepted' }).first().click();
    await requestsPage.submitButton.click();
    await page.waitForTimeout(1000);
    }
  );
  await allure.step(`Step 2 - Validar el ID del primer elemento de la vista de proyectos`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    const requestID = test.info().annotations.find(a => a.type === 'requestID')?.description;
    const projectsID = await projectsPage.getFirstIdFromTable(2);
    expect(projectsID).toBe(requestID);
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

test("@requests - Validar que la tabla de Solicitudes pueda ser filtrada por Dia de Creación", async ({page}) => {
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
    await requestsPage.filterTableByStatusAndAssert(17, testRequest.status);
    }
  );
});

