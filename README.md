# K2 Xperiences Automation

Este proyecto contiene pruebas automatizadas con **Playwright** utilizando **JavaScript** y el patrón **Page Object Model (POM)**. Permite la ejecución de pruebas en múltiples navegadores y genera reportes de ejecución.

## 📂 Estructura del Proyecto
```
K2-Xperiences-Automation/
│── .github/              # Configuración para CI/CD
│── e2e/                  # Carpeta principal de pruebas
│   │── pages/            # Clases de Page Object Model
│   │   │── modules/      # Módulos específicos de la aplicación
│   │   │   ├── dashboardPage.js
│   │   │   ├── experiencesPage.js
│   │   │   ├── file_systemPage.js
│   │   │   ├── projectsPage.js
│   │   │   ├── requestsPage.js
│   │   │   ├── trip_usersPage.js
│   │   │   ├── vendorsPage.js
│   │   ├── BasePage.js    # Clase base para POM
│   │   ├── index.js       # Configuración de exportaciones de POM
│   │   ├── LoginPage.js   # Página de login
│   │── support/           # Configuración y hooks de prueba
│   │   ├── setup/        
│   │   ├── teardown/
│   │── tests/             # Pruebas automatizadas
│   │   │── modules/       # Pruebas organizadas por módulos
│   │   │   ├── dashboard/
│   │   │   ├── experiences/
│   │   │   ├── file_system/
│   │   │   ├── projects/
│   │   │   ├── requests/
│   │   │   ├── trip_users/
│   │   │   ├── vendors/
│   │   ├── login.spec.js  # Prueba de login
│── .env                   # Variables de entorno
│── .gitattributes         # Configuración de Git
│── .gitignore             # Archivos a ignorar en Git
│── package-lock.json      # Archivo de bloqueo de dependencias
│── package.json           # Dependencias y scripts
│── playwright.config.js   # Configuración de Playwright
│── README.md              # Documentación del proyecto
```

## 🚀 Instalación
1. Clona este repositorio:
   ```sh
   git clone https://github.com/michaelR-k2/k2-xperiences-automation.git
   cd k2-xperiences-automation
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Instala los navegadores de Playwright:
   ```sh
   npx playwright install
   ```

## 🎯 Ejecución de Pruebas
Ejecutar todas las pruebas:
```sh
npm run test
```

Ejecutar en un navegador específico:
```sh
npm run test:chrome  # Para Chromium
npm run test:firefox  # Para Firefox
npm run test:webkit  # Para WebKit
```

Ejecutar en modo depuración:
```sh
npm run test:debug
```

## 📊 Reportes
Para generar un reporte en HTML después de ejecutar las pruebas:
```sh
npx playwright show-report
```

## 🏗️ Estructura del Código con POM
Ejemplo de una página en `e2e/pages/LoginPage.js`:
```js
class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '[name="username"]';
        this.passwordInput = '[name="password"]';
        this.loginButton = 'button[type="submit"]';
    }
    async navigate(url) {
        await this.page.goto(url);
    }
    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}
module.exports = LoginPage;
```

## 📌 Notas
- Asegúrate de tener **Node.js** instalado antes de ejecutar este proyecto.
- Para integraciones con **Allure Reports** o **GitHub Actions**, comunícate con el equipo de QA.

---
✉️ Para dudas o contribuciones, contacta a [mrios@k2con.com](mailto:tu-email@ejemplo.com).
