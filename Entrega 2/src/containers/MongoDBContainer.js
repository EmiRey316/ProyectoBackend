const mongoose = require("mongoose");
const moment = require("moment");

class MongoContainer {
    constructor(collection, schema) {
        this.schema = schema;
        this.collection = collection;
        this.model = mongoose.model(collection, schema)
    }

    //Leer el archivo.
    read = async() => {
        try {
            let content = await this.model.find({}, {_id: 0, __v: 0});
            return content
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
                id = data[data.length - 1].id + 1;
            }

            let timestamp = moment().format("DD/MM/YYYY HH:mm:ss");

            await this.model.create({id, timestamp, ...record});
            return id;
        } catch(err) {
            console.log("No se pudo guardar", err);
            return "No se pudo guardar";
        }
    }

    //Método que verifica si existe id y retorna el index.
    exist = async(id) => {
        try {
            return await this.model.findOne({id: id})
        } catch(err) {
            console.log("Error al buscar id", err);
            return "Error al buscar id";
        }
    }
    
    //Retorna el valor que tiene id requerido, o -1 si no se encuentra.
    getRecord = async(id) => {
        try {
            return await this.model.findOne({id: id}, {}, {_id: 0, __v: 0});
        } catch(err) {
            console.log("Error al buscar registro", err);
            return "Error al buscar registro";
        }
    }

    //Elimina del archivo el registro indicado por id.
    deleteRecord = async(id) => {
        try {
            await this.model.deleteOne({id: id});
        } catch(err) {
            console.log("No se pudo borrar el registro", err);
            return "No se pudo borrar el registro";
        }
    }

    //Elimina todo el archivo.
    deleteAll = async() => {
        try {
            await this.model.drop();
        } catch(err) {
            console.error("No se pudo borrar el archivo", err);
            return "No se pudo borrar el archivo";
        }
    }
}

module.exports = MongoContainer;