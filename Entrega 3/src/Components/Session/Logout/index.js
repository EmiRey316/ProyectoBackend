const express = require("express");

const logoutController = require("./logoutController");


let logoutRouter = express.Router();
logoutRouter.get("/", logoutController.get);


module.exports = logoutRouter;