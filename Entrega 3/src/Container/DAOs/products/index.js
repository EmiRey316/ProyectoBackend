const moment = require("moment")

const MongoDB = require("../../index.js");
const { ProductSchema } = require("../../../Models/mongoModels.js")

class ProductsDao extends MongoDB {
    //Edita un registro por su id.
    edit = async(id, record) => {
        try {
            let timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
            
            await this.model.updateOne({id: id}, {$set: record, timestamp});
        } catch(err) {
            console.log("No se pudo editar el producto", err);
            return "No se pudo editar el producto";
        }
    }
}

module.exports = new ProductsDao("products", ProductSchema);