const moment = require("moment")

const MongoContainer = require("../../containers/MongoDBContainer.js");
const { ProductSchema } = require("../../models/mongoModels.js")

class ProductDaoMongo extends MongoContainer {
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

let ProductsDao = new ProductDaoMongo("products", ProductSchema);

module.exports = ProductsDao;