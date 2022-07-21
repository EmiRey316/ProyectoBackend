const mongoose = require("mongoose");
const moment = require("moment");

const { logger } = require("../Utils/logger")


module.exports = class MongoDB {
    constructor(collection, schema) {
        this.collection = collection;
        this.schema = schema;
        this.model = mongoose.model(collection, schema)
    }

    read = async() => {
        try {
            //lean() permite usar correctamente el this.key de un objeto en Handlebars, sin eso da error. 
            let content = await this.model.find({}, {_id: 0, __v: 0}).lean();
            return content
        } catch(error) {
            logger.error("No se pudo hacer lectura de la base", {error})
        }
    }

    save = async(record) => {
        try {
            let lastId = await this.model.find({}, {id: 1, _id: 0}).sort({id: -1}).limit(1); //Solo traigo el id del último registro
            let id;
            if(lastId.length == 0) {
                id = 1;
            } else {
                id = lastId[0].id + 1;
            }

            const timestamp = moment().format('DD MM YYYY, hh:mm:ss')
            await this.model.create({id, createdAt: timestamp, ...record});
            return id;
        } catch(error) {
            logger.error("No se pudo guardar en base", {error})
        }
    }

    findById = async(id) => {
        try {
            return await this.model.findOne({id: id}, {_id: 0, __v: 0});
        } catch (error) {
            logger.error("No se pudo buscar al usuario en base", {error})
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
            return await this.model.findOne({id: id}, {}, {_id: 0, __v: 0}).lean();
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
    

    deleteAll = async() => {
        try {
            await await this.model.drop();
        } catch(error) {
            logger.error("No se pudo borrar el documento", {error})
        }
    }
}
