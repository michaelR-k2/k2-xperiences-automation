import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, ProjectsPage } from "../../../pages";
import { testProject } from '../../../support/constants/constants';

let basePage;
let projectsPage;

test.beforeEach(async ({ page, context }) => {
  await allure.epic("Projects - Casos de prueba relacionados a la vista de Proyectos");
  await allure.suite("Projects");
  await allure.tags("e2e", "projects");
  basePage = new BasePage(page);
  projectsPage = new ProjectsPage(page);
});

test("@projects - Validar que la tabla  de Proyectos tenga al menos un registro", async ({page}) => {
  await allure.story("Transacciones desplegadas en la tabla");
  await allure.step(`Step 1 - Validación de Transacciones mostradas en la tabla`,async () => {
      await page.goto(`${process.env.BASEURL}/projects`);
      await page.waitForURL("/projects");
      const requestsCount = await projectsPage.getTableRowsCount();
      expect(requestsCount).toBeGreaterThan(0);
    }
  );
});

test("@projects - Validar que la tabla contenga los encabezados correctos", async ({page}) => {
  await allure.story("Encabezados en la tabla de Solicitudes");
  await allure.step(`Step 1 - Validación data desplegada en la tabla`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    const expectedHeaders = [
      "ID", 
      "Creation date", 
      "PM name", 
      "Type", 
      "Project name", 
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
      "MC Person",
      "Phone",
      "PO Quantity",
      "Status"
    ];
    const actualHeaders = await projectsPage.getTableHeaders();
    expect(actualHeaders).toEqual(expectedHeaders);
    }
  );
});

test('@projects - Validar que el contador de paginas se actualice al modificar el numero de elementos mostrados por pagina', async ({ page }) => {
  await allure.story("Pruebas de paginación");
  await allure.step(`Step 1 - Cambiar el número de Elementos desplegados por pagina y validar el contador de Paginas`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    const originalTotalPages = await projectsPage.getTotalPagesCount();
    await projectsPage.changeRowsPerPage(50);
    const updatedTotalPages = await projectsPage.getTotalPagesCount();
    expect(updatedTotalPages).toBeLessThanOrEqual(originalTotalPages);
  }
);
});

test('@projects - Validar que se pueda navegar hasta la ultima pagina', async ({ page }) => {
await allure.story("Pruebas de paginación");
await allure.step(`Step 1 - hacer click en el boton de ir a la ultima pagina validar el contador de Paginas`, async () => {
  await page.goto(`${process.env.BASEURL}/projects`);
  await page.waitForURL("/projects");
  const totalPages = await projectsPage.getTotalPagesCount();
  if (totalPages > 1) {
    await projectsPage.goToLastPage();
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

test('@projects - Validar que se pueda navegar a la siguiente pagina', async ({ page }) => {
await allure.story("Pruebas de paginación");
await allure.step(`Step 1 - Hacer click en el boton de ir a la siguiente pagina y validar el contador de Paginas`, async () => {
  await page.goto(`${process.env.BASEURL}/projects`);
  await page.waitForURL("/projects");
  const totalPages = await projectsPage.getTotalPagesCount();
  if (totalPages > 1) {
    await projectsPage.goToNextPage();
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

test('@projects - Validar que se pueda navegar hasta la ultima pagina y de regreso a la primera', async ({ page }) => {
await allure.story("Pruebas de paginación");
await allure.step(`Step 1 - hacer click en el boton de ir a la ultima pagina validar el contador de Paginas`, async () => {
  await page.goto(`${process.env.BASEURL}/projects`);
  await page.waitForURL("/projects");
  const totalPages = await projectsPage.getTotalPagesCount();
  if (totalPages > 1) {
    await projectsPage.goToLastPage();
    await page.waitForFunction(
      (expectedTotal) => {
        const match = document.body.innerText.match(/Page (\d+) of/);
        return match && parseInt(match[1]) === expectedTotal;
      },
      totalPages
    );
    expect(await page.locator('text=Page').nth(1).textContent()).toContain(`Page ${totalPages} of`);
    await projectsPage.goToFirstPage();
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

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por ID", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(1, testProject.id);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por nombre de PM", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(3, testProject.pmName);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Tipo", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(4, testProject.type);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Nombre de Proyecto", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(5, testProject.projectName);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Experiencia", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(6, testProject.experience);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Lugar de Salida", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(7, testProject.departure);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Destino", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(8, testProject.destination);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Equipajes/paquetes", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(9, testProject.packages);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Duración", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(10, testProject.lenght);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Alimentación", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(11, testProject.meals);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Typo de Viaje", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(12, testProject.approach);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Budget", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(13, testProject.budget);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Departamento", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(14, testProject.department);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Nombre de Contacto", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(15, testProject.contactName);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por MC Person", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(16, testProject.mcPerson);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Telefono", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(17, testProject.phone);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por PO Quantity", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByColumnAndAssert(18, testProject.poQuantity);
    }
  );
});

test("@projects - Validar que la tabla de Proyectos pueda ser filtrada por Estado", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proyectos");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/projects`);
    await page.waitForURL("/projects");
    await projectsPage.filterTableByStatusAndAssert(19, testProject.status);
    }
  );
});