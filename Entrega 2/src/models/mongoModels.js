const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    timestamp: {type: String, required: true},
})


const CartsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    products: {type: Array, required: true},
    timestamp: {type: String, required: true}
})


module.exports = {
    ProductSchema,
    CartsSchema,
};