class UserInfo {
    async get(req, res) {
        let user = await req.user;

        const userOptions = {
            title: "Perfil de usuario",
            username: user.username,
            name: user.name,
            role: user.role,
            birthday: user.birthday,
            address: user.address,
            countryCode: user.countryCode,
            phone: user.phone,
            avatar: user.avatar
        }

        res.render("userInfo", userOptions);
    }
}


module.exports = new UserInfo;