const mongoose = require('mongoose');
const { connectDB } = require('../utility/database');

connectDB();

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;