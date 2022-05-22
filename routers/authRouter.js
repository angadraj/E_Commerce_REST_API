const express = require('express');
const authRouter = express.Router();
const { register, login } = require('../controllers/authController');
// Register
authRouter.route('/register')
.post(function(req, res) {
    register(req, res);
})

authRouter.route('/login')
.post(function(req, res) {
    login(req, res);
})

module.exports = authRouter;