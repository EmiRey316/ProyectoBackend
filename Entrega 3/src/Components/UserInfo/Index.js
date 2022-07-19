const express = require("express");

const userInfoController = require("./userInfoController");
const { validateSession } = require("../Middlewares");


let userInfoRouter = express.Router();
userInfoRouter.get("/", validateSession, userInfoController.get);


module.exports = userInfoRouter;