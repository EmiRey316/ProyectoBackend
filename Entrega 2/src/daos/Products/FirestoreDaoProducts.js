const moment = require("moment")

const FirestoreContainer = require("../../containers/FirestoreContainer.js");


class ProductDaoFirestore extends FirestoreContainer {
    //Edita un registro por su id.
    edit = async(id, record) => {
        try {
            const doc = this.query.doc(`${id}`);

            let timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
            
            await doc.update({...record, timestamp});
        } catch(err) {
            console.log("No se pudo editar el producto", err);
            return "No se pudo editar el producto";
        }
    }
}

let ProductsDao = new ProductDaoFirestore("products");

module.exports = ProductsDao;