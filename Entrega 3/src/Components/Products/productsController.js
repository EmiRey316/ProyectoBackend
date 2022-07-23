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
                role: user.role,
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
                role: user.role,
                product,
                count: product.stock > 0 ? 1:0
            });    
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
            role: user.role,
        })
    }


    //Para incorporar productos al listado (disponible para administradores), retorna el id con el que se guarda.
    async createProduct(req, res) {
        let product = req.body;
        const id = await ProductsDao.save(product);
        res.redirect("/products/"+id);
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