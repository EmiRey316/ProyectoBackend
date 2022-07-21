const MongoDB = require("../../index.js");
const { CartsSchema } = require("../../../models/mongoModels.js");
const logger = require("../../../Utils/logger.js");



class CartsDao extends MongoDB {
    findByUser = async(userId) => {
        try {
            return await this.model.findOne({user: userId});
        } catch (error) {
            logger.error("No se pudo buscar el carrito por usuario", error)
        }
    }

    productIsInCart = async(cartId, productId) => {
        try {
            let cart = await this.getRecord(cartId);
            //Retorna el index donde se encuentra el producto, -1 si no existe.
            return cart.products.findIndex(e => e.id == productId);
        } catch (err) {
            logger.error("No se pudo buscar el producto en el carrito", err);
            return "No se pudo buscar el producto en el carrito";
        }
    }

    addProductToCart = async(cartId, item) => {
        try {
            let cart = await this.getRecord(cartId);
        
            let productsInCart = cart.products;
            let productIndex = productsInCart.findIndex(e => e.product.id == item.product.id);

            if(productIndex == -1) {
                productsInCart.push(item);
            } else {
                productsInCart[productIndex].quantity += item.quantity;
            }

            await this.model.updateOne({id: cartId}, {$set: {products: productsInCart}});
        } catch (err) {
            logger.error("No se pudo agregar el producto al carrito", err);
            return "No se pudo agregar el producto al carrito";
        }
    }

    deleteProductFromCart = async(cartId, productIndexInCart) => {
        try {
            let cart = await this.getRecord(cartId);
            let productsInCart = cart.products;
            productsInCart.splice(productIndexInCart, 1)
            await this.model.updateOne({id: cartId}, {$set: {products: productsInCart}});    
        } catch (err) {
            logger.error("No se pudo eliminar el producto del carrito", err);
            return "No se pudo eliminar el producto del carrito";
        }
    }
}



module.exports = new CartsDao("carts", CartsSchema);