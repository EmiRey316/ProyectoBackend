const express = require("express");

const loginController = require("./loginController");
const { isLogged } = require("../../Middlewares");
const passport = require("../Passport");


let loginRouter = express.Router();
loginRouter.get("/", isLogged, loginController.get)
loginRouter.post("/", passport.authenticate('login', {failureRedirect:"/login/failLogin", successRedirect:"/"}))
loginRouter.get("/failLogin", isLogged, loginController.fail)


module.exports = loginRouter;