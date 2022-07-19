const mongoose = require("mongoose");

const { logger } = require("../Utils/logger")


module.exports = class MongoDB {
    constructor(collection, schema) {
        this.collection = collection;
        this.schema = schema;
        this.model = mongoose.model(collection, schema)
    }

    read = async() => {
        try {
            let content = await this.model.find({}, {_id: 0, __v: 0});
            if(content.length == 0) return {}
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

            await this.model.create({id, ...record});
            return id;
        } catch(error) {
            logger.error("No se pudo guardar en base", {error})
        }
    }

    findById = async(id) => {
        try {
            return await this.model.findOne({id: id});
        } catch (error) {
            logger.error("No se pudo buscar al usuario en base", {error})
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
