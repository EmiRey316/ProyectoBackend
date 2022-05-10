const express = require("express");

const { createProduct, deleteProduct, editProduct, getAllProducts, getProductById } = require("../controller/productsController.js");
const { validateProductId, validateUser } = require("../controller/middlewares.js");


const productsRouter = express.Router();


productsRouter.get("/", getAllProducts);
productsRouter.get("/:pid", validateProductId, getProductById);
productsRouter.post("/", validateUser, createProduct);
productsRouter.put("/:pid", validateUser, validateProductId, editProduct);
productsRouter.delete("/:pid", validateUser, validateProductId, deleteProduct);



module.exports = productsRouter;
