require("dotenv").config()

//Inicio Base según elegida.
const DBClient = require("./connections/index.js");

//Inicio Servidor
const server = require("./server.js");


//Graceful shutdown
function gracefulShutdown() {
    DBClient.close()
        .then(() => {
            console.info('Thanks for using this server, goodbye :)');
        })
        .catch(error => {
            console.error('There was an error shutting down the server, ' + error);
        });
}

process.on('exit', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGKILL', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('uncaughtException', gracefulShutdown);