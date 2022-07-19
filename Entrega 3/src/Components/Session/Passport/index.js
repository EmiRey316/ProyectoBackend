const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const usersList = require("../../../Container/DAOs/users");
const { logger } = require("../../../Utils/logger");
const Mailer = require("../../../Utils/mailer.js");
const config = require("../../../Config");


passport.use("login", new LocalStrategy(async (username, password, done) => {
    try {
        let user = await usersList.findByEmail(username);
        if(!user) return done(null, false);

        if(!await bcrypt.compare(password, user.password)) return done(null, false);

        return done(null, user);
    } catch (error) {
        logger.error("Error al hacer login", {error})
    }
}))

passport.use("signup", new LocalStrategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            let findUser = await usersList.findByEmail(username);
            if(findUser) return done(null, false);

            let user = req.body;
            
            user.password = await bcrypt.hash(password, 10);

            //De momento todos los usuarios creados son admin.
            user.role = "admin";
            
            //Envio mail de nuevo registro, antes de agregegar avatar.
            const registrationMail = new Mailer(config.MAIL, user);
            registrationMail.sendMail();

            //Agrego el nombre del avatar al usuario.
            const file = req.file;
            user.avatar = file.filename;
            
            //Guardo usuario en base.
            await usersList.save(user);
            return done(null, user);
        } catch (error) {
            logger.error("Error en el registro", {error})
        }
}))



passport.serializeUser((user, done)=>{
    done(null, user.username);
});

passport.deserializeUser((username, done)=>{
    let user = usersList.findByEmail(username);
    done(null, user);
});



module.exports = passport;