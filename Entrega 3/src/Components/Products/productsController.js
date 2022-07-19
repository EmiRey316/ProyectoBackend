const ProductsDao = require("../../Container/DAOs/products")
const logger = require("../../Utils/logger.js");


class Products {
    //Permite listar todos los productos disponibles
    async getAllProducts(req, res) {
        try {    
            const productsList = await ProductsDao.read();
            const user = await req.user;
            res.render("products/products", {
                title: "Productos",
                name: user.name.split(" ")[0],
                avatar: user.avatar,
                productsList});
        } catch (error) {
            logger.error("Error al cargar productos", {error});
        }
    }


    //Permite listar un producto por su id
    async getProductById(req, res) {
        try {
            let product = await ProductsDao.getRecord(req.pid);
            const user = await req.user;
            res.render("products/productDetails", {
                title: "Producto" + req.pid,
                name: user.name.split(" ")[0],
                avatar: user.avatar,
                product});    
        } catch (error) {
            logger.error("Error al cargar producto", {error})
        }
    }


    async getCreateProduct(req, res) {
        const user = await req.user;
        res.render("products/newProduct", {
            title: "Nuevo Producto",
            name: user.name.split(" ")[0],
            avatar: user.avatar,
        })
    }


    //Para incorporar productos al listado (disponible para administradores), retorna el id con el que se guarda.
    async createProduct(req, res) {
        let product = req.body;
        const id = await ProductsDao.save(product);
        const user = req.user;
        res.render("/products/productDetails", {
            title: "Producto" + id,
            name: user.name,
            avatar: user.avatar,
            product
        })
    }


    //Actualiza un producto por su id (disponible para administradores)
    async editProduct(req, res) {
        let product = req.body;
        await ProductsDao.edit(req.pid, product);
        res.send(`El producto con id ${req.pid} fue editado correctamente`)
    }


    //Borra un producto por su id (disponible para administradores)
    async deleteProduct(req, res) {
        await ProductsDao.deleteRecord(req.pid);
        res.send(`El producto con id ${req.pid} fue eliminado correctamente del listado`)
    }

}



module.exports = new Products;