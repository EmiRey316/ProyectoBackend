const twilio = require("twilio");

const config = require("../Config");
const { logger } = require("./logger");


const accountSid = config.TWILIO_ACCOUNT_SID;
const accountToken = config.TWILIO_ACCOUNT_TOKEN;

const client = twilio(accountSid, accountToken);

const paymentMessage = async(phone) => {
    try {
        const message = await client.messages.create({
            from: "+19804475283",
            to: phone,
            body: "Pedido recibido y en proceso"
        })
    } catch(err) {
        logger.error("Error al enviar mensaje", err)
    }
}


const paymentWsp = async(user) => {
    try {
        const message = await client.messages.create({
            from: "whatsapp:+14155238886",
            to: "whatsapp:"+config.VERIFIED_PHONE,
            body: `Nuevo pedido de ${user.name} - ${user.username}`
        })
    } catch(err) {
        logger.error("Error al enviar mensaje", err)
    }
}


module.exports = {
    paymentMessage,
    paymentWsp
}