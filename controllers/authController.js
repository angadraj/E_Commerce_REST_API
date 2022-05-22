const userModel = require('../models/userModel');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

module.exports.register = async function register(req, res) {
    try {
        const userName = req.body.userName;
        const email = req.body.email;
        const password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_KEY).toString();

        if (userName && email && password) {
            const newUser = new userModel({
                userName, 
                email,
                password
            });
            const savedUser = await newUser.save();
            res.json({
                message: "user registered!",
                data: savedUser
            })
        } else {
            res.json({
                message: "please send valid details"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.login = async function login(req, res) {
    try {
        const email = req.body.email;
        const pass = req.body.password;
        const user = await userModel.findOne({
            email
        });
        if (!user) {
            res.json({
                message: "user not found!"
            })
        }
        // now check if the entered pass is equal to the decrypted one
        const decryptedPass = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_KEY).toString(CryptoJS.enc.Utf8);
        if (pass != decryptedPass) {
            res.json({
                message: "Invalid password!"
            })
        } 
        // jwt
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_KEY, {
            expiresIn: "1d"
        })

        // never show password in data you send
        const { password, ...others } = user._doc;
        res.json({
            message: "Login successful!",
            data: others,
            token: accessToken
        })

    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}