const admin = require("firebase-admin")
const moment = require("moment");

class FirestoreContainer {
    constructor(collection) {
        this.db = admin.firestore();
        this.query = this.db.collection(collection);
    }

    //Leer el archivo.
    read = async() => {
        try {
            const querySnapshot = await this.query.get();
            let docs = querySnapshot.docs;
            const response = docs.map((doc) =>({id: doc.id, ...doc.data()}))
            return response;
        } catch(err) {
            return []
        }
    }

    //Guardar un nuevo dato en el archivo, generando su id.
    save = async(record) => {
        try {
            let data = await this.read();
            
            //Generación del id para este registro.
            let id;
            if(data.length == 0) {
                id = 1;
            } else {
                id = parseInt(data[data.length - 1].id) + 1;
            }

            let timestamp = moment().format("DD/MM/YYYY HH:mm:ss");

            let doc = this.query.doc(`${id}`);
            await doc.create({timestamp, ...record});
            return id;
        } catch(err) {
            console.log("No se pudo guardar", err);
            return "No se pudo guardar";
        }
    }

    //Método que verifica si existe id y retorna el index.
    exist = async(id) => {
        try {
            const doc = this.query.doc(`${id}`);
            const item = await doc.get();
            return item.data()
        } catch(err) {
            console.log("Error al buscar id", err);
            return "Error al buscar id";
        }
    }
    
    //Retorna el valor que tiene id requerido, o -1 si no se encuentra.
    getRecord = async(id) => {
        try {
            let item = {id: id, ...await this.exist(id)}
            return item;
        } catch(err) {
            console.log("Error al buscar registro", err);
            return "Error al buscar registro";
        }
    }

    //Elimina del archivo el registro indicado por id.
    deleteRecord = async(id) => {
        try {
            const doc = this.query.doc(`${id}`);
            await doc.delete();
        } catch(err) {
            console.log("No se pudo borrar el registro", err);
            return "No se pudo borrar el registro";
        }
    }

    //Elimina todo el archivo.
    // deleteAll = async() => {
    //     try {
    //         await fs.promises.unlink(this.name);
    //     } catch(err) {
    //         console.error("No se pudo borrar el archivo", err);
    //         return "No se pudo borrar el archivo";
    //     }
    // }
}

module.exports = FirestoreContainer;