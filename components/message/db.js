const db = require('mongoose')
db.Promise = global.Promise;

async function connect(cadena) {
    await db.connect(cadena, {
        useNewUrlParser: true
    });
    console.log("[db] conectada con éxito");
}

module.exports = connect;

