const { warnLogger } = require("../Utils/logger.js")

const homeRouter = require("../Components/Home");
const productsRouter = require("../Components/Products");
const cartRouter = require("../Components/Cart");

const loginRouter = require("../Components/Session/Login");
const logoutRouter = require("../Components/Session/Logout");
const registrationRouter = require("../Components/Session/Registration");
const userInfoRouter = require("../Components/UserInfo");



module.exports = app => {
    app.use("/", homeRouter);
    app.use("/products", productsRouter);
    app.use("/cart", cartRouter);

    //Session
    app.use("/login", loginRouter);
    app.use("/logout", logoutRouter);
    app.use("/signUp", registrationRouter);
    app.use("/userInfo", userInfoRouter);

    //404
    app.get("*", (req, res) => {
        warnLogger.warn(`Ruta ${req.url} no encontrada`)
        res.status(404).send("Página no encontrada")
    });
}