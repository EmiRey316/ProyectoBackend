const MemoryContainer = require("../../containers/MemoryContainer.js");


class CartsDaoMemory extends MemoryContainer {
    productIsInCart = (id, productId) => {
        try {
            let index = this.storage.findIndex(e => e.id == id);
            return this.storage[index].products.findIndex(e => e.id == productId);
        } catch (err) {
            console.log("No se pudo buscar el producto en el carrito", err);
            return "No se pudo buscar el producto en el carrito";
        }
    }

    addProductToCart = (id, product) => {
        try {
            let index = this.storage.findIndex(e => e.id == id);
            let productIndex = this.productIsInCart(id, product.id);

            if(productIndex == -1) {
                this.storage[index].products.push(product);
            } else {
                this.storage[index].products[productIndex].quantity += product.quantity;
            }

        } catch (err) {
            console.log("No se pudo agregar el producto al carrito", err);
            return "No se pudo agregar el producto al carrito";
        }
    }

    deleteProductFromCart = (id, productIndexInCart) => {
        try {
            let index = this.storage.findIndex(e => e.id == id);
            this.storage[index].products.splice(productIndexInCart, 1)  
        } catch (err) {
            console.log("No se pudo eliminar el producto del carrito", err);
            return "No se pudo eliminar el producto del carrito";
        }
    }
}


let CartsDao = new CartsDaoMemory();

module.exports = CartsDao;