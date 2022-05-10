const { ProductsDao } = require("../daos/index.js")



//Permite listar todos los productos disponibles
const getAllProducts = async(req, res) => {
    let data = await ProductsDao.read();
    if(data.length == 0) return res.send({msj: "No hay productos para mostrar"})
    res.send(data);
}


//Permite listar un producto por su id
const getProductById = async(req, res) => {
    let product = await ProductsDao.getRecord(req.pid);
    res.send(product);
}


//Para incorporar productos al listado (disponible para administradores), retorna el id con el que se guarda.
const createProduct = async(req, res) => {
    let product = req.body;
    res.json(await ProductsDao.save(product));
}


//Actualiza un producto por su id (disponible para administradores)
const editProduct = async(req, res) => {
    let product = req.body;
    await ProductsDao.edit(req.pid, product);
    res.send(`El producto con id ${req.pid} fue editado correctamente`)
}


//Borra un producto por su id (disponible para administradores)
const deleteProduct = async(req, res) => {
    await ProductsDao.deleteRecord(req.pid);
    res.send(`El producto con id ${req.pid} fue eliminado correctamente del listado`)
}



module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
}