const express = require("express");

const registrationController = require("./registrationController");
const { isLogged } = require("../../Middlewares");
const passport = require("../Passport");
const upload = require("../../../Utils/multer.js")


let registrationRouter = express.Router();
registrationRouter.get("/", isLogged, registrationController.get);
registrationRouter.post("/", upload.single("avatar"), passport.authenticate('signup', {failureRedirect:"/signup/failSignup", successRedirect:"/"}));
registrationRouter.get("/failSignup", isLogged, registrationController.fail)


module.exports = registrationRouter;