const express = require("express");

const homeController = require("./homeController");
const { validateSession } = require("../Middlewares")


let homeRouter = express.Router();
homeRouter.get("/", validateSession, homeController.get)


module.exports = homeRouter;