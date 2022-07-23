const CartsDao = require("../../Container/DAOs/cart");
const ProductsDao = require("../../Container/DAOs/products");

const { logger } = require("../../Utils/logger.js");
const PaymentMailer = require("../../Utils/Mailer/paymentMailer.js");
const { paymentMessage, paymentWsp } = require("../../Utils/messaging.js");
const config = require("../../Config");



class Cart {
    //Crear cart para el usuario en específico
    async createCart(req, res) {
        try {
            const user = await req.user;
            await CartsDao.save({user: user.id , products: []});
        } catch (error) {
            logger.error("Error al crear carrito", {error});
        }
    }

    //Vacía un carrito y lo elimina.
    async clearCart(req, res) {
        try {
            const user = await req.user;
            await CartsDao.clearCart(user.id);
            res.send("");
        } catch (error) {
            logger.error("Error al vaciar carrito", {error})
        }
    }


    //Permite listar todos los productos guardados en el carrito
    async getCart(req, res) {
        try {
            const user = await req.user;
            let cart = await CartsDao.findByUser(user.id);

            const totalPayment = cart.products.reduce((total, actual) => {
                return total + (actual.product.price * actual.quantity)
            }, 0)

            res.render("cart", {
                title: "Carrito",
                name: user.name.split(" ")[0],
                avatar: user.avatar,
                role: user.role,
                productsInCart: cart.products,
                totalPayment
            });
        } catch (error) {
            logger.error("Error al obtener el carrito", error)
        }
    }


    //Para incorporar productos al carrito por su id de producto
    async addProductToCart(req, res) {
        try {
            //Existe el producto indicado?
            let data = req.body;
            let product = await ProductsDao.findById(data.id);
            if(!product) return res.send(`No existe ningún producto con id ${data.id} en el listado`);
            
            const user = await req.user;
            const cart = await CartsDao.findByUser(user.id);

            await CartsDao.addProductToCart(cart.id, {product, quantity: Number(data.quantity)})

            res.redirect("/cart")
        } catch (error) {
            logger.error("Error al agregar producto al carrito", {error})
        }
    }


    async paymentConfirm(req, res) {
        try {
            const user = await req.user;
            const cart = await CartsDao.findByUser(user.id);

            const paymentMail = new PaymentMailer(config.MAIL, user, cart);
            paymentMail.sendPaymentMail();

            const fullPhone = user.countryCode + user.phone;
            paymentMessage(fullPhone);

            paymentWsp(user);

            await CartsDao.clearCart(user.id);

            res.send("Ok");
        } catch (error) {
            logger.error("No se pudo completar el pago del carrito", error)
        }
    }


    //Eliminar un producto del carrito por su id de carrito y de producto
    async deleteProductFromCart(req, res) {  
        try {
            //El producto indicado se encuentra agregado al carrito?
            let pid = req.params.pid
            let pIndexInCart = await CartsDao.productIsInCart(req.cid, pid);
            if(pIndexInCart == -1) return res.send(`El producto con id ${pid} no se encuentra en el carrito ${req.cid}`);

            await CartsDao.deleteProductFromCart(req.cid, pIndexInCart);
            res.send(`El producto con id ${pid} fue eliminado correctamente del carrito ${req.cid}`);
        } catch (error) {
            logger.error("Error al quitar producto del carrito", {error})
        }  
    }
}



module.exports = new Cart;