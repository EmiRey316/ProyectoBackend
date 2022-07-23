const express = require("express");

const cartController = require("./cartController");
const { validateSession, validateCartId, validateProductId } = require("../Middlewares")


let cartRouter = express.Router();
cartRouter.post("/", validateSession, cartController.createCart);
cartRouter.delete("/", validateSession, validateCartId, cartController.clearCart);
cartRouter.get("/", validateSession, validateCartId, cartController.getCart);
cartRouter.post("/products", validateSession, validateCartId, validateProductId, cartController.addProductToCart);
cartRouter.post("/payment", validateSession, validateCartId, cartController.paymentConfirm);
cartRouter.delete("/products/:pid", validateSession, validateCartId, cartController.deleteProductFromCart);



module.exports = cartRouter;