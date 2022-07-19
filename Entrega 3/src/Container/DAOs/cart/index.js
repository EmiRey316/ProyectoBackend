const MongoDB = require("../../index.js");
const { CartsSchema } = require("../../../models/mongoModels.js");
const logger = require("../../../Utils/logger.js");



class CartsDao extends MongoDB {
    productIsInCart = async(cartId, productId) => {
        try {
            let cart = await this.getRecord(cartId);
            //Retorna el index donde se encuentra el producto, -1 si no existe.
            return cart.products.findIndex(e => e.id == productId);
        } catch (err) {
            console.log("No se pudo buscar el producto en el carrito", err);
            return "No se pudo buscar el producto en el carrito";
        }
    }

    addProductToCart = async(cartId, product) => {
        try {
            let cart = await this.getRecord(cartId);
        
            let productsInCart = cart.products;
            let productIndex = productsInCart.findIndex(e => e.id == product.id);

            if(productIndex == -1) {
                productsInCart.push(product);
            } else {
                productsInCart[productIndex].quantity += product.quantity;
            }

            await CartsDao.model.updateOne({id: cartId}, {$set: {products: productsInCart}});
        } catch (err) {
            console.log("No se pudo agregar el producto al carrito", err);
            return "No se pudo agregar el producto al carrito";
        }
    }

    deleteProductFromCart = async(cartId, productIndexInCart) => {
        try {
            let cart = await this.getRecord(cartId);
            let productsInCart = cart.products;
            productsInCart.splice(productIndexInCart, 1)
            await CartsDao.model.updateOne({id: cartId}, {$set: {products: productsInCart}});    
        } catch (err) {
            console.log("No se pudo eliminar el producto del carrito", err);
            return "No se pudo eliminar el producto del carrito";
        }
    }
}



module.exports = new CartsDao("carts", CartsSchema);