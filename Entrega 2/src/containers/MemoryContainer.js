const moment = require("moment");

class MemoryContainer {
    constructor() {
        this.storage = [];
    }

    //Leer el archivo.
    read = () => {
        try {
            return this.storage;
        } catch(err) {
            console.error("No se pudo obtener el listado", err)
        }
    }

    //Guardar un nuevo dato en el archivo, generando su id.
    save = (record) => {
        try {
            //Generación del id para este registro.
            let id;
            if(this.storage.length == 0) {
                id = 1;
            } else {
                id = this.storage[this.storage.length - 1].id + 1;
            }

            let timestamp = moment().format("DD/MM/YYYY HH:mm:ss");

            this.storage.push({id, timestamp, ...record});
            return id;
        } catch(err) {
            console.log("No se pudo guardar", err);
            return "No se pudo guardar";
        }
    }

    //Método que verifica si existe id y retorna el index.
    exist = (id) => {
        try {
            return (this.storage.findIndex(e => e.id == id) != -1)
        } catch(err) {
            console.log("Error al buscar id", err);
            return "Error al buscar id";
        }
    }
    
    //Retorna el valor que tiene id requerido, o -1 si no se encuentra.
    getRecord = (id) => {
        try {
            let index = this.storage.findIndex(e => e.id == id);
            return this.storage[index];
        } catch(err) {
            console.log("Error al buscar registro", err);
            return "Error al buscar registro";
        }
    }

    //Elimina del archivo el registro indicado por id.
    deleteRecord = (id) => {
        try {
            let index = this.storage.findIndex(e => e.id == id);
            this.storage.splice(index, 1);
        } catch(err) {
            console.log("No se pudo borrar el registro", err);
            return "No se pudo borrar el registro";
        }
    }

    //Elimina todo el archivo.
    deleteAll = () => {
        try {
            this.storage = [];
        } catch(err) {
            console.error("No se pudo borrar el archivo", err);
            return "No se pudo borrar el archivo";
        }
    }
}

module.exports = MemoryContainer;