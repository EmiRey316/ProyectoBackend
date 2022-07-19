class Logout {
    async get(req, res) {
        const user = await req.user;
        req.session.destroy(err => {
            if(!err) {
                return res.render("./session/logout", {title: "Logout", user: user.alias});
            }

            res.send({status: "Logout ERROR",
                body: err})
        })
    }
}


module.exports = new Logout()