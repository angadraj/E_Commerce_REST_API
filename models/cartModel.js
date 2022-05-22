const mongoose = require('mongoose');
const { connectDB } = require('../utility/database');
connectDB();

const cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    products: [
        {
            productId: {
                type: String
            },
            qty: {
                type: Number,
                default: 1
            }
        }
    ]
}, { timeStamps: true });

const cartModel = mongoose.model('cartModel',cartSchema);
module.exports = cartModel;