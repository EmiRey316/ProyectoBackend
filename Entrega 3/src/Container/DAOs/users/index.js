const MongoDB = require("../../index.js");
const { UserSchema } = require("../../../Models/mongoModels.js");
const { logger } = require("../../../Utils/logger");


class UsersDao extends MongoDB {
    findByEmail = async(userMail) => {
        try {
            return await this.model.findOne({username: userMail});
        } catch (error) {
            logger.error("Error al buscar al usuario en base", {error})
        }
    }
}


module.exports = new UsersDao("users", UserSchema);