const { createTransport } = require("nodemailer");

const config = require("../../Config");
const { logger } = require("../logger.js");


class Mailer {
    constructor(destinationMail, user, cart) {
        this.transporter = createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.MAIL,
                pass: config.MAIL_PASS
            }
        }),

        this.paymentMail = {
            from: "Servidor Proyecto Backend",
            to: destinationMail,
            subject: `Nuevo pedido de ${user.name} - ${user.username}`,
            html: `<h1>Compra registrada</h1>
                ${JSON.stringify(cart.products, null, 2)}`
                    
        }
    }


    async sendPaymentMail() {
        try {
            const info = await this.transporter.sendMail(this.paymentMail);
            logger.info(JSON.stringify(info, null, 2));
        } catch (error) {
            logger.error("Error al enviar mail de pago", error)
        }
    }
}


module.exports = Mailer;