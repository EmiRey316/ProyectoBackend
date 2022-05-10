const fs = require("fs")

const ArchiveContainer = require("../../containers/ArchiveContainer.js");


class CartsDaoArchive extends ArchiveContainer {
    productIsInCart = async(id, productId) => {
        try {
            let data = await this.read();
            let index = data.findIndex(e => e.id == id);
            return data[index].products.findIndex(e => e.id == productId);
        } catch (err) {
            console.log("No se pudo buscar el producto en el carrito", err);
            return "No se pudo buscar el producto en el carrito";
        }
    }

    addProductToCart = async(id, product) => {
        try {
            let data = await this.read();
            let index = data.findIndex(e => e.id == id);
            let productIndex = await this.productIsInCart(id, product.id);

            if(productIndex == -1) {
                data[index].products.push(product);
            } else {
                data[index].products[productIndex].quantity += product.quantity;
            }

            await fs.promises.writeFile(this.path, JSON.stringify(data));
        } catch (err) {
            console.log("No se pudo agregar el producto al carrito", err);
            return "No se pudo agregar el producto al carrito";
        }
    }

    deleteProductFromCart = async(id, productIndexInCart) => {
        try {
            let data = await this.read();
            let index = data.findIndex(e => e.id == id);
            data[index].products.splice(productIndexInCart, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(data));    
        } catch (err) {
            console.log("No se pudo eliminar el producto del carrito", err);
            return "No se pudo eliminar el producto del carrito";
        }
    }
}


let CartsDao = new CartsDaoArchive("./src/Persistence/cartsList.txt");

module.exports = CartsDao;