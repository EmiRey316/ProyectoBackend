const { createTransport } = require("nodemailer");

const config = require("../Config");


class Mailer {
    constructor(destinationMail, user) {
        this.transporter = createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.MAIL,
                pass: config.MAIL_PASS
            }
        }),

        this.mailOptions = {
            from: "Servidor Proyecto Backend",
            to: destinationMail,
            subject: "Nuevo Registro",
            html: `<h1 style="color: blue; text-align: center;">Nuevo usuario registrado</h1>
                    <table style="text-align: center; border: solid 1px black">
                        <tr>
                            <td>Nombre:</td>
                            <td>${user.name}</td>
                        </tr>
                        <tr>
                            <td>Mail:</td>
                            <td>${user.username}</td>
                        </tr>
                        <tr>
                            <td>Teléfono:</td>
                            <td>${user.phone}</td>
                        </tr>
                        <tr>
                            <td>Dirección:</td>
                            <td>${user.address}</td>
                        </tr>
                        <tr>
                            <td>Fecha de nacimiento:</td>
                            <td>${user.birthday}</td>
                        </tr>
                    </table>`
         }
    }

    async sendMail() {
        try {
            const info = await this.transporter.sendMail(this.mailOptions)
            console.log(info)
         } catch (error) {
            console.log(err)
         }
    }
}


module.exports = Mailer;
