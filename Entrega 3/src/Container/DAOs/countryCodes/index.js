const MongoDB = require("../../index.js");
const { CountryCodesSchema } = require("../../../Models/mongoModels.js");
const { logger } = require("../../../Utils/logger.js");


class CountryCodesDao extends MongoDB {
    findCodes = async() => {
        try {
            return await this.model.find({}, {country: 1, code: 1, _id: 0}).sort({country: 1}).lean();
        } catch (error) {
            logger.error("Error al cargar códigos de países", error)
        }
    }
}


module.exports = new CountryCodesDao("countrycodes", CountryCodesSchema);