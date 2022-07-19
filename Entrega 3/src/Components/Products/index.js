const express = require("express");

const productsController = require("./productsController.js");
const { validateSession, validateProductId, validateUser } = require("../Middlewares")

let productsRouter = express.Router();

productsRouter.get("/", validateSession, productsController.getAllProducts);
productsRouter.get("/create", validateSession, validateUser, productsController.getCreateProduct)
productsRouter.get("/:pid", validateSession, validateProductId, productsController.getProductById);
productsRouter.post("/", validateSession, validateUser, productsController.createProduct);
productsRouter.put("/:pid", validateSession, validateUser, validateProductId, productsController.editProduct);
productsRouter.delete("/:pid", validateSession, validateUser, validateProductId, productsController.deleteProduct);



module.exports = productsRouter;