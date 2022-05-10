const config = require("../../config.json");

let ProductsDao;
let CartsDao;

switch (config.database.engine) {
    case "MongoDB":
        ProductsDao = require("./Products/MongoDBDaoProducts.js");
        CartsDao = require("./Cart/MongoDBDaoCart.js");
        break;

    case "Firestore":
        ProductsDao = require("./Products/FirestoreDaoProducts.js");
        CartsDao = require("./Cart/FirestoreDaoCart.js");
        break;

    case "Archive":
        ProductsDao = require("./Products/ArchiveDaoProducts.js");
        CartsDao = require("./Cart/ArchiveDaoCart.js");
        break;

    case "Memory":
        ProductsDao = require("./Products/MemoryDaoProducts.js");
        CartsDao = require("./Cart/MemoryDaoCart.js");
        break;

    //default con Mongo.
    default:
        ProductsDao = require("./Products/MongoDBDaoProducts.js");
        CartsDao = require("./Cart/MongoDBDaoCart.js");
        break;
}

module.exports = {
    ProductsDao,
    CartsDao
}