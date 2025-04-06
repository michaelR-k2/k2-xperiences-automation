const fs = require('fs');

async function globalTeardown() {
    // Eliminar el archivo de sesión después de la ejecución
    if (fs.existsSync('storageState.json')) {
        fs.unlinkSync('storageState.json');
        console.log('\nSesión Finalizada de forma correcta 🔽');
    }
}

module.exports = globalTeardown;