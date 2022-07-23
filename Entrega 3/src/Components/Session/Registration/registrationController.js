const CountryCodesDao = require("../../../Container/DAOs/countryCodes");

class Registration {
    async get(req, res) {
        const countryCodes = await CountryCodesDao.findCodes();
        res.render("./session/registration", {title: "Registro", countryCodes});
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