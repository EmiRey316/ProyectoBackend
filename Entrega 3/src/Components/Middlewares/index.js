const { logger } = require("../../Utils/logger.js");
const ProductsDao = require("../../Container/DAOs/products");
const CartsDao = require("../../Container/DAOs/cart");


//Valida que el usuario haya inciado sesión.
const validateSession = (req, res, next) => {
    if(!req.isAuthenticated()) return res.redirect("/login");
    next();
}


//Valida que el usuario no tenga sesión iniciada
const isLogged = (req, res, next) => {
    if(req.isAuthenticated()) return res.redirect("/");
    next();
}


const consoleLogger = (req, res, next) => {
    logger.log("info", `Ruta: ${req.url} - Método: ${req.method}`);
    next();
}


//Middleware de validación de usuario administrador
const validateUser = (req, res, next) => {
    const user = req.user;
    if(user.role != "admin") return res.status(401).send({error: -1, descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada para tu rol.`})
    next();
}


//Middleware de validación de id de producto correcto.
const validateProductId = async(req, res, next) => {
    let pid = req.params.pid||req.body.id;
    if(!await ProductsDao.exist(pid)) return res.status(400).send(`No existe ningún producto con id ${pid} en el listado`);

    req.pid = pid;
    next();
}


//Middleware de validación de id de carrito correcto.
const validateCartId = async(req, res, next) => {
    let cid = req.params.cid;
    if(!await CartsDao.exist(cid)) return res.status(400).send(`No existe ningún carrito con id ${cid} en el listado`);

    req.cid = cid
    next();
}



module.exports = {
    validateSession,
    isLogged,
    consoleLogger,
    validateUser,
    validateProductId,
    validateCartId
};