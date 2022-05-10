const fs = require("fs");
const moment = require("moment");


class ArchiveContainer {
    constructor(path) {
        this.path = path
    }

    //Leer el archivo.
    read = async() => {
        try {
            let content = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
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

            data.push({id, timestamp, ...record});
            await fs.promises.writeFile(this.path, JSON.stringify(data));

            return id;
        } catch(err) {
            console.log("No se pudo guardar", err);
            return "No se pudo guardar";
        }
    }

    //Método que verifica si existe id y retorna el index.
    exist = async(id) => {
        try {
            let data = await this.read();
            return (data.findIndex(e => e.id == id) != -1);
        } catch {
            console.log("Error al buscar id", err);
            return "Error al buscar id";
        }
    }
    
    //Retorna el valor que tiene id requerido, o -1 si no se encuentra.
    getRecord = async(id) => {
        try {
            let data = await this.read();
            let index = data.findIndex(e => e.id == id);
            return data[index];
        } catch(err) {
            console.log("Error al buscar registro", err);
            return "Error al buscar registro";
        }
    }

    //Elimina del archivo el registro indicado por id.
    deleteRecord = async(id) => {
        try {
            let data = await this.read();
            let index = data.findIndex(e => e.id == id);
            data.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(data));
        } catch(err) {
            console.log("No se pudo borrar el registro", err);
            return "No se pudo borrar el registro";
        }
    }

    //Elimina todo el archivo.
    deleteAll = async() => {
        try {
            await fs.promises.unlink(this.path);
        } catch(err) {
            console.error("No se pudo borrar el archivo", err);
            return "No se pudo borrar el archivo";
        }
    }
}



module.exports = ArchiveContainer;