const express = require("express");

const config = require("../config.json");
const productsRouter  = require("./routes/productsRouter.js");
const cartsRouter  = require("./routes/cartsRouter.js");



////////////////////////////////////////////
//      Inicialización del servidor       //
////////////////////////////////////////////
const app = express();

//Protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send("Fallo en el Servidor");
});

const PORT = process.env.PORT||config.port;
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




////////////////////////////////////////////
//                 ROUTES                 //
////////////////////////////////////////////
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);




//Middleware en caso de que la ruta no se encuentre.
app.use(function(req, res, next) {
    res.status(404).send({error: 404, descripcion: `ruta ${req.originalUrl} con método ${req.method} no implementada`});
    next();
});



module.exports = server;