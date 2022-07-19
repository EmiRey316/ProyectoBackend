const handlebars = require("express-handlebars");

const { app, server } = require("./server.js");
const Routes = require("./Routes");


Routes(app);



////////////////////////////////////////////
//               Handlebars               //
////////////////////////////////////////////
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/Views");
app.set("view engine", "handlebars");


// ////////////////////////////////////////////
// //           Graceful shutdown            //
// ////////////////////////////////////////////

// function gracefulShutdown() {
//     DBClient.close()
//         .then(() => {
//             console.info('Thanks for using this server, goodbye :)');
//         })
//         .catch(error => {
//             console.error('There was an error shutting down the server, ' + error);
//         });
// }

// process.on('exit', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGKILL', gracefulShutdown);
// process.on('SIGINT', gracefulShutdown);
// process.on('uncaughtException', gracefulShutdown);