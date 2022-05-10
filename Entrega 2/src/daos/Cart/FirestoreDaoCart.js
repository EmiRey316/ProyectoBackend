const FirestoreContainer = require("../../containers/FirestoreContainer");



class CartsDaoFirestore extends FirestoreContainer {
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

            const doc = this.query.doc(`${cartId}`)
            await doc.update({products: productsInCart});
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



let CartsDao = new CartsDaoFirestore("carts");

module.exports = CartsDao;