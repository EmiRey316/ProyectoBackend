class UserInfo {
    async get(req, res) {
        let user = await req.user;

        const userOptions = {
            title: "Perfil de usuario",
            username: user.username,
            name: user.name,
            birthday: user.birthday,
            address: user.address,
            phone: user.phone,
            avatar: user.avatar
        }

        res.render("userInfo", userOptions);
    }
}


module.exports = new UserInfo;