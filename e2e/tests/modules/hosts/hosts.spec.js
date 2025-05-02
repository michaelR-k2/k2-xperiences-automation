import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
import { BasePage, HostsPage } from "../../../pages";
import { countries, services, testHost } from '../../../support/constants/constants';

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
let hostsPage;
let vendorData = {
  name: generateCleanName(),
  location: countries[Math.floor(Math.random() * countries.length)],
  services: ["Host"],
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
  hostsPage = new HostsPage(page);
});

test("@Hosts - Validar que la tabla contenga los encabezados correctos", async ({page}) => {
  await allure.story("Encabezados en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    const expectedHeaders = ["ID", "Vendor", "Added on", "Location", "Services", "Email", "Phone", "Website", "Status"];
    const actualHeaders = await hostsPage.getTableHeaders();
    expect(actualHeaders).toEqual(expectedHeaders);
    }
  );
});

test('@Hosts - Validar que el contador de paginas se actualice al modificar el numero de elementos mostrados por pagina', async ({ page }) => {
    await allure.story("Pruebas de paginación");
    await allure.step(`Step 1 - Cambiar el número de Elementos desplegados por pagina y validar el contador de Paginas`,async () => {
      await page.goto(`${process.env.BASEURL}/vendors/hosts`);
      await page.waitForURL("/vendors/hosts");
      const originalTotalPages = await hostsPage.getTotalPagesCount();
      await hostsPage.changeRowsPerPage(50);
      const updatedTotalPages = await hostsPage.getTotalPagesCount();
      expect(updatedTotalPages).toBeLessThanOrEqual(originalTotalPages);
    }
  );
});

test('@Hosts - Validar que se pueda navegar hasta la ultima pagina', async ({ page }) => {
  await allure.story("Pruebas de paginación");
  await allure.step(`Step 1 - hacer click en el boton de ir a la ultima pagina validar el contador de Paginas`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    const totalPages = await hostsPage.getTotalPagesCount();
    if (totalPages > 1) {
      await hostsPage.goToLastPage();
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

test('@Hosts - Validar que se pueda navegar a la siguiente pagina', async ({ page }) => {
  await allure.story("Pruebas de paginación");
  await allure.step(`Step 1 - Hacer click en el boton de ir a la siguiente pagina y validar el contador de Paginas`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    const totalPages = await hostsPage.getTotalPagesCount();
    if (totalPages > 1) {
      await hostsPage.goToNextPage();
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

test('@Hosts - Validar que se pueda navegar hasta la ultima pagina y de regreso a la primera', async ({ page }) => {
  await allure.story("Pruebas de paginación");
  await allure.step(`Step 1 - hacer click en el boton de ir a la ultima pagina validar el contador de Paginas`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    const totalPages = await hostsPage.getTotalPagesCount();
    if (totalPages > 1) {
      await hostsPage.goToLastPage();
      await page.waitForFunction(
        (expectedTotal) => {
          const match = document.body.innerText.match(/Page (\d+) of/);
          return match && parseInt(match[1]) === expectedTotal;
        },
        totalPages
      );
      expect(await page.locator('text=Page').nth(1).textContent()).toContain(`Page ${totalPages} of`);
      await hostsPage.goToFirstPage();
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

test("@Hosts - Verificación del flujo de Creación de un Proveedor nuevo", async ({ page }) => {
  await allure.story('Se crea un Proovedor de forma Exitosa');
  await allure.step(`Step 1 - Creación de un nuevo Proveedor`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors/create`);
    await page.waitForURL("/vendors/create");
    await hostsPage.createVendor(vendorData);
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await expect(await hostsPage.getVendorRowTable(vendorData.name)).toHaveText(vendorData.name);
  });
});

test("@Hosts - Validar que la tabla de usuarios de Proveedores tenga al menos un registro", async ({page}) => {
  await allure.story("Lista de proveedores desplegados en la tabla");
  await allure.step(`Step 1 - Validación de filas en la tabla`,async () => {
      await page.goto(`${process.env.BASEURL}/vendors/hosts`);
      await page.waitForURL("/vendors/hosts");
      const vendorsCount = await hostsPage.getTableRowsCount();
      expect(vendorsCount).toBeGreaterThan(0);
    }
  );
});

test.skip("@Hosts - Verificación del flujo de Edición de un Proveedor", async ({ page }) => {
  await allure.story('Se Edita un Proovedor de forma Exitosa');
  await allure.step(`Step 1 - Edición del registro de un Proveedor`, async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await hostsPage.filterTableByColumnAndAssert(2, testHost.name);
    const vendorId = await hostsPage.openEditVendorByName(testHost.name);
    await page.goto(`${process.env.BASEURL}/vendors/${vendorId}/edit`);
    await page.waitForURL(`/vendors/${vendorId}/edit`);
    await hostsPage.editVendor(vendorData);
  });
});

test("@Hosts - Validar que la tabla de proveedores pueda ser filtrada por ID", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await hostsPage.filterTableByColumnAndAssert(1, testHost.id);
    }
  );
});

test("@Hosts - Validar que la tabla de proveedores pueda ser filtrada por Proveedor", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await hostsPage.filterTableByColumnAndAssert(2, testHost.name);
    }
  );
});

test("@Hosts - Validar que la tabla de proveedores pueda ser filtrada por Dia de Creación", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await hostsPage.filterByDateAndAssert(3, testHost.createdAt);
    }
  );
});

test("@Hosts - Validar que la tabla de proveedores pueda ser filtrada por Status", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await hostsPage.filterTableByStatusAndAssert(9, testHost.status);
    }
  );
});

test("@Hosts - Validar que la tabla de proveedores pueda ser filtrada por Location", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await hostsPage.filterTableByColumnAndAssert(4, testHost.location);
    }
  );
});

test("@Hosts - Validar que la tabla de proveedores pueda ser filtrada por Servicios", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await hostsPage.filterTableByColumnAndAssert(5, testHost.services);
    }
  );
});

test("@Hosts - Validar que la tabla de proveedores pueda ser filtrada por Email", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await hostsPage.filterTableByColumnAndAssert(6, testHost.email);
    }
  );
});

test("@Hosts - Validar que la tabla de proveedores pueda ser filtrada por Phone", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await hostsPage.filterTableByColumnAndAssert(7, testHost.phone);
    }
  );
});

test("@Hosts - Validar que la tabla de proveedores pueda ser filtrada por Website", async ({page}) => {
  await allure.story("Aplicando filtros en la tabla de Proveedores");
  await allure.step(`Step 1 - Validación data desplegada en la tabla luego de aplicar un filtro`,async () => {
    await page.goto(`${process.env.BASEURL}/vendors/hosts`);
    await page.waitForURL("/vendors/hosts");
    await hostsPage.filterTableByColumnAndAssert(8, testHost.website);
    }
  );
});