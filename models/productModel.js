const mongoose = require('mongoose');
const { connectDB } = require('../utility/database');

connectDB();

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    img: {type: String},
    categories: {type: Array},
    size: {type: String},
    color: {type: String},
    price: {type: String}    
}, {timestamps: true});

const productModel = mongoose.model('productModel', productSchema);
module.exports = productModel;