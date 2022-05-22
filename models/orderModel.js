const mongoose = require('mongoose');
const { connectDB } = require('../utility/database');
connectDB();

const orderSchema = mongoose.Schema({
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
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timeStamps: true });

const orderModel = mongoose.model('orderModel', orderSchema);
module.exports = orderModel;