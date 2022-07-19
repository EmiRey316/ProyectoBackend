const usersList = require("../../../Container/DAOs/users")

class Registration {
    get(req, res) {
        res.render("./session/registration", {title: "Registro"})
    }

    fail(req, res) {
        res.render("./session/fail", {
            title: "SignUp error",
            type: "SIGNUP",
            originalRoute: "/signup"
        })
    }
}


module.exports = new Registration;