const { request } = require('@playwright/test');
const fs = require('fs');
require('dotenv').config();

async function globalSetup() {
    const context = await request.newContext();
    
    const response = await context.post(`${process.env.BASEURL}/login`, {
        headers: {
            'accept': process.env.CONTENT_TYPE,
            'content-type':  process.env.CONTENT_TYPE
        },
        data: {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSWORD,
            remember: false
        }
    });

    if (!response.ok()) {
        throw new Error(`Login failed with status ${response.status()}`);
    } else {
        console.info("Usuario autenticado Exitosamente 🔼");
    }

    const cookies = await context.storageState();
    
    // Guardamos la sesión en un archivo JSON
    fs.writeFileSync('storageState.json', JSON.stringify(cookies));
}

module.exports = globalSetup;