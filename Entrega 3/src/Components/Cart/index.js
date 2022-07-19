const express = require("express");

const cartController = require("./cartController");
const { validateSession, validateCartId, validateProductId } = require("../Middlewares")


let cartRouter = express.Router();
cartRouter.post("/", validateSession, cartController.createCart);
cartRouter.delete("/:cid", validateSession, validateCartId, cartController.deleteCart);
cartRouter.get("/:cid/products", validateSession, validateCartId, cartController.getCart);
cartRouter.post("/:cid/products", validateSession, validateCartId, validateProductId, cartController.addProductToCart);
cartRouter.delete("/:cid/products/:pid", validateSession, validateCartId, cartController.deleteProductFromCart);



module.exports = cartRouter;