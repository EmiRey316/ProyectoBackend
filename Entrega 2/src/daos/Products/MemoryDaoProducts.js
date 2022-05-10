const moment = require("moment");

const MemoryContainer = require("../../containers/MemoryContainer.js");


class ProductDaoMemory extends MemoryContainer {
    //Edita un registro por su id.
    edit = async(id, record) => {
        try {
            let index = this.storage.findIndex(e => e.id == id);
            let timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
            this.storage[index] = {id, timestamp, ...record};
        } catch(err) {
            console.log("No se pudo editar el producto", err);
            return "No se pudo editar el producto";
        }
    }
}

let ProductsDao = new ProductDaoMemory("./src/Persistence/productsList.txt");

module.exports = ProductsDao;