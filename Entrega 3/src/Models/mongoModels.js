const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    username: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    birthday: {type: String, required: true},
    countryCode: {type: String, required: true},
    phone: {type: Number, required: true},
    avatar: {type: String}
})

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
    UserSchema,
    ProductSchema,
    CartsSchema
};