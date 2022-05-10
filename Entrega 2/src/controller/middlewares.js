const { ProductsDao, CartsDao } = require("../daos/index.js")



//Hasta no tener login, el admin viene por una constante.
const admin = true;



//Middleware de validación de usuario administrador
const validateUser = (req, res, next) => {
    if(!admin) return res.status(401).send({error: -1, descripcion: `Ruta ${req.originalUrl} con método ${req.method} autorizada únicamente para administradores.`})
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
    validateUser,
    validateProductId,
    validateCartId
}