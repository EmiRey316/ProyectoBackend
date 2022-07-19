const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const compression = require("compression");

const config = require("./Config/index.js");
const passport = require("./Components/Session/Passport");
const { logger } = require("./Utils/logger.js");
const { consoleLogger }  = require("./Components/Middlewares")


////////////////////////////////////////////
//      Inicialización del servidor       //
////////////////////////////////////////////

const app = express();
let server = app.listen(config.PORT, () => {
    logger.info(`Server on PORT: ${config.PORT}, with PROCESS: ${config.PID}`);
})    


// const clusterInit = () => {
//     if(cluster.isMaster) {
//         logger.info(`Master ${process.pid} is running`)

//         for(let i = 0; i < numCPUs; i++) {
//             cluster.fork();
//         }

//         cluster.on("exit", (worker, code, signal) => {
//             logger.info(`Worker ${worker.process.pid} stop`);
//             cluster.fork();
//         })

//     } else {
//         server = app.listen(config.PORT, config.HOST, () => {
//             logger.info(`Server on HOST: ${config.HOST} and PORT: ${config.PORT}, with PROCESS: ${process.pid}`)
//         })
//     }
// }


// //Selección del tipo dependiendo del MODE.
// switch(config.MODE) {
//     case "CLUSTER":
//         clusterInit();
//         break;
//     case "FORK":
//         forkInit();
//         break;
//     default:
//         forkInit();
//         break;
// }


////////////////////////////////////////////
//      Configuraciones del servidor      //
////////////////////////////////////////////

app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(compression());
app.use(consoleLogger)

//Para que los res.json se vean mejor en el browser.
app.set("json spaces", 2);

//Protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send("Fallo en el Servidor");
});



////////////////////////////////////////////
//            Conexión MongoDB            //
////////////////////////////////////////////
(async () => {
    try {
        await mongoose.connect(config.MONGO_ATLAS_URL);
        logger.info("Base Mongo conectada");
    
    } catch(error) {
        logger.error("No se pudo conectar a la base Mongo", {error})
    }
})()



////////////////////////////////////////////
//       Inicialización del session       //
////////////////////////////////////////////

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        mongoOptions: advancedOptions
    }),

    secret: config.SECRET,
    cookie: {maxAge: 6000000}, //10 min de session
    rolling: true,
    resave: true,
    saveUninitialized: true
}))



////////////////////////////////////////////
//                Passport                //
////////////////////////////////////////////

app.use(passport.initialize());
app.use(passport.session());




module.exports = {app, server};