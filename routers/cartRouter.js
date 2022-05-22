const express = require('express');
const cartRouter = express.Router();
const { verifyJwt } = require('../middlewares/verifyToken');
const { addToCart, updateQty } = require('../controllers/cartController');

cartRouter.use(verifyJwt);

cartRouter.route('/')
.post(function(req, res) {
    addToCart(req, res);
});

cartRouter.route('/:productId')
.patch(updateQty);