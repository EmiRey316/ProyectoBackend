const express = require("express");

const { addProductToCart, createCart, deleteCart, deleteProductFromCart, getCart } = require("../controller/cartsController.js");
const { validateCartId, validateProductId } = require("../controller/middlewares.js");


const cartsRouter = express.Router();


cartsRouter.post("/", createCart);
cartsRouter.delete("/:cid", validateCartId, deleteCart);
cartsRouter.get("/:cid/products", validateCartId, getCart);
cartsRouter.post("/:cid/products", validateCartId, validateProductId, addProductToCart);
cartsRouter.delete("/:cid/products/:pid", validateCartId, deleteProductFromCart);



module.exports = cartsRouter;