const CartsDao = require("../../Container/DAOs/cart");
const ProductsDao = require("../../Container/DAOs/products");

const logger = require("../../Utils/logger.js");

class Cart {
    //Crear cart para el usuario en específico
    async createCart(req, res) {
        try {
            const user = await req.user;
            await CartsDao.save({user: user.id , products: []})
        } catch (error) {
            logger.error("Error al hacer login", {error})
        }
    }

    //Vacía un carrito y lo elimina.
    async deleteCart(req, res) {
        await CartsDao.deleteRecord(req.cid);
        res.send(`Carrito con id ${req.cid} eliminado correctamente`);
    }


    //Permite listar todos los productos guardados en el carrito
    async getCart(req, res) {
        let cart = await CartsDao.getRecord(req.cid);
        res.send(cart.products);
    }


    //Para incorporar productos al carrito por su id de producto
    async addProductToCart(req, res) {
        //Existe el producto indicado?
        let product = req.body;
        let pIndex = await ProductsDao.exist(product.id);
        if(pIndex == -1) return res.send(`No existe ningún producto con id ${product.id} en el listado`);

        await CartsDao.addProductToCart(req.cid, product)
        res.send(`Fueron añadidas ${product.quantity} unidades del producto con id ${product.id} al carrito ${req.cid}`)
    }


    //Eliminar un producto del carrito por su id de carrito y de producto
    async deleteProductFromCart(req, res) {    
        //El producto indicado se encuentra agregado al carrito?
        let pid = req.params.pid
        let pIndexInCart = await CartsDao.productIsInCart(req.cid, pid);
        if(pIndexInCart == -1) return res.send(`El producto con id ${pid} no se encuentra en el carrito ${req.cid}`);

        await CartsDao.deleteProductFromCart(req.cid, pIndexInCart);
        res.send(`El producto con id ${pid} fue eliminado correctamente del carrito ${req.cid}`);
    }
}



module.exports = new Cart;