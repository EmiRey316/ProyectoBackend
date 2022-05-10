const config = require("../../config.json");

let DBClient;

(async function() {

    switch (config.database.engine) {
        case "MongoDB":
            DBClient = require("./mongoDBClient.js");
            break;

        case "Firestore":
            DBClient = require("./firestoreClient.js");
            break;

        default:
            DBClient = "noBase";
            break;
    }
})();


module.exports = DBClient;