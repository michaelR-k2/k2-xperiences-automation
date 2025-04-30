import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, VendorsPage } from "../../../pages";
import { countries, services, testVendor } from '../../../support/constants/constants';

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
  location: countries[Math.floor(Math.random() * countries.length)],
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
  await allure.epic("Vendors - Casos de prueba relacionados a la vista de Proveedores");
  await allure.feature("Proveedores");
  await allure.suite("Vendors");
  await allure.tags("e2e", "vendors");
  basePage = new BasePage(page);
  vendorsPage = new VendorsPage(page);
});

test("@vendors - Validar que la tabla contenga los encabezados correctos", async ({page}) => {
  await allure.story("Encabezados en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    const expectedHeaders = ["ID", "Vendor", "Added on", "Location", "Services", "Email", "Phone", "Website", "Status"];
    const actualHeaders = await vendorsPage.getTableHeaders();
    expect(actualHeaders).toEqual(expectedHeaders);
    }
  );
});

test('@vendors - Validar que el contador de paginas se actualice al modificar el numero de elementos mostrados por pagina', async ({ page }) => {
    await allure.story("Pruebas de paginación");
    await allure.step(`Step 1 - Cambiar el número de Elementos desplegados por pagina y validar el contador de Paginas`,async () => {
      await page.goto(`${process.env.BASEURL}/vendors`);
      await page.waitForURL("/vendors");
      const originalTotalPages = await vendorsPage.getTotalPagesCount();
      await vendorsPage.changeRowsPerPage(50);
      const updatedTotalPages = await vendorsPage.getTotalPagesCount();
      expect(updatedTotalPages).toBeLessThanOrEqual(originalTotalPages);
    }
  );
});

test('@vendors - Validar que se pueda navegar hasta la ultima pagina', async ({ page }) => {
  await allure.story("Pruebas de paginación");
  await allure.step(`Step 1 - hacer click en el boton de ir a la ultima pagina validar el contador de Paginas`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    const totalPages = await vendorsPage.getTotalPagesCount();
    if (totalPages > 1) {
      await vendorsPage.goToLastPage();
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

test('@vendors - Validar que se pueda navegar a la siguiente pagina', async ({ page }) => {
  await allure.story("Pruebas de paginación");
  await allure.step(`Step 1 - Hacer click en el boton de ir a la siguiente pagina y validar el contador de Paginas`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    const totalPages = await vendorsPage.getTotalPagesCount();
    if (totalPages > 1) {
      await vendorsPage.goToNextPage();
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

test('@vendors - Validar que se pueda navegar hasta la ultima pagina y de regreso a la primera', async ({ page }) => {
  await allure.story("Pruebas de paginación");
  await allure.step(`Step 1 - hacer click en el boton de ir a la ultima pagina validar el contador de Paginas`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    const totalPages = await vendorsPage.getTotalPagesCount();
    if (totalPages > 1) {
      await vendorsPage.goToLastPage();
      await page.waitForFunction(
        (expectedTotal) => {
          const match = document.body.innerText.match(/Page (\d+) of/);
          return match && parseInt(match[1]) === expectedTotal;
        },
        totalPages
      );
      expect(await page.locator('text=Page').nth(1).textContent()).toContain(`Page ${totalPages} of`);
      await vendorsPage.goToFirstPage();
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

test("@vendors - Verificación del flujo de Creación de un Proveedor nuevo", async ({ page }) => {
  await allure.story('Se crea un Proovedor de forma Exitosa');
  await allure.step(`Step 1 - Creación de un nuevo Proveedor`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors/create`);
    await page.waitForURL("/vendors/create");
    await vendorsPage.createVendor(vendorData);
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await expect(await vendorsPage.getVendorRowTable(vendorData.name)).toHaveText(vendorData.name);
  });
});

test("@vendors - Validar que la tabla de usuarios de Proveedores tenga al menos un registro", async ({page}) => {
  await allure.story("Lista de proveedores desplegados en la tabla");
  await allure.step(`Step 1 - Validación de filas en la tabla`,async () => {
      await page.goto(`${process.env.BASEURL}/vendors`);
      await page.waitForURL("/vendors");
      const vendorsCount = await vendorsPage.getTableRowsCount();
      expect(vendorsCount).toBeGreaterThan(0);
    }
  );
});

test("@vendors - Verificación del flujo de Edición de un Proveedor", async ({ page }) => {
  await allure.story('Se Edita un Proovedor de forma Exitosa');
  await allure.step(`Step 1 - Edición del registro de un Proveedor`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await vendorsPage.filterTableByColumnAndAssert(2, testVendor.name);
    const vendorId = await vendorsPage.openEditVendorByName('Vendor Test - Edit created Vendor');
    await page.goto(`${process.env.BASEURL}/vendors/${vendorId}/edit`);
    await page.waitForURL(`/vendors/${vendorId}/edit`);
    await vendorsPage.editVendor(vendorData);
  });
});

test("@vendors - Validar que la tabla de proveedores pueda ser filtrada por ID", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await vendorsPage.filterTableByColumnAndAssert(1, testVendor.id);
    }
  );
});

test("@vendors - Validar que la tabla de proveedores pueda ser filtrada por Proveedor", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await vendorsPage.filterTableByColumnAndAssert(2, testVendor.name);
    }
  );
});

test("@vendors - Validar que la tabla de proveedores pueda ser filtrada por Dia de Creación", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await vendorsPage.filterByDateAndAssert(3, testVendor.createdAt);
    }
  );
});

test("@vendors - Validar que la tabla de proveedores pueda ser filtrada por Status", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await vendorsPage.filterTableByStatusAndAssert(9, testVendor.status);
    }
  );
});

test("@vendors - Validar que la tabla de proveedores pueda ser filtrada por Location", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await vendorsPage.filterTableByColumnAndAssert(4, testVendor.location);
    }
  );
});

test("@vendors - Validar que la tabla de proveedores pueda ser filtrada por Servicios", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await vendorsPage.filterTableByColumnAndAssert(5, testVendor.services);
    }
  );
});

test("@vendors - Validar que la tabla de proveedores pueda ser filtrada por Email", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await vendorsPage.filterTableByColumnAndAssert(6, testVendor.email);
    }
  );
});

test("@vendors - Validar que la tabla de proveedores pueda ser filtrada por Phone", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await vendorsPage.filterTableByColumnAndAssert(7, testVendor.phone);
    }
  );
});

test("@vendors - Validar que la tabla de proveedores pueda ser filtrada por Website", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors`);
    await page.waitForURL("/vendors");
    await vendorsPage.filterTableByColumnAndAssert(8, testVendor.website);
    }
  );
});
// Pendiente de Casos de Prueba relacionados a Paginación 