const fs = require("fs")
const moment = require("moment");

const ArchiveContainer = require("../../containers/ArchiveContainer.js");


class ProductDaoArchive extends ArchiveContainer {
    //Edita un registro por su id.
    edit = async(id, record) => {
        try {
            let data = await this.read();
            let index = data.findIndex(e => e.id == id);
            let timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
            data[index] = {id, timestamp, ...record};
    
            await fs.promises.writeFile(this.path, JSON.stringify(data));
        } catch(err) {
            console.log("No se pudo editar el producto", err);
            return "No se pudo editar el producto";
        }
    }
}

let ProductsDao = new ProductDaoArchive("./src/Persistence/productsList.txt");

module.exports = ProductsDao;