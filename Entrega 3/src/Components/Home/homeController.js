class Home {
    async get(req, res) {
        let user = await req.user;

        res.render("home", {
            title: "Centro de mensajes",
            name: user.name.split(" ")[0],
            avatar: user.avatar
        })
    }
}


module.exports = new Home;